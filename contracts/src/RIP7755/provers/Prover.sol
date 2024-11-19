// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IProver} from "../interfaces/IProver.sol";
import {StateValidator} from "../libraries/StateValidator.sol";
import {RIP7755Inbox} from "../RIP7755Inbox.sol";
import {CrossChainRequest} from "../RIP7755Structs.sol";
import {IEIP4788} from "../interfaces/IEIP4788.sol";

contract Prover is IProver {
    using StateValidator for address;

    struct RIP7755Proof {
        uint256 l1Timestamp;
        uint256 l2BlockTimestamp;
        bytes32 l2StateRoot;
        StateValidator.AccountProofParameters dstL2StateRootProofParams;
        StateValidator.AccountProofParameters dstL2AccountProofParams;
    }

    address private immutable _BEACON_ROOTS_ORACLE;

    error BeaconRootsOracleCallFailed();
    error InvalidL1State();
    error InvalidL2StateRoot();
    error InvalidL2State();
    error FinalityDelaySecondsInProgress();

    constructor(address beaconRootsOracle) {
        _BEACON_ROOTS_ORACLE = beaconRootsOracle;
    }

    /// @notice Validates storage proofs and verifies fulfillment
    ///
    /// @custom:reverts If storage proof invalid.
    /// @custom:reverts If fulfillmentInfo not found at inboxContractStorageKey on crossChainCall.inboxContract
    /// @custom:reverts If fulfillmentInfo.timestamp is less than
    /// crossChainCall.finalityDelaySeconds from current destination chain block timestamp.
    ///
    /// @dev Implementation will vary by destination L2
    ///
    /// @param inboxContractStorageKey The storage location of the data to verify on the destination chain
    /// `RIP7755Inbox` contract
    /// @param fulfillmentInfo The fulfillment info that should be located at `inboxContractStorageKey` in storage
    /// on the destination chain `RIP7755Inbox` contract
    /// @param request The original cross chain request submitted to the `RIP7755Outbox` contract
    /// @param proofData The proof to validate
    function validateProof(
        bytes memory inboxContractStorageKey,
        RIP7755Inbox.FulfillmentInfo calldata fulfillmentInfo,
        CrossChainRequest calldata request,
        bytes calldata proofData
    ) external view {
        // 1. Decode proofData
        RIP7755Proof memory proof = abi.decode(proofData, (RIP7755Proof));

        // 2. Query L1 State representation (in real network, likely beacon root, in today's demo, state root)
        (bool success, bytes memory data) = _BEACON_ROOTS_ORACLE.staticcall(abi.encode(proof.l1Timestamp));
        if (!success) {
            revert BeaconRootsOracleCallFailed();
        }

        bytes32 l1StateRoot = abi.decode(data, (bytes32));

        proof.dstL2StateRootProofParams.storageKey = _deriveL1StorageKey(request, proof);

        // 3. Using l1StateRoot, verify storage location (dst chain state rep) in dst chain's Rollup contract on L1
        bool isValidL1State = request.l2Oracle.validateAccountStorage(l1StateRoot, proof.dstL2StateRootProofParams);
        if (!isValidL1State) {
            revert InvalidL1State();
        }

        // 4. Verifiably link dst state root to dst chain state rep
        bytes32 derivedL2OutputRoot = keccak256(abi.encodePacked(proof.l2BlockTimestamp, proof.l2StateRoot));
        if (derivedL2OutputRoot != bytes32(proof.dstL2StateRootProofParams.storageValue)) {
            revert InvalidL2StateRoot();
        }

        proof.dstL2AccountProofParams.storageKey = inboxContractStorageKey;
        proof.dstL2AccountProofParams.storageValue = _encodeFulfillmentInfo(fulfillmentInfo);

        // 5. Using l2StateRoot, verify execution receipt in Inbox contract on dst chain
        bool isValidL2State =
            request.inboxContract.validateAccountStorage(proof.l2StateRoot, proof.dstL2AccountProofParams);
        if (!isValidL2State) {
            revert InvalidL2State();
        }

        // 6. Revert if finalityDelaySeconds in progress
        if (fulfillmentInfo.timestamp + request.finalityDelaySeconds > proof.l2BlockTimestamp) {
            revert FinalityDelaySecondsInProgress();
        }
    }

    function _deriveL1StorageKey(CrossChainRequest calldata request, RIP7755Proof memory proof)
        private
        pure
        returns (bytes memory)
    {
        return abi.encode(keccak256(abi.encodePacked(proof.l2BlockTimestamp, request.l2OracleStorageKey)));
    }

    function _encodeFulfillmentInfo(RIP7755Inbox.FulfillmentInfo calldata fulfillmentInfo)
        private
        pure
        returns (bytes memory)
    {
        return abi.encodePacked(fulfillmentInfo.filler, fulfillmentInfo.timestamp);
    }
}
