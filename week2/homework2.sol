// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LiquidityMining is Ownable {
    ERC20 public token; // 代币合约地址
    uint256 public totalSupply; // 总供应量
    mapping(address => uint256) public balances;
    uint256 public constant DURATION = 30 days;
    uint256 public startTimestamp;
    uint256 public endTimestamp;
    uint256 public rewardPerDay;

    constructor(address _token) {
        token = ERC20(_token);
        startTimestamp = block.timestamp;
        endTimestamp = startTimestamp + DURATION;
        rewardPerDay = 1000 ether; // 每天奖励1000代币
    }

    function setRewardPerDay(uint256 _rewardPerDay) public onlyOwner {
        rewardPerDay = _rewardPerDay;
    }

    function deposit(uint256 _amount) public {
        require(block.timestamp >= startTimestamp && block.timestamp < endTimestamp, "Mining not started or ended");
        require(_amount > 0, "Amount must be greater than zero");
        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        balances[msg.sender] += _amount;
        totalSupply += _amount;
    }

    function withdraw(uint256 _amount) public {
        require(block.timestamp >= endTimestamp, "Mining not ended");
        require(_amount > 0, "Amount must be greater than zero");
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        totalSupply -= _amount;
        require(token.transfer(msg.sender, _amount), "Transfer failed");
    }

    function claim() public {
        require(block.timestamp >= startTimestamp && block.timestamp < endTimestamp, "Mining not started or ended");
        uint256 timeElapsed = block.timestamp - startTimestamp;
        uint256 reward = rewardPerDay * timeElapsed / 1 days;
        uint256 claimAmount = reward * balances[msg.sender] / totalSupply;
        require(claimAmount > 0, "Nothing to claim");
        require(token.transfer(msg.sender, claimAmount), "Transfer failed");
    }
}

