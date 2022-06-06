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
    mapping(uint256 => address) internal idToOwner;

    function mint(address _to) public {
        uint256 _tokenId = tokenCounter;
        idToOwner[_tokenId] = _to;
        tokenCounter++;
        emit Mint(_to, _tokenId);
    }

    function transfer(address _to, uint256 _tokenId) public {
        require(msg.sender == idToOwner[_tokenId]);
        idToOwner[_tokenId] = _to;
        emit Transfer(msg.sender, _to, _tokenId);
    }

    function getTokensOfId(address from) public view returns (uint256[] memory) {
        uint256[] memory _tokens = new uint256[](tokenCounter);
        for (uint256 i = 0; i < tokenCounter; i++) {
            if (idToOwner[i] == from) {
                _tokens[i] = i;
            }
        }
        return _tokens;
    }

    function getTokens() public view returns(address[] memory) {
        address[] memory _tokens = new address[](tokenCounter);
        for (uint256 i = 0; i < tokenCounter; i++) {
            _tokens[i] = idToOwner[i];
        }
        return _tokens;
    }
}