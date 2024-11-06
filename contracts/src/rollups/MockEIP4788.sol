// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract MockEIP4788 {
    mapping(uint256 timestamp => bytes32 beaconRoot) public beaconRoots;

    uint256 public latestBlock;

    function commitBeaconRoot(uint256 blockNumber, uint256 timestamp, bytes32 beaconRoot) external {
        beaconRoots[timestamp] = beaconRoot;
        latestBlock = blockNumber;
    }
}
