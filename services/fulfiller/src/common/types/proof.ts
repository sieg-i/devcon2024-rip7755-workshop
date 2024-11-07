import type { Address } from "viem";

export type AccountProofParams = {
  storageKey: Address;
  storageValue: Address;
  accountProof: Address[];
  storageProof: Address[];
};

export type ProofType = {
  l1Timestamp: bigint;
  l2BlockTimestamp: bigint;
  l2StateRoot: Address;
  dstL2StateRootProofParams: AccountProofParams;
  dstL2AccountProofParams: AccountProofParams;
};
