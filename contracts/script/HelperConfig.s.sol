// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";

contract HelperConfig is Script {
    struct NetworkConfig {
        address beaconRootsOracle;
    }

    NetworkConfig public activeNetworkConfig;

    constructor() {
        if (block.chainid == 111111) {
            activeNetworkConfig = getChainAConfig();
        } else if (block.chainid == 111112) {
            activeNetworkConfig = getChainBConfig();
        }
    }

    function getChainAConfig() public pure returns (NetworkConfig memory) {
        return NetworkConfig({beaconRootsOracle: 0x5FbDB2315678afecb367f032d93F642f64180aa3});
    }

    function getChainBConfig() public pure returns (NetworkConfig memory) {
        return NetworkConfig({beaconRootsOracle: 0x5FbDB2315678afecb367f032d93F642f64180aa3});
    }
}
