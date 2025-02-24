import { Id, SchemaHash, DID, getDateFromUnixTimestamp } from '@iden3/js-iden3-core';
import { Merklizer, Path, MtValue, getDocumentLoader } from '@iden3/js-jsonld-merklization';
import { Proof } from '@iden3/js-merkletree';
import { DocumentLoader } from '@iden3/js-jsonld-merklization';
import {
  Operators,
  byteEncoder,
  createSchemaHash,
  QueryOperators,
  Parser,
  byteDecoder,
  isValidOperation
} from '@0xpolygonid/js-sdk';
import { VerifyOpts } from './registry';

const defaultProofGenerationDelayOpts = 24 * 60 * 60 * 1000; // 24 hours

// Query is a query to circuit
export interface Query {
  allowedIssuers: string[];
  credentialSubject: { [key: string]: unknown };
  context: string;
  type: string;
  claimID?: string;
  skipClaimRevocationCheck?: boolean;
  proofType?: string;
  groupId?: number;
}

// ClaimOutputs fields that are used in proof generation
export interface ClaimOutputs {
  issuerId: Id;
  schemaHash: SchemaHash;
  slotIndex?: number;
  operator: number;
  value: bigint[];
  timestamp: number;
  merklized: number;
  claimPathKey?: bigint;
  claimPathNotExists?: number;
  valueArraySize: number;
  isRevocationChecked: number;
  operatorOutput?: bigint;
}

export async function checkQueryRequest(
  query: Query,
  outputs: ClaimOutputs,
  schemaLoader?: DocumentLoader,
  verifiablePresentation?: JSON,
  supportsSDOperator?: boolean,
  opts?: VerifyOpts
): Promise<void> {
  // validate issuer
  const userDID = DID.parseFromId(outputs.issuerId);
  const issuerAllowed = query.allowedIssuers.some(
    (issuer) => issuer === '*' || issuer === userDID.string()
  );
  if (!issuerAllowed) {
    throw new Error('issuer is not in allowed list');
  }

  // validate schema
  let schema: object;
  try {
    const loader = schemaLoader ?? getDocumentLoader();
    schema = (await loader(query.context)).document;
  } catch (e) {
    throw new Error(`can't load schema for request query`);
  }

  const schemaId: string = await Path.getTypeIDFromContext(JSON.stringify(schema), query.type, {
    documentLoader: schemaLoader
  });
  const schemaHash = createSchemaHash(byteEncoder.encode(schemaId));

  if (schemaHash.bigInt() !== outputs.schemaHash.bigInt()) {
    throw new Error(`schema that was used is not equal to requested in query`);
  }

  if (!query.skipClaimRevocationCheck && outputs.isRevocationChecked === 0) {
    throw new Error(`check revocation is required`);
  }

  const cq = await parseRequest(
    query,
    outputs,
    byteEncoder.encode(JSON.stringify(schema)),
    schemaLoader
  );

  // validate selective disclosure
  if (cq.isSelectiveDisclosure) {
    try {
      if (!verifiablePresentation) {
        throw new Error(`no vp present in selective disclosure request`);
      }
      await validateDisclosure(
        verifiablePresentation,
        cq,
        outputs,
        schemaLoader,
        supportsSDOperator
      );
    } catch (e) {
      throw new Error(`failed to validate selective disclosure: ${(e as Error).message}`);
    }
  } else if (!cq.fieldName && cq.operator == Operators.NOOP) {
    try {
      await validateEmptyCredentialSubject(cq, outputs);
      return;
    } catch (e: unknown) {
      throw new Error(`failed to validate operators: ${(e as Error).message}`);
    }
  } else {
    try {
      await validateOperators(cq, outputs);
    } catch (e) {
      throw new Error(`failed to validate operators: ${(e as Error).message}`);
    }
  }

  // verify claim
  if (outputs.merklized === 1) {
    if (outputs.claimPathNotExists === 1) {
      throw new Error(`proof doesn't contains target query key`);
    }

    const path = await Path.getContextPathKey(JSON.stringify(schema), query.type, cq.fieldName, {
      documentLoader: schemaLoader
    });
    path.prepend(['https://www.w3.org/2018/credentials#credentialSubject']);
    const claimPathKey = await path.mtEntry();

    if (outputs.claimPathKey !== claimPathKey) {
      throw new Error(`proof was generated for another path`);
    }
  } else {
    const slotIndex = await Parser.getFieldSlotIndex(
      cq.fieldName,
      query.type,
      byteEncoder.encode(JSON.stringify(schema))
    );

    if (outputs.slotIndex !== slotIndex) {
      throw new Error(`wrong claim slot was used in claim`);
    }
  }

  // verify timestamp
  let acceptedProofGenerationDelay = defaultProofGenerationDelayOpts;
  if (opts?.acceptedProofGenerationDelay) {
    acceptedProofGenerationDelay = opts.acceptedProofGenerationDelay;
  }

  const timeDiff = Date.now() - getDateFromUnixTimestamp(Number(outputs.timestamp)).getTime();
  if (timeDiff > acceptedProofGenerationDelay) {
    throw new Error('generated proof is outdated');
  }
  return;
}

