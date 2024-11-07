import {
  encodeAbiParameters,
  keccak256,
  toHex,
  type Address,
  type Block,
} from "viem";

import type ChainService from "../chain/chain.service";
import constants from "../common/constants";
import type { GetStorageProofsInput, Proofs } from "../common/types/prover";
import { type ActiveChains } from "../common/types/chain";
import type { ProofType } from "../common/types/proof";

export default class ProverService {
  constructor(
    private readonly activeChains: ActiveChains,
    private readonly chainService: ChainService
  ) {}

  async generateProof(requestHash: Address): Promise<ProofType> {
    const l1Block = await this.chainService.getL1Block();

    if (!l1Block.number) {
      throw new Error("L1 block number is required");
    }

    const l2BlockNumber = await this.chainService.getL2BlockNumber(
      l1Block.number
    );

    const l2Slot = this.deriveRIP7755VerifierStorageSlot(requestHash);

    const storageProofOpts = {
      l1BlockNumber: l1Block.number,
      l2BlockNumber,
      l2Slot,
    };
    const storageProofs = await this.getStorageProofs(storageProofOpts);

    return this.buildProofObj(storageProofs, l1Block, l2BlockNumber);
  }

  private async getStorageProofs(opts: GetStorageProofsInput): Promise<Proofs> {
    const { l1BlockNumber, l2BlockNumber, l2Slot } = opts;
    const dstConfig = this.activeChains.dst;

    const storageProofs = await Promise.all([
      this.activeChains.l1.publicClient.getProof(
        this.buildL1Proof(l1BlockNumber, l2BlockNumber)
      ),
      dstConfig.publicClient.getProof({
        address: dstConfig.contracts.inbox,
        storageKeys: [l2Slot],
        blockNumber: l2BlockNumber,
      }),
    ]);

    const [storageProof, l2StorageProof] = storageProofs;
    return { storageProof, l2StorageProof };
  }

  private buildL1Proof(
    l1BlockNumber: bigint,
    l2BlockNumber: bigint
  ): {
    address: Address;
    storageKeys: Address[];
    blockNumber: bigint;
  } {
    const l1Config = this.activeChains.l1;
    const address = l1Config.contracts.mockArbRollup;
    const storageKeys = [
      keccak256(
        encodeAbiParameters(
          [{ type: "uint256" }, { type: "uint256" }],
          [l2BlockNumber, BigInt(1)]
        )
      ),
    ];

    return { address, storageKeys, blockNumber: l1BlockNumber };
  }

  private deriveRIP7755VerifierStorageSlot(requestHash: Address): Address {
    return keccak256(
      encodeAbiParameters(
        [{ type: "bytes32" }, { type: "uint256" }],
        [requestHash, BigInt(constants.slots.fulfillmentInfoSlot)]
      )
    );
  }

  private buildProofObj(
    proofs: Proofs,
    l1Block: Block,
    l2BlockNumber: bigint
  ): ProofType {
    const proofObj: ProofType = {
      l1Timestamp: l1Block.timestamp,
      l2BlockNumber,
      dstL2StateRootProofParams: {
        storageKey: proofs.storageProof.storageProof[0].key,
        storageValue: toHex(proofs.storageProof.storageProof[0].value),
        accountProof: proofs.storageProof.accountProof,
        storageProof: proofs.storageProof.storageProof[0].proof,
      },
      dstL2AccountProofParams: {
        storageKey: proofs.l2StorageProof.storageProof[0].key,
        storageValue: toHex(proofs.l2StorageProof.storageProof[0].value),
        accountProof: proofs.l2StorageProof.accountProof,
        storageProof: proofs.l2StorageProof.storageProof[0].proof,
      },
    };

    if (
      toHex(proofs.storageProof.storageProof[0].value) == "0x0" ||
      toHex(proofs.l2StorageProof.storageProof[0].value) == "0x0"
    ) {
      throw new Error("Storage proof value is empty");
    }

    console.log(proofObj);

    return proofObj;
  }
}
