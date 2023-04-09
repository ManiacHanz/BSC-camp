// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import 'hardhat/console.sol';

contract Token {
    string public name = 'My Hardhat Token';
    string public symbol = 'MHT';

    uint public totalSupply = 100000;

    address public owner;

    mapping(address => uint256) balances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, 'Not enough tokens');
        balances[msg.sender] -= amount;
        balances[to] += amount;

        console.log('balances', balances[to]);
        emit Transfer(msg.sender, to, amount);
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
