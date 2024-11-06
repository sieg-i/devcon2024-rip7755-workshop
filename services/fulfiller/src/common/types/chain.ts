import type { Address } from "viem";

export type ChainConfig = {
  chainId: number;
  proverContracts: Record<string, Address>;
  rpcUrl: string;
  l2Oracle: Address;
  l2OracleStorageKey: Address;
  publicClient: any;
  contracts: Record<string, Address>;
  targetProver: Provers;
};

export enum SupportedChains {
  MockArbitrum = 111112,
  MockBase = 111111,
  MockEthereum = 31337,
}

export type ActiveChains = {
  src: ChainConfig;
  l1: ChainConfig;
  dst: ChainConfig;
};

export enum Provers {
  None = "None",
  Prover = "Prover",
}
