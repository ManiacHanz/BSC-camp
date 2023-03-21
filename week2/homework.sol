// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyContract {
    IERC20 public token;
    uint256 public totalStaked;
    uint256 public rewardRate;
    uint256 public startTime;
    mapping(address => uint256) public balances;
    mapping(address => uint256) public rewards;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);

    constructor(IERC20 _token, uint256 _rewardRate) {
        token = _token;
        rewardRate = _rewardRate;
        startTime = block.timestamp;
    }

    function stake(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");
        updateReward(msg.sender);
        token.transferFrom(msg.sender, address(this), _amount);
        balances[msg.sender] += _amount;
        totalStaked += _amount;
        emit Staked(msg.sender, _amount);
    }

    function withdraw(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");
        updateReward(msg.sender);
        token.transfer(msg.sender, _amount);
        balances[msg.sender] -= _amount;
        totalStaked -= _amount;
        emit Withdrawn(msg.sender, _amount);
    }

    function getReward() external {
        updateReward(msg.sender);
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            token.transfer(msg.sender, reward);
            emit RewardPaid(msg.sender, reward);
        }
    }

    function updateReward(address _account) internal {
        if (block.timestamp > startTime) {
            uint256 reward = calculateReward(_account);
            rewards[_account] += reward;
            startTime = block.timestamp;
        }
    }

    function calculateReward(address _account) internal view returns (uint256) {
        uint256 timeElapsed = block.timestamp - startTime;
        return balances[_account] * rewardRate * timeElapsed / (365 days * 1e18);
    }
}
