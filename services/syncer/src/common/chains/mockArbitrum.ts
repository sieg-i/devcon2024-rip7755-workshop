import { defineChain } from "viem";

export const mockArbitrum = defineChain({
  id: 111112,
  name: "Mock Arbitrum",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["http://localhost:8547"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "" },
  },
  contracts: {},
});
