import { SupportedChains } from "./src/common/types/chain";
import IndexerService from "./src/indexer/indexer.service";
import DBService from "./src/database/db.service";
import RewardMonitorService from "./src/rewards/monitor.service";
import chains from "./src/chain/chains";

async function main() {
  const sourceChain = SupportedChains.MockBase;
  const dbService = new DBService();
  const indexerService = new IndexerService(dbService);
  new RewardMonitorService(dbService);

  console.log("Fulfiller listening for logs");
  chains[sourceChain].publicClient.watchEvent({
    address: chains[sourceChain].contracts.outbox,
    onLogs: (logs: any) => indexerService.handleLogs(sourceChain, logs),
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
