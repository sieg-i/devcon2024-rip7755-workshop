export const rollupAbi = [
  {
    type: "function",
    name: "commitStateRoot",
    inputs: [
      { name: "blockNumber", type: "uint256", internalType: "uint256" },
      { name: "stateRoot", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "stateRoots",
    inputs: [{ name: "blockNumber", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
] as const;
