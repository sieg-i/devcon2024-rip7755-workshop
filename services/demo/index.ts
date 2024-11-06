import readline from "readline/promises";
import { formatEther, type Address } from "viem";
import { privateKeyToAccount } from "viem/accounts";

import { chainConfigs } from "./src/common/constants";
import ClientsService from "./src/clients/clients.service";

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const account = privateKeyToAccount(process.env.PRIVATE_KEY as Address);
  const mockBaseClientService = new ClientsService(
    chainConfigs.mockBase,
    account
  );
  const mockArbitrumClientService = new ClientsService(
    chainConfigs.mockArbitrum,
    account
  );

  line();
  line();
  space();
  console.log("WELCOME TO THE DEVCON RIP7755 DEMO");
  space();
  line();
  line();

  const mockBaseBalance = await mockBaseClientService.getBalance(
    account.address
  );

  const mockArbitrumNFTBalance = await mockArbitrumClientService.getNFTBalance(
    account.address
  );

  const mintPrice = await mockArbitrumClientService.getMintPrice();

  const mintPrompt = `
MINT YOUR NFT:

NFT: DevCon NFT on Mock Arbitrum
CURRENT NFT BALANCE: ${mockArbitrumNFTBalance.toLocaleString()}

PRICE: ${formatEther(mintPrice)} ETH
CURRENT BASE BALANCE: ${Number(
    formatEther(mockBaseBalance)
  ).toLocaleString()} ETH

Mint your Mock Arbitrum NFT by paying on Mock Base? (enter)
`;

  await rl.question(mintPrompt);

  const start = Date.now();

  await mockBaseClientService.rip7755Mint(account.address, mintPrice);
  console.log("Cross-chain call submitted! Waiting for request fulfillment...");

  const newBalance = await mockArbitrumClientService.pollNFTBalance(
    account.address,
    mockArbitrumNFTBalance
  );

  if (newBalance === mockArbitrumNFTBalance) {
    console.log("NFT minting failed! Please try again.");
    rl.close();
    return;
  }

  const diff = Date.now() - start;

  console.log(`NFT successfully minted in ${diff / 1000} seconds`);

  rl.close();
}

function line() {
  console.log("---------------------------------------------------");
}

function space(count = 1) {
  for (let i = 0; i < count; i++) {
    console.log("\n");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
