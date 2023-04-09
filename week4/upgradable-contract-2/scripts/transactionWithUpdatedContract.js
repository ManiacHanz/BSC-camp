const { Signer } = require('ethers')
const { ethers } = require('hardhat')

const overrideWordsABI = [
  {
    inputs: [{ name: 'word', type: 'string' }],
    name: 'overrideWords',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

async function main() {
  const SimpleUpgradeFactory = await ethers.getContractFactory('SimpleUpgrade')
  const SimpleUpgrade = SimpleUpgradeFactory.attach(
    '0x802928d5E5590F1768E20974689292EEc63ed6C9'
  )

  const Logic2Address = SimpleUpgrade.implementation()
  const Logic2Factory = await ethers.getContractFactory('Logic2')
  const Logic2 = Logic2Factory.attach(Logic2Address)

  const iface = new ethers.utils.Interface(overrideWordsABI)
  const overrideWordsData = iface.encodeFunctionData('overrideWords', [
    'this is upgraded contract',
  ])

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
