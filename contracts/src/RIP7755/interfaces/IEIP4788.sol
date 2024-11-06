// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IEIP4788 {
    function beaconRoots(uint256 timestamp) external view returns (bytes32);
}
