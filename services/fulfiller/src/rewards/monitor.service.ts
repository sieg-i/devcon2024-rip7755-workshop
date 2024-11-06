import { encodeAbiParameters } from "viem";

import RIP7755Outbox from "../abis/RIP7755Outbox";
import ChainService from "../chain/chain.service";
import chains from "../chain/chains";
import type DBService from "../database/db.service";
import ProverService from "../prover/prover.service";
import SignerService from "../signer/signer.service";
import type { SubmissionType } from "../common/types/submission";
import Proof from "../abis/Proof";
import { replaceBigInts } from "../common/utils/bigIntReplacer";

export default class RewardMonitorService {
  private processing = false;

  constructor(private readonly dbService: DBService) {
    setInterval(() => this.poll(), 3000);
  }

  async poll(): Promise<void> {
    if (this.processing) return;
    this.processing = true;

    try {
      await this.monitor();
    } catch (e) {
      console.error(e);
    } finally {
      this.processing = false;
    }
  }

  private async monitor(): Promise<void> {
    const jobs = await this.dbService.getClaimableRewards();

    if (jobs.length === 0) return;

    console.log(`Found ${jobs.length} rewards to claim`);

    await Promise.allSettled(jobs.map((job) => this.handleJob(job)));
  }

  private async handleJob(job: SubmissionType): Promise<void> {
    try {
      const activeChains = {
        src: chains[job.activeChains.src],
        l1: chains[job.activeChains.l1],
        dst: chains[job.activeChains.dst],
      };
      const chainService = new ChainService(activeChains);
      const signerService = new SignerService(chains[job.activeChains.src]);
      const proverService = new ProverService(activeChains, chainService);
      const { requestHash, request } = job;

      const [fulfillmentInfo, proof] = await Promise.all([
        chainService.getFulfillmentInfo(requestHash),
        proverService.generateProof(requestHash),
      ]);
      const payTo = signerService.getFulfillerAddress();

      await Bun.write("./proof.json", JSON.stringify(proof, replaceBigInts));

      const encodedProof = encodeAbiParameters(Proof, [proof]);

      const functionName = "claimReward";
      const args = [request, fulfillmentInfo, encodedProof, payTo];

      console.log(
        "Proof successfully generated. Sending rewardClaim transaction"
      );

      const txnHash = await signerService.sendTransaction(
        activeChains.src.contracts.outbox,
        RIP7755Outbox,
        functionName,
        args
      );

      if (!txnHash) {
        throw new Error("Failed to submit transaction");
      }

      console.log(`Transaction successful: ${txnHash}`);

      await this.dbService.updateRewardClaimed(job.id, txnHash);
    } catch (e) {
      console.error(e);
    }
  }
}
