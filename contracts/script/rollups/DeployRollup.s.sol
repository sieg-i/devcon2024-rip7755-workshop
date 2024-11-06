// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";
import {Rollup} from "../../src/rollups/Rollup.sol";

contract DeployRollup is Script {
    function run() external {
        vm.startBroadcast();
        new Rollup();
        vm.stopBroadcast();
    }
}
