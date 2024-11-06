// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";
import {MockEIP4788} from "../../src/rollups/MockEIP4788.sol";

contract DeployMockEIP4788 is Script {
    function run() external {
        vm.startBroadcast();
        new MockEIP4788();
        vm.stopBroadcast();
    }
}
