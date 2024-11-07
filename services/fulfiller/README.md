# ts-filler

## Overview

`fulfiller` is a backend service built with the Bun JavaScript runtime. It is designed to manage backend operations for RIP-7755 cross-chain call requests between any two blockchains that post state roots to L1. This project serves as an example of how an off-chain "Fulfiller" app might function. Anyone can run a fulfiller app and earn money with RIP-7755!

The role of an RIP-7755 Fulfiller is to listen for cross-chain call requests and submit them to the `RIP7755Inbox` contract on the destination chain on behalf of the user who submitted the request. In return for fulfilling this duty, your fulfiller signer can claim a reward that gets locked in the source chain `RIP7755Outbox` contract after a defined delay specified in the `CrossChainRequest`. To claim the reward, the fulfiller must generate and submit a proof that verifies the existence of a record of the call having been made in `RIP7755Inbox` on the destination chain. The exact proof mechanics depend on the destination chain.
