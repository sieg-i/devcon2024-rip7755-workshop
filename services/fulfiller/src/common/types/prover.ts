import type { Address, Block, GetProofReturnType } from "viem";

export type Proofs = {
  storageProof: GetProofReturnType;
  l2StorageProof: GetProofReturnType;
};

export type GetStorageProofsInput = {
  l1BlockNumber: bigint;
  l2Block: Block;
  l2Slot: Address;
};
