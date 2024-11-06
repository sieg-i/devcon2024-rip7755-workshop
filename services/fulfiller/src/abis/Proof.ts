export default [
  {
    name: "proofData",
    type: "tuple",
    internalType: "struct Prover.RIP7755Proof",
    components: [
      {
        name: "l1Timestamp",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "l2BlockNumber",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "dstL2StateRootProofParams",
        type: "tuple",
        internalType: "struct StateValidator.AccountProofParameters",
        components: [
          {
            name: "storageKey",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "storageValue",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "accountProof",
            type: "bytes[]",
            internalType: "bytes[]",
          },
          {
            name: "storageProof",
            type: "bytes[]",
            internalType: "bytes[]",
          },
        ],
      },
      {
        name: "dstL2AccountProofParams",
        type: "tuple",
        internalType: "struct StateValidator.AccountProofParameters",
        components: [
          {
            name: "storageKey",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "storageValue",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "accountProof",
            type: "bytes[]",
            internalType: "bytes[]",
          },
          {
            name: "storageProof",
            type: "bytes[]",
            internalType: "bytes[]",
          },
        ],
      },
    ],
  },
] as const;
