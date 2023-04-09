const contractName = process.env.contractName
const address = process.env.address

async function main(contractName, address) {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account: ', deployer.address)

  console.log(8, contractName)

  const Token = await ethers.getContractFactory(contractName)
  const hardhatToken = await Token.deploy(address)
  console.log('Token address: ', hardhatToken.address)
}

module.exports = {
  main,
}

main(contractName, address)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
