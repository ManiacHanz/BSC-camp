const { Signer } = require('ethers')
const { ethers } = require('hardhat')

const overrideWordsABI = [
  {
    inputs: [],
    name: 'overrideWords',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

async function main() {
  const SimpleUpgradeFactory = await ethers.getContractFactory('SimpleUpgrade')
  const SimpleUpgrade = SimpleUpgradeFactory.attach(
    '0x910dd384e42BF33463AB1242Cf7189BCe7C3EEBE'
  )

  const Logic1Address = SimpleUpgrade.implementation()
  const Logic1Factory = await ethers.getContractFactory('Logic1')
  const Logic1 = Logic1Factory.attach(Logic1Address)

  const iface = new ethers.utils.Interface(overrideWordsABI)
  const overrideWordsData = iface.encodeFunctionData('overrideWords')

  const [deployer] = await ethers.getSigners()
  const signer = ethers.provider.getSigner(deployer.address)

  const tx = await signer.sendTransaction({
    to: SimpleUpgrade.address,
    data: overrideWordsData,
    gasLimit: 30000000,
  })
  await tx.wait()

  words = await SimpleUpgrade.words()
  console.log('words: ', words)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
