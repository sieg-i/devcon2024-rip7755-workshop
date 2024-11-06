import type { Address, GetProofReturnType } from "viem";

export type Proofs = {
  storageProof: GetProofReturnType;
  l2StorageProof: GetProofReturnType;
};

export type GetStorageProofsInput = {
  l1BlockNumber: bigint;
  l2BlockNumber: bigint;
  l2Slot: Address;
};
