export const mockEIP4788Abi = [
  {
    type: "function",
    name: "beaconRoots",
    inputs: [{ name: "timestamp", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "beaconRoot", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "commitBeaconRoot",
    inputs: [
      { name: "blockNumber", type: "uint256", internalType: "uint256" },
      { name: "timestamp", type: "uint256", internalType: "uint256" },
      { name: "beaconRoot", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "latestBlock",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
] as const;
