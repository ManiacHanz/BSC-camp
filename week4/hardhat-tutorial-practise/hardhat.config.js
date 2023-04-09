/** @type import('hardhat/config').HardhatUserConfig */
require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

const PRIVATE_KEY = process.env.PRIVATE_KEY
const URL = process.env.URL

module.exports = {
  solidity: '0.8.18',
  networks: {
    bscTestnet: {
      url: URL,
      chainId: 97,
      accounts: [PRIVATE_KEY],
    },
  },
}
