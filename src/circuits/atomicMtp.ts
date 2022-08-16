import { Core } from '@lib/core/core';
import { Id } from '@lib/core/id';
import { ISchemaLoader } from '@lib/loaders/schema';
import { IStateResolver, ResolvedState } from '@lib/state/resolver';
import { checkQueryRequest, ClaimOutputs, Query } from '@lib/circuits/query';
import { PubSignalsVerifier } from '@lib/circuits/registry';
import { IDOwnershipPubSignals } from '@lib/circuits/ownershipVerifier';

export class AtomicQueryMTPPubSignals
  extends IDOwnershipPubSignals
  implements PubSignalsVerifier
{
  userState: bigint;
  claimSchema: bigint;
  issuerClaimIdenState: bigint;
  issuerClaimNonRevState: bigint;
  issuerId: Id;
  slotIndex: number;
  values: bigint[];
  operator: number;
  timestamp: number;

  constructor(pubSignals: string[]) {
    super();
    if (pubSignals.length != 74) {
      throw new Error(
        `invalid number of Output values expected ${74} got ${
          pubSignals.length
        }`,
      );
    }

    const userIdBytes: Uint8Array = Core.intToBytes(BigInt(pubSignals[0]));
    this.userId = Id.idFromBytes(userIdBytes);
    this.userState = BigInt(pubSignals[1]);
    this.challenge = BigInt(pubSignals[2]);
    this.issuerClaimIdenState = BigInt(pubSignals[3]);

    const issuerIdBytes: Uint8Array = Core.intToBytes(BigInt(pubSignals[4]));
    this.issuerId = Id.idFromBytes(issuerIdBytes);

    this.issuerClaimNonRevState = BigInt(pubSignals[5]);

    this.timestamp = parseInt(pubSignals[6], 10);

    this.claimSchema = BigInt(pubSignals[7]);

    this.slotIndex = parseInt(pubSignals[8], 10);
    this.operator = parseInt(pubSignals[9], 10);

    this.values = [];
    for (let index = 0; index < 64; index++) {
      const val = pubSignals[10 + index];
      this.values.push(BigInt(val));
    }
  }

  async verifyQuery(query: Query, schemaLoader: ISchemaLoader): Promise<void> {
    const outs: ClaimOutputs = {
      issuerId: this.issuerId.string(),
      schemaHash: this.claimSchema,
      operator: this.operator,
      slotIndex: this.slotIndex,
      value: this.values,
    };
    return await checkQueryRequest(query, outs, schemaLoader);
  }

  async verifyStates(resolver: IStateResolver): Promise<void> {
    const userStateResolved: ResolvedState = await resolver.resolve(
      this.userId.bigInt(),
      this.userState,
    );

    if (!userStateResolved.latest) {
      throw new Error(`only latest states are supported`);
    }

    const issuerStateResolved: ResolvedState = await resolver.resolve(
      this.issuerId.bigInt(),
      this.issuerClaimIdenState,
    );
    if (!issuerStateResolved) {
      throw new Error(`issuer state is not valid`);
    }

    const issuerNonRevStateResolved: ResolvedState = await resolver.resolve(
      this.issuerId.bigInt(),
      this.issuerClaimNonRevState,
    );
    if (
      !issuerNonRevStateResolved.latest &&
      Date.now() -
        Number(issuerNonRevStateResolved.transitionTimestamp) * 1000 >
        60 * 60 * 1000
    ) {
      throw new Error(`issuer state for non-revocation proofs is not valid`);
    }
    return;
  }
}
