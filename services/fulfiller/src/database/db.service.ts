import { formatEther, type Address } from "viem";

import type { RequestType } from "../common/types/request";
import type { ActiveChains } from "../common/types/chain";
import type { SubmissionType } from "../common/types/submission";
import { replaceBigInts } from "../common/utils/bigIntReplacer";

export default class DBService {
  async storeSuccessfulCall(
    requestHash: Address,
    txnHash: Address,
    request: RequestType,
    activeChains: ActiveChains
  ): Promise<boolean> {
    const docs = await Bun.file("./src/database/db.json").json();

    docs.push({
      id: crypto.randomUUID(),
      requestHash,
      claimAvailableAt:
        Math.floor(Date.now() / 1000) +
        Number(request.finalityDelaySeconds) +
        10,
      txnSubmittedHash: txnHash,
      activeChains: {
        src: activeChains.src.chainId,
        l1: activeChains.l1.chainId,
        dst: activeChains.dst.chainId,
      },
      request,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await Bun.write(
      "./src/database/db.json",
      JSON.stringify(docs, replaceBigInts)
    );

    return true;
  }

  async getClaimableRewards(): Promise<SubmissionType[]> {
    const docs = await Bun.file("./src/database/db.json").json();
    const validDocs = docs.filter(
      (doc: SubmissionType) =>
        doc.claimAvailableAt <= Math.floor(Date.now() / 1000) &&
        doc.rewardClaimedTxnHash === undefined
    );
    return validDocs;
  }

  async updateRewardClaimed(id: string, txnHash: Address): Promise<void> {
    const docs = await Bun.file("./src/database/db.json").json();

    const doc = docs.find((doc: SubmissionType) => doc.id === id);
    if (!doc) {
      throw new Error("Submission document not found");
    }
    doc.rewardClaimedTxnHash = txnHash;

    const totalRewards = this.calculateTotalRewards(docs);

    await Bun.write(
      "./src/database/rewards.json",
      JSON.stringify({ totalRewards: formatEther(totalRewards) })
    );
    await Bun.write("./src/database/db.json", JSON.stringify(docs));
  }

  private calculateTotalRewards(docs: SubmissionType[]): bigint {
    let currentValue = 0n;

    for (const doc of docs) {
      let callValue = 0n;
      for (let i = 0; i < doc.request.calls.length; i++) {
        callValue += BigInt(doc.request.calls[i].value);
      }
      currentValue += BigInt(doc.request.rewardAmount) - callValue;
    }

    return currentValue;
  }
}
