# default Anvil keys
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
MOCK_BASE_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
MOCK_ARBITRUM_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

MOCK_L1_URL=http://localhost:8545
MOCK_BASE_URL=http://localhost:8546
MOCK_ARBITRUM_URL=http://localhost:8547

setup:
	cd contracts && forge install && forge build
	cd services/demo && bun install
	cd services/fulfiller && bun install
	cd services/syncer && bun install

start-mock-L1:
	cd contracts && anvil

start-mock-base:
	cd contracts && anvil --port 8546 --chain-id 111111

start-mock-arbitrum:
	cd contracts && anvil --port 8547 --chain-id 111112

setup-contracts:
	cd contracts && forge script script/rollups/DeployRollup.s.sol:DeployRollup --private-key $(PRIVATE_KEY) --rpc-url $(MOCK_L1_URL) --broadcast -vvvv
	cd contracts && forge script script/rollups/DeployRollup.s.sol:DeployRollup --private-key $(PRIVATE_KEY) --rpc-url $(MOCK_L1_URL) --broadcast -vvvv
	cd contracts && forge script script/rollups/DeployBeaconOracle.s.sol:DeployBeaconOracle --private-key $(PRIVATE_KEY) --rpc-url $(MOCK_BASE_URL) --broadcast -vvvv
	cd contracts && forge script script/rollups/DeployBeaconOracle.s.sol:DeployBeaconOracle --private-key $(PRIVATE_KEY) --rpc-url $(MOCK_ARBITRUM_URL) --broadcast -vvvv
	cd contracts && forge script script/RIP7755/DeployRIP7755.s.sol:DeployRIP7755 --private-key $(PRIVATE_KEY) --rpc-url $(MOCK_BASE_URL) --broadcast -vvvv
	cd contracts && forge script script/RIP7755/DeployRIP7755.s.sol:DeployRIP7755 --private-key $(PRIVATE_KEY) --rpc-url $(MOCK_ARBITRUM_URL) --broadcast -vvvv
	cd contracts && forge script script/DeployNFT.s.sol:DeployNFT --private-key $(PRIVATE_KEY) --rpc-url $(MOCK_ARBITRUM_URL) --broadcast -vvvv

start-syncer:
	cd services/syncer && MOCK_BASE_KEY=$(MOCK_BASE_KEY) MOCK_ARBITRUM_KEY=$(MOCK_ARBITRUM_KEY) bun run index.ts

start-fulfiller:
	cd services/fulfiller && PRIVATE_KEY=$(PRIVATE_KEY) bun run index.ts

demo:
	cd services/demo && PRIVATE_KEY=$(PRIVATE_KEY) bun run index.ts