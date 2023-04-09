require('@nomiclabs/hardhat-ethers')
require('@openzeppelin/hardhat-upgrades')
require('dotenv').config()

const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const URL = process.env.URL

module.exports = {
  solidity: '0.8.17',
  defaultNetwork: 'hardhat',
  networks: {
    localhost: {
      chainId: 31337,
    },
    bscTestnet: {
      url: URL,
      chainId: 97,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
}
