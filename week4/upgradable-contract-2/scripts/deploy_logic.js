const contractName = process.env.contractName

async function main(contractName) {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account: ', deployer.address)

  console.log(8, contractName)

  const Token = await ethers.getContractFactory(contractName)
  const hardhatToken = await Token.deploy()
  console.log('Token address: ', hardhatToken.address)
}

module.exports = {
  main,
}

main(contractName)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
