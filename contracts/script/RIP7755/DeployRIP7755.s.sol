// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";

import {Prover} from "../../src/RIP7755/provers/Prover.sol";
import {RIP7755Inbox} from "../../src/RIP7755/RIP7755Inbox.sol";
import {RIP7755Outbox} from "../../src/RIP7755/RIP7755Outbox.sol";
import {HelperConfig} from "../HelperConfig.s.sol";

contract DeployRIP7755 is Script {
    function run() external {
        HelperConfig helperConfig = new HelperConfig();
        (address beaconRootsOracle) = helperConfig.activeNetworkConfig();

        vm.startBroadcast();
        new Prover(beaconRootsOracle);
        new RIP7755Inbox();
        new RIP7755Outbox();
        vm.stopBroadcast();
    }
}
