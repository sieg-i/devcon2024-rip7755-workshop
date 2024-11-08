# Cross-Chain NFT Minting with RIP-7755

## Prerequisites

- Node.js v18.17.1
- Bun v1.1.29
- Forge v0.2.0

## Setup

After cloning the repo, run `make setup` to install dependencies and build the project.

## Assignment

There are two key components that need to be implemented:

1. Implement the `Prover` contract for the destination L2 chain.
2. Implement the `rip7755Mint` function in the demo service.

The `Prover` contract should adhere to the `IProver` interface and implement validation of a nested storage proof. To properly set up the storage proof parameters, pay attention to the `Rollup` contract. This is where our mock-L2 chains are posting roots on L1 - notice how the destination L2's state root is used to post data there.

Once the `Prover` contract is implemented, try running the test file to see if it passes!

The `rip7755Mint` function in the demo service should construct an RIP-7755 request and submit to the mock Base `RIP7755Outbox` contract. The target call should be the `mint` function in our simple NFT contract.

## Run The App End-to-End

### Start Mock L1

Run `make start-mock-L1` to start the mock L1 chain.

### Start Mock Base Chain

In a new terminal window, run `make start-mock-base` to start the mock Base chain.

### Start Mock Arbitrum Chain

In a new terminal window, run `make start-mock-arbitrum` to start the mock Arbitrum chain.

### Setup Contracts

In a new terminal window, run `make setup-contracts` to setup the contracts.

### Start Rollup Syncer Service

In a new terminal window, run `make start-syncer` to start the rollup syncer service.

### Start Fulfiller Service

In a new terminal window, run `make start-fulfiller` to start the fulfiller service.

### Start Demo Service

In a new terminal window, run `make demo` to start the demo service.
