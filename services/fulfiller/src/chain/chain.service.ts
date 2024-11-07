import { type Address, type Block } from "viem";

import { type ActiveChains } from "../common/types/chain";
import RIP7755Inbox from "../abis/RIP7755Inbox";
import type { FulfillmentInfoType } from "../common/types/fulfillmentInfo";
import Rollup from "../abis/Rollup";
import { mockEIP4788Abi } from "../abis/MockEIP4788";

export default class ChainService {
  constructor(private readonly activeChains: ActiveChains) {}

  async getL1Block(): Promise<Block> {
    const srcL2BlockNumber =
      await this.activeChains.l1.publicClient.readContract({
        address: this.activeChains.l1.contracts.mockBaseRollup,
        abi: Rollup,
        functionName: "latestConfirmed",
      });
    const blockNumber = await this.activeChains.src.publicClient.readContract({
      address: this.activeChains.dst.contracts.beaconOracle,
      abi: mockEIP4788Abi,
      functionName: "latestBlock",
      blockNumber: srcL2BlockNumber,
    });

    return await this.activeChains.l1.publicClient.getBlock({
      blockNumber,
    });
  }

  async getL2BlockNumber(l1BlockNumber: bigint): Promise<Block> {
    const blockNumber = await this.activeChains.l1.publicClient.readContract({
      address: this.activeChains.l1.contracts.mockArbRollup,
      abi: Rollup,
      functionName: "latestConfirmed",
      blockNumber: l1BlockNumber,
    });

    return await this.activeChains.dst.publicClient.getBlock({
      blockNumber,
    });
  }

  async getFulfillmentInfo(requestHash: Address): Promise<FulfillmentInfoType> {
    const config = this.activeChains.dst;
    return await config.publicClient.readContract({
      address: config.contracts.inbox,
      abi: RIP7755Inbox,
      functionName: "getFulfillmentInfo",
      args: [requestHash],
    });
  }
}