async function validateEmptyCredentialSubject(cq: CircuitQuery, outputs: ClaimOutputs) {
  if (outputs.operator !== Operators.EQ) {
    throw new Error('empty credentialSubject request available only for equal operation');
  }
  for (let index = 1; index < outputs.value.length; index++) {
    if (outputs.value[index] !== BigInt(0)) {
      throw new Error(`empty credentialSubject request not available for array of values`);
    }
  }
  const path = await Path.newPath(['https://www.w3.org/2018/credentials#credentialSubject']);
  const subjectEntry = await path.mtEntry();
  if (outputs.claimPathKey !== subjectEntry) {
    throw new Error(`proof doesn't contain credentialSubject in claimPathKey`);
  }
  return;
}
async function validateOperators(cq: CircuitQuery, outputs: ClaimOutputs) {
  if (outputs.operator !== cq.operator) {
    throw new Error(`operator that was used is not equal to request`);
  }
  if (outputs.operator === Operators.NOOP) {
    // for noop operator slot and value are not used in this case
    return;
  }

  for (let index = 0; index < outputs.value.length; index++) {
    if (outputs.value[index] !== cq.values[index]) {
      throw new Error(`comparison value that was used is not equal to requested in query`);
    }
  }
}

async function validateDisclosure(
  verifiablePresentation: JSON,
  cq: CircuitQuery,
  outputs: ClaimOutputs,
  ldLoader?: DocumentLoader,
  supportsSDOperator?: boolean
) {
  if (!verifiablePresentation) {
    throw new Error(`verifiablePresentation is required for selective disclosure request`);
  }

  let mz: Merklizer;
  const strVerifiablePresentation: string = JSON.stringify(verifiablePresentation);
  try {
    mz = await Merklizer.merklizeJSONLD(strVerifiablePresentation, {
      documentLoader: ldLoader
    });
  } catch (e) {
    throw new Error(`can't merkelize verifiablePresentation`);
  }

  let merklizedPath: Path;
  try {
    const p = `verifiableCredential.credentialSubject.${cq.fieldName}`;
    merklizedPath = await Path.fromDocument(null, strVerifiablePresentation, p, {
      documentLoader: ldLoader
    });
  } catch (e) {
    throw new Error(`can't build path to '${cq.fieldName}' key`);
  }

  let proof: Proof;
  let value: MtValue | undefined;
  try {
    ({ proof, value } = await mz.proof(merklizedPath));
  } catch (e) {
    throw new Error(`can't get value by path '${cq.fieldName}'`);
  }
  if (!value) {
    throw new Error(`can't get merkle value for field '${cq.fieldName}'`);
  }

  if (!proof.existence) {
    throw new Error(
      `path [${merklizedPath.parts}] doesn't exist in verifiablePresentation document`
    );
  }
  const bi = await value.mtEntry();

  if (supportsSDOperator) {
    if (outputs.operator !== Operators.SD) {
      throw new Error(`operator for selective disclosure must be $sd`);
    }

    if (!outputs.operatorOutput || bi !== outputs.operatorOutput) {
      throw new Error(`operator output must be equal to disclosed value`);
    }

    for (let index = 0; index < outputs.value.length; index++) {
      if (outputs.value[index] !== 0n) {
        throw new Error(`in selective disclosure, comparing values must be zero for $sd operator`);
      }
    }
  } else {
    if (outputs.operator !== Operators.EQ) {
      throw new Error(`operator for selective disclosure must be $eq`);
    }

    for (let index = 1; index < outputs.value.length; index++) {
      if (outputs.value[index] !== 0n) {
        throw new Error(`selective disclosure not available for array of values`);
      }
    }
    if (bi !== outputs.value[0]) {
      throw new Error(`value that was used is not equal to requested in query`);
    }
  }

  return;
}

