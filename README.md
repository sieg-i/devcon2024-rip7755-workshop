# Cross-Chain NFT Minting with RIP-7755

## Prerequisites

- Node.js v18.17.1
- Bun v1.1.29
- Forge v0.2.0

## Setup

After cloning the repo, run `make setup` to install dependencies and build the project.

Copy the `.env.example` file to `.env`. These are the environment variables that the services and contracts need to run. No need to change any values.

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
