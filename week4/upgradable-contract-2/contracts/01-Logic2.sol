// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract Logic2 {
  address public implementation;
  address public admin;
  string public words;

  function overrideWords(string memory word) public {
    words = word;
  }

  function getWords() public view returns (string memory) {
    return words;
  }
}
