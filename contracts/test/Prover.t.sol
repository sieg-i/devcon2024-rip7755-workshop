// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from "forge-std/Test.sol";
import {stdJson} from "forge-std/StdJson.sol";

import {Prover} from "../src/RIP7755/provers/Prover.sol";
import {StateValidator} from "../src/RIP7755/libraries/StateValidator.sol";
import {Call, CrossChainRequest} from "../src/RIP7755/RIP7755Structs.sol";
import {RIP7755Inbox} from "../src/RIP7755/RIP7755Inbox.sol";
import {RIP7755Outbox} from "../src/RIP7755/RIP7755Outbox.sol";
import {MockEIP4788} from "../src/rollups/MockEIP4788.sol";

contract ProverTest is Test {
    using stdJson for string;

    // Prover public prover;
    // RIP7755Outbox public outbox;
    // MockEIP4788 public mockEIP4788;

    // string validProof;
    // bytes32 private constant _VERIFIER_STORAGE_LOCATION =
    //     0x43f1016e17bdb0194ec37b77cf476d255de00011d02616ab831d2e2ce63d9ee2;

    // function setUp() public {
    //     outbox = new RIP7755Outbox();
    //     mockEIP4788 = new MockEIP4788();
    //     prover = new Prover(address(mockEIP4788));

    //     string memory rootPath = vm.projectRoot();
    //     string memory path = string.concat(rootPath, "/test/data/proof.json");
    //     validProof = vm.readFile(path);

    //     mockEIP4788.commitBeaconRoot(1, 1730930824, 0x429009a0eb2c49ec2248929ed3635e4c4f23c5c451a13f13040715db71c34006);
    // }

    // function test_validateProof() public view {
    //     Call[] memory calls = new Call[](1);
    //     calls[0] = Call({
    //         to: 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9,
    //         data: hex"6a627842000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    //         value: 1000000000000000000
    //     });
    //     CrossChainRequest memory request = CrossChainRequest({
    //         requester: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,
    //         calls: calls,
    //         proverContract: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512,
    //         destinationChainId: 111112,
    //         inboxContract: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0,
    //         l2Oracle: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512,
    //         l2OracleStorageKey: bytes32(uint256(1)),
    //         rewardAsset: 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE,
    //         rewardAmount: 1020000000000000000,
    //         finalityDelaySeconds: 10,
    //         nonce: 1,
    //         expiry: 1731535593,
    //         precheckContract: address(0),
    //         precheckData: ""
    //     });
    //     RIP7755Inbox.FulfillmentInfo memory fillInfo = RIP7755Inbox.FulfillmentInfo({
    //         timestamp: 1730930796,
    //         filler: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
    //     });

    //     bytes memory storageProofData = _buildProof(validProof);
    //     bytes memory inboxStorageKey = _deriveStorageKey(request);

    //     prover.validateProof(inboxStorageKey, fillInfo, request, storageProofData);
    // }

    // function _buildProof(string memory json) private pure returns (bytes memory) {
    //     StateValidator.AccountProofParameters memory dstL2StateRootParams = StateValidator.AccountProofParameters({
    //         storageKey: json.readBytes(".dstL2StateRootProofParams.storageKey"),
    //         storageValue: json.readBytes(".dstL2StateRootProofParams.storageValue"),
    //         accountProof: abi.decode(json.parseRaw(".dstL2StateRootProofParams.accountProof"), (bytes[])),
    //         storageProof: abi.decode(json.parseRaw(".dstL2StateRootProofParams.storageProof"), (bytes[]))
    //     });
    //     StateValidator.AccountProofParameters memory dstL2AccountProofParams = StateValidator.AccountProofParameters({
    //         storageKey: json.readBytes(".dstL2AccountProofParams.storageKey"),
    //         storageValue: json.readBytes(".dstL2AccountProofParams.storageValue"),
    //         accountProof: abi.decode(json.parseRaw(".dstL2AccountProofParams.accountProof"), (bytes[])),
    //         storageProof: abi.decode(json.parseRaw(".dstL2AccountProofParams.storageProof"), (bytes[]))
    //     });

    //     Prover.RIP7755Proof memory proofData = Prover.RIP7755Proof({
    //         l1Timestamp: json.readUint(".l1Timestamp"),
    //         l2BlockNumber: json.readUint(".l2BlockNumber"),
    //         dstL2StateRootProofParams: dstL2StateRootParams,
    //         dstL2AccountProofParams: dstL2AccountProofParams
    //     });
    //     return abi.encode(proofData);
    // }

    // function _deriveStorageKey(CrossChainRequest memory request) private pure returns (bytes memory) {
    //     bytes32 requestHash = keccak256(abi.encode(request));
    //     return abi.encode(keccak256(abi.encodePacked(requestHash, _VERIFIER_STORAGE_LOCATION)));
    // }
}
