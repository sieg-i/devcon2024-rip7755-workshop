## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

## Process

Init the base chain.

```bash
make start-base-chain
```

### In new terminal window:

Init Chain A.

```bash
make start-chain-A
```

### In new terminal window:

Init Chain B.

```bash
make start-chain-B
```

### In new terminal window:

Deploy all contracts.

```bash
./setupContracts.sh
```

### In new terminal window:

Run the syncer.

```bash
make run-syncer
```

[submodule "contracts/lib/forge-std"]
path = contracts/lib/forge-std
url = https://github.com/foundry-rs/forge-std
[submodule "contracts/lib/openzeppelin-contracts"]
path = contracts/lib/openzeppelin-contracts
url = https://github.com/Openzeppelin/openzeppelin-contracts
[submodule "contracts/lib/optimism"]
path = contracts/lib/optimism
url = https://github.com/ethereum-optimism/optimism
