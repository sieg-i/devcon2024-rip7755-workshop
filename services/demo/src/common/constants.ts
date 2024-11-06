import { createPublicClient, http, toHex } from "viem";

import { chainA } from "./chains/chainA";
import { chainB } from "./chains/chainB";

// Global
export const REWARD_ASSET = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const ONE_WEEK = 604800;
export const TWO_WEEKS = ONE_WEEK * 2;

export const mockArbitrumNFTAddress =
  "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

export const chainConfigs = {
  mockArbitrum: {
    chainId: 111112,
    proverContracts: {
      Prover: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    },
    l2Oracle: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    l2OracleStorageKey: toHex(1n, { size: 32 }),
    contracts: {
      inbox: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      outbox: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
      nft: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    },
    publicClient: createPublicClient({
      chain: chainB,
      transport: http(),
    }),
  },
  mockBase: {
    chainId: 111111,
    proverContracts: {
      Prover: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    },
    l2Oracle: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    l2OracleStorageKey: toHex(1n, { size: 32 }),
    contracts: {
      inbox: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      outbox: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    },
    publicClient: createPublicClient({
      chain: chainA,
      transport: http(),
    }),
  },
};
