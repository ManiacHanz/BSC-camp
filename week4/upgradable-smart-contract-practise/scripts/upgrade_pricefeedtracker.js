const { ethers, upgrades } = require('hardhat')

async function main() {
  const deployedProxyAddress = '0x6a2633b84a8a0BdACBff722bF36e97C3fC824973'

  const PriceFeedTrackerV2 = await ethers.getContractFactory(
    'PriceFeedTrackerV2'
  )

  console.log('Upgrading PriceFeedTracker...')

  await upgrades.upgradeProxy(deployedProxyAddress, PriceFeedTrackerV2)
  console.log('PriceFeedTracker upgraded')
}

main()
