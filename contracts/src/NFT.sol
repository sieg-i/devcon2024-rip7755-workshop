// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC721} from "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";
import {Address} from "openzeppelin-contracts/contracts/utils/Address.sol";

contract NFT is ERC721, Ownable {
    using Address for address payable;

    uint256 public immutable MINT_PRICE;

    uint256 private _tokenId;

    constructor(uint256 mintPrice) ERC721("DevCon", "DC") Ownable(msg.sender) {
        MINT_PRICE = mintPrice;
    }

    function mint(address to) external payable {
        require(msg.value >= MINT_PRICE, "Insufficient funds sent");
        _mint(to, _getNextTokenId());
    }

    function withdraw() external onlyOwner {
        payable(owner()).sendValue(address(this).balance);
    }

    function _getNextTokenId() private returns (uint256) {
        unchecked {
            return ++_tokenId;
        }
    }
}
