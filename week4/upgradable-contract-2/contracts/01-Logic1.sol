// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract Logic1 {
  address public implementation;
  address public admin;
  string public words;

  function overrideWords() public {
    words = 'old';
  }

  function getWords() public view returns (string memory) {
    return words;
  }
}
