import { mockBase } from "./src/common/chains/mockBase";
import { mockArbitrum } from "./src/common/chains/mockArbitrum";
import Syncer from "./src/syncer";

async function main() {
  const mockBaseKey = process.env.MOCK_BASE_KEY as `0x${string}`;
  const mockArbitrumKey = process.env.MOCK_ARBITRUM_KEY as `0x${string}`;

  const syncerBase = new Syncer(mockBase, mockBaseKey);
  const syncerArbitrum = new Syncer(mockArbitrum, mockArbitrumKey);

  await Promise.all([
    syncerBase.monitorChains(),
    syncerArbitrum.monitorChains(),
  ]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
