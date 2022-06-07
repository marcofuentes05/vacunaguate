// SPDX-License-Identifier: GPL-3.0

/**
 * @title VacunaGuate
 * @dev Define an NFT representing a COVD vaccine group.
 */

pragma solidity ^0.8.4;

contract VacunaGuate {
    event Mint(address indexed _to, uint256 indexed _tokenId);
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);

    uint256 tokenCounter = 1;
    mapping(uint256 => address) idToOwner;
    mapping(address => uint256[]) ownerToIds;

    function mint(address _to, uint256 tokenId) public {
        idToOwner[tokenId] = _to;
        ownerToIds[_to].push(tokenId);
        tokenCounter++;
        emit Mint(_to, tokenId);
    }

    function transfer(address _to, uint256 _tokenId) public {
        require(msg.sender == idToOwner[_tokenId]);
        idToOwner[_tokenId] = _to;
        ownerToIds[_to].push(_tokenId);
        for (uint i = 0; i < ownerToIds[msg.sender].length; i++) {
            if (ownerToIds[msg.sender][i] == _tokenId) {
                delete ownerToIds[msg.sender][i];
                break;
            }
        }
        emit Transfer(msg.sender, _to, _tokenId);
    }

    function getTokensOfId(address from) public view returns (uint256[] memory) {
        uint256[] memory tokens = new uint256[](ownerToIds[from].length);
        for (uint i = 0 ; i< ownerToIds[from].length ; i++) {
            tokens[i] = ownerToIds[from][i];
        }
        return tokens;
    }

    function getTokenCount() public view returns (uint256) {
        return tokenCounter;
    }

    function getOwnerOfToken(uint256 token) public view returns(address) {
        return idToOwner[token];
    }
}