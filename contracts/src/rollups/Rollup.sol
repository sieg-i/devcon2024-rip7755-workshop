// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract Rollup {
    uint256 public latestConfirmed;

    mapping(uint256 blockNumber => bytes32) public stateRoots;

    function commitStateRoot(uint256 blockNumber, bytes32 stateRoot) external {
        stateRoots[blockNumber] = stateRoot;
        latestConfirmed = blockNumber;
    }
}
