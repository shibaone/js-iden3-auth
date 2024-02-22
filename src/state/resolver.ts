import { Id, ChainIds } from '@iden3/js-iden3-core';
import { ethers } from 'ethers';
import { Abi__factory } from './types/ethers-contracts';
import { IState } from './types/ethers-contracts/Abi';

const zeroInt = BigInt(0);

const DefaultContext = [
  'https://www.w3.org/ns/did/v1',
  'https://schema.iden3.io/core/jsonld/auth.jsonld'
];

const StateType = 'Iden3StateInfo2023';

export type Resolvers = {
  [key: string]: IStateResolver;
};

export type VerificationMethod = {
  id: string;
  type: string;
  controller: string;
  stateContractAddress: string;
  published: boolean;
  info: {
    id: string;
    state: string;
    replacedByState: string;
    createdAtTimestamp: number;
    replacedAtTimestamp: number;
    createdAtBlock: number;
    replacedAtBlock: number;
  };
  global: {
    root: string;
    replacedByRoot: string;
    createdAtTimestamp: number;
    replacedAtTimestamp: number;
    createdAtBlock: number;
    replacedAtBlock: number;
  };
};

export type DIDDoc = {
  context: string[];
  id: string;
  verificationMethod: VerificationMethod;
};

export interface IStateResolver {
  resolve(id: bigint, state: bigint): Promise<ResolvedState>;
  rootResolve(state: bigint): Promise<ResolvedState>;
}
export type ResolvedState = {
  latest: boolean;
  genesis: boolean;
  state: unknown;
  transitionTimestamp: number | string;
};
export class EthStateResolver implements IStateResolver {
  private rpcUrl: string;
  private contractAddress: string;

  constructor(rpcUrl: string, contractAddress: string) {
    this.rpcUrl = rpcUrl;
    this.contractAddress = contractAddress;
  }

  public async resolve(id: bigint, state: bigint): Promise<ResolvedState> {
    const contract = this.getContract();
    // check if id is genesis
    const isGenesis = isGenesisStateId(id, state);

    let contractState: IState.StateInfoStructOutput;
    try {
      contractState = await contract.getStateInfoByIdAndState(id, state);
    } catch (e) {
      if ((e as { errorArgs: string[] }).errorArgs[0] === 'State does not exist') {
        if (isGenesis) {
          return {
            latest: true,
            genesis: isGenesis,
            state: state,
            transitionTimestamp: 0
          };
        }
        throw new Error('State is not genesis and not registered in the smart contract');
      }
      throw e;
    }

    if (!contractState.id.eq(id)) {
      throw new Error(`state was recorded for another identity`);
    }

    if (!contractState.state.eq(state)) {
      if (contractState.replacedAtTimestamp.eq(zeroInt)) {
        throw new Error(`no information about state transition`);
      }
      return {
        latest: false,
        genesis: false,
        state: state,
        transitionTimestamp: contractState.replacedAtTimestamp.toNumber()
      };
    }

    return { latest: true, genesis: isGenesis, state, transitionTimestamp: 0 };
  }

  public async rootResolve(state: bigint): Promise<ResolvedState> {
    const contract = this.getContract();

    let globalStateInfo: IState.GistRootInfoStructOutput;
    try {
      globalStateInfo = await contract.getGISTRootInfo(state);
    } catch (e: unknown) {
      if ((e as { errorArgs: string[] }).errorArgs[0] === 'Root does not exist') {
        throw new Error('GIST root does not exist in the smart contract');
      }
      throw e;
    }

    if (!globalStateInfo.root.eq(state)) {
      throw new Error(`gist info contains invalid state`);
    }

    if (!globalStateInfo.replacedByRoot.eq(zeroInt)) {
      if (globalStateInfo.replacedAtTimestamp.eq(zeroInt)) {
        throw new Error(`state was replaced, but replaced time unknown`);
      }
      return {
        latest: false,
        state: state,
        transitionTimestamp: globalStateInfo.replacedAtTimestamp.toString(),
        genesis: false
      };
    }

    return {
      latest: true,
      state: state,
      transitionTimestamp: 0,
      genesis: false
    };
  }

  public async resolveDIDDoc(didString: string): Promise<DIDDoc> {
    const contract = this.getContract();

    const blockchain = didString.split(':')[2];
    const network = didString.split(':')[3];

    const chainID = ChainIds[`${blockchain}:${network}`];

    const id = didString.split(':')[4];
    if (!id) throw new Error('DID not valid');
    const userState = await contract.getStateInfoById(Id.fromString(id).bigInt());

    const root = await contract.getGISTRoot();

    if (!root) throw new Error('Can not get GIST root');

    const rootInfo = await contract.getGISTRootInfo(root._hex);

    if (!rootInfo) throw new Error('Can not get GIST root info');

    return {
      context: DefaultContext,
      id: didString,
      verificationMethod: {
        id: didString + '#stateInfo',
        type: StateType,
        controller: didString,
        stateContractAddress: `${chainID}:${this.contractAddress}`,
        published: true,
        info: {
          id: didString,
          state: userState.state._hex,
          replacedByState: userState.replacedByState._hex,
          createdAtTimestamp: userState.createdAtTimestamp.toNumber(),
          replacedAtTimestamp: userState.replacedAtTimestamp.toNumber(),
          createdAtBlock: userState.createdAtBlock.toNumber(),
          replacedAtBlock: userState.replacedAtBlock.toNumber()
        },
        global: {
          root: rootInfo.root._hex,
          replacedByRoot: rootInfo.replacedByRoot._hex,
          createdAtTimestamp: rootInfo.createdAtTimestamp.toNumber(),
          replacedAtTimestamp: rootInfo.replacedAtTimestamp.toNumber(),
          createdAtBlock: rootInfo.createdAtBlock.toNumber(),
          replacedAtBlock: rootInfo.replacedAtBlock.toNumber()
        }
      }
    };
  }

  public getContract() {
    const url = new URL(this.rpcUrl);
    const ethersProvider = new ethers.providers.JsonRpcProvider({
      url: url.href,
      user: url.username,
      password: url.password
    });
    return Abi__factory.connect(this.contractAddress, ethersProvider);
  }
}

export function isGenesisStateId(id: bigint, state: bigint): boolean {
  const userID = Id.fromBigInt(id);
  const identifier = Id.idGenesisFromIdenState(userID.type(), state);
  return userID.equal(identifier);
}
