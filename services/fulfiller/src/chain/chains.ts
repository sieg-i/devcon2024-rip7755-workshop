import { createPublicClient, http, toHex } from "viem";

import { Provers, type ChainConfig } from "../common/types/chain";
import { mockArbitrum } from "../common/chains/mockArbitrum";
import { mockBase } from "../common/chains/mockBase";
import { mockL1 } from "../common/chains/mockL1";

export default {
  // Mock Arbitrum
  111112: {
    chainId: 111112,
    proverContracts: {
      Prover: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    },
    rpcUrl: mockArbitrum.rpcUrls.default.http[0],
    l2Oracle: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    l2OracleStorageKey: toHex(1n, { size: 32 }),
    contracts: {
      inbox: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      outbox: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
      beaconOracle: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    },
    publicClient: createPublicClient({
      chain: mockArbitrum,
      transport: http(),
    }),
    targetProver: Provers.Prover,
  },
  // Mock Base
  111111: {
    chainId: 111111,
    proverContracts: {
      Prover: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    },
    rpcUrl: mockBase.rpcUrls.default.http[0],
    l2Oracle: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    l2OracleStorageKey: toHex(1n, { size: 32 }),
    contracts: {
      inbox: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      outbox: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
      beaconOracle: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    },
    publicClient: createPublicClient({
      chain: mockBase,
      transport: http(),
    }),
    targetProver: Provers.Prover,
  },
  // Mock Ethereum
  31337: {
    chainId: 31337,
    proverContracts: {},
    rpcUrl: mockL1.rpcUrls.default.http[0],
    l2Oracle: "0x",
    l2OracleStorageKey: "0x",
    contracts: {
      mockBaseRollup: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      mockArbRollup: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    },
    publicClient: createPublicClient({
      chain: mockL1,
      transport: http(),
    }),
    targetProver: Provers.None,
  },
} as Record<number, ChainConfig>;
