# Readme

### 踩坑

1. 不能直接通过调用合约的不存在的方法去调用他的 fallback，需要通过另一个合约使用 abi，或通过 ethers.provider 来处理。参考 [stackoverflow](https://ethereum.stackexchange.com/questions/148718/get-an-error-calling-delegate-contract-function-with-hardhat-console/148722#148722)

### Logic1 address

local: 0x5FbDB2315678afecb367f032d93F642f64180aa3

Token address: 0xfbAe340608EE35ceDEdb6519faC31C8fD186d10D

### Logic2 address

Token address: 0x802928d5E5590F1768E20974689292EEc63ed6C9

### SimpleUpgrade address

local: 0x5FbDB2315678afecb367f032d93F642f64180aa3

Token address: 0x910dd384e42BF33463AB1242Cf7189BCe7C3EEBE
