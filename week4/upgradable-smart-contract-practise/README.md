# Readme

学习地址： https://blog.chain.link/upgradable-smart-contracts-zh/

Deploying PriceFeedTracker to bscTestnet
PriceFeedTracker deployed to 0x6a2633b84a8a0BdACBff722bF36e97C3fC824973

#### 踩坑

1. Error: Package subpath './lib/utils' is not defined by "exports" in /Users/hao/Workspace/Practise/BSC-camp/week4/upgradable-smart-contract-practise/node_modules/ethers/package.json

   > 需要降低 ethers 的版本。从 6.x 降到 5.4.x 即可

2. AggregatorV3Interface.latestRoundData 返回 5 个参数，所以左边也需要用五个参数接收

```solidity
(, int price, , , ) = aggregator.latestRoundData();
```

3. (await v1.retrievePrice()) 应该修改成 (await priceFeedTracker.retrievePrice())