async function parseRequest(
  query: Query,
  outputs: ClaimOutputs,
  schema: Uint8Array,
  ldLoader?: DocumentLoader
): Promise<CircuitQuery> {
  if (!query.credentialSubject) {
    return {
      operator: Operators.NOOP,
      values: [],
      slotIndex: 0,
      isSelectiveDisclosure: false,
      fieldName: ''
    };
  }
  if (Object.keys(query.credentialSubject).length > 1) {
    throw new Error(`multiple requests not supported`);
  }

  const txtSchema = byteDecoder.decode(schema);

  let fieldName = '';
  let predicate: Map<string, unknown> = new Map();

  for (const [key, value] of Object.entries(query.credentialSubject)) {
    fieldName = key;

    predicate = value as Map<string, unknown>;

    if (Object.keys(predicate).length > 1) {
      throw new Error(`multiple predicates for one field not supported`);
    }
    break;
  }

  let datatype = '';
  if (fieldName !== '') {
    datatype = await Path.newTypeFromContext(txtSchema, `${query.type}.${fieldName}`, {
      documentLoader: ldLoader
    });
  }

  const [operator, values] = await parsePredicate(predicate, datatype);
  const zeros: Array<bigint> = Array.from({
    length: outputs.valueArraySize - values.length
  }).fill(BigInt(0)) as Array<bigint>;
  const fullArray: Array<bigint> = values.concat(zeros);

  const cq: CircuitQuery = {
    operator,
    values: fullArray,
    isSelectiveDisclosure: false,
    fieldName
  };

  if (Object.keys(predicate).length === 0) {
    cq.isSelectiveDisclosure = true;
  }

  return cq;
}

type CircuitQuery = {
  claimPathKey?: bigint;
  slotIndex?: number;
  values: bigint[];
  operator: number;
  isSelectiveDisclosure: boolean;
  fieldName: string;
};

async function getValuesAsArray(v: unknown, datatype: string): Promise<bigint[]> {
  const values: Array<bigint> = [];
  if (Array.isArray(v)) {
    for (let index = 0; index < v.length; index++) {
      values[index] = await Merklizer.hashValue(datatype, v[index]);
    }
    return values;
  }
  values[0] = await Merklizer.hashValue(datatype, v);
  return values;
}

async function parsePredicate(
  predicate: Map<string, unknown>,
  datatype: string
): Promise<[number, bigint[]]> {
  let operator = 0;
  let values: bigint[] = [];

  for (const [key, value] of Object.entries(predicate)) {
    if (!Object.keys(QueryOperators).includes(key)) {
      throw new Error(`operator is not supported by lib`);
    }
    operator = QueryOperators[key as keyof typeof QueryOperators];

    if (!isValidOperation(datatype, operator)) {
      throw new Error(`operator '${key}' is not supported for '${datatype}' datatype`);
    }

    values = await getValuesAsArray(value, datatype);
    break;
  }
  return [operator, values];
}
