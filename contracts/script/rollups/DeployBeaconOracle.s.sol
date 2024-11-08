// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";
import {BeaconOracle} from "../../src/rollups/BeaconOracle.sol";

contract DeployBeaconOracle is Script {
    function run() external {
        vm.startBroadcast();
        new BeaconOracle();
        vm.stopBroadcast();
    }
}
