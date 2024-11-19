import {
  createWalletClient,
  http,
  zeroAddress,
  encodeFunctionData,
  type Account,
  type Address,
} from "viem";

import { nftAbi } from "../abis/nft";
import { outboxABI } from "../abis/outbox";
import { sleep } from "bun";
import {
  mockArbitrumNFTAddress,
  chainConfigs,
  REWARD_ASSET,
  ONE_WEEK,
} from "../common/constants";

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
    const { mockArbitrum, mockBase } = chainConfigs;
    const encodedCallData = encodeFunctionData({
      abi: nftAbi,
      functionName: "mint",
      args: [address],
    });
    const calls = [
      {
        to: mockArbitrumNFTAddress,
        data: encodedCallData,
        value: mintPrice,
      },
    ];
    const request = {
      requester: address,
      calls: calls,
      proverContract: mockBase.proverContracts.Prover,
      destinationChainId: mockArbitrum.chainId,
      inboxContract: mockArbitrum.contracts.inbox,
      l2Oracle: mockArbitrum.l2Oracle,
      l2OracleStorageKey: mockArbitrum.l2OracleStorageKey,
      rewardAsset: REWARD_ASSET,
      rewardAmount: (mintPrice * 102n) / 100n,
      finalityDelaySeconds: 10,
      nonce: 0,
      expiry: Math.floor(Date.now() / 1000) + ONE_WEEK,
      precheckContract: zeroAddress,
      precheckData: "0x",
    };
    const hash = await this.walletClient.writeContract({
      address: mockBase.contracts.outbox,
      abi: outboxABI,
      functionName: "requestCrossChainCall",
      args: [request],
      value: request.rewardAmount,
    });
    await mockBase.publicClient.waitForTransactionReceipt({ hash: hash });
    console.log("Transaction success!");
  }
}
