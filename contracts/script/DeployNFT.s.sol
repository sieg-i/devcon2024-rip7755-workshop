// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script} from "forge-std/Script.sol";
import {NFT} from "../src/NFT.sol";

contract DeployNFT is Script {
    function run() external {
        uint256 mintPrice = 1 ether;

        vm.startBroadcast();
        new NFT(mintPrice);
        vm.stopBroadcast();
    }
}
