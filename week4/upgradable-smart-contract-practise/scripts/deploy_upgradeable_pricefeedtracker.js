const { ethers, network, upgrades } = require('hardhat')

async function main() {
  const PriceFeedTracker = await ethers.getContractFactory('PriceFeedTracker')
  console.log('Deploying PriceFeedTracker to ', network.name)

  const [account1] = await ethers.getSigners()
  const pricefeedTracker = await upgrades.deployProxy(
    PriceFeedTracker,
    [account1.address], // pass to initialize function
    { initializer: 'initialize' }
  )
  await pricefeedTracker.deployed()

  console.log('PriceFeedTracker deployed to ', pricefeedTracker.address)
}

main()
