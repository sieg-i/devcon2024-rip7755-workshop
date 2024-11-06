import { createWalletClient, http, type Account, type Address } from "viem";

import { nftAbi } from "../abis/nft";
import { sleep } from "bun";

export default class ClientsService {
  private walletClient: any;

  constructor(private readonly chainConfig: any, account: Account) {
    this.walletClient = createWalletClient({
      account,
      chain: chainConfig.publicClient.chain,
      transport: http(),
    });
  }

  async getBalance(address: Address) {
    return await this.chainConfig.publicClient.getBalance({ address });
  }

  async pollNFTBalance(
    address: Address,
    startingBalance: bigint
  ): Promise<bigint> {
    let balance = startingBalance;
    let attempts = 0;
    while (balance === startingBalance && attempts++ < 10) {
      balance = await this.chainConfig.publicClient.readContract({
        address: this.chainConfig.contracts.nft,
        abi: nftAbi,
        functionName: "balanceOf",
        args: [address],
      });
      await sleep(500);
    }
    return balance;
  }

  async getNFTBalance(address: Address) {
    return await this.chainConfig.publicClient.readContract({
      address: this.chainConfig.contracts.nft,
      abi: nftAbi,
      functionName: "balanceOf",
      args: [address],
    });
  }

  async getMintPrice() {
    return await this.chainConfig.publicClient.readContract({
      address: this.chainConfig.contracts.nft,
      abi: nftAbi,
      functionName: "MINT_PRICE",
    });
  }

  async rip7755Mint(address: Address, mintPrice: bigint) {
    // TODO: Your code here...
  }
}
