const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const {expect} = require('chai');
const { ethers } = require('hardhat');


describe('Token contract', function () {
  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory('Token');
    const [owner, addr1, addr2] = await ethers.getSigners()

    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();

    return {Token, hardhatToken, owner, addr1, addr2};
  }

  it("Deployment should assign the total supply of tokens to the owner", async () => {
    const {hardhatToken, owner} = await loadFixture(deployTokenFixture);
    
    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  })

  it("Should transfer tokens between accounts", async () => {
    const {hardhatToken, addr1, addr2, owner} = await loadFixture(deployTokenFixture);

    // await hardhatToken.transfer(addr1.address, 50);
    // expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);
    await expect(
      hardhatToken.transfer(addr1.address, 50)
    ).to.changeTokenBalances(hardhatToken, [owner, addr1], [-50, 50])


    // await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    // expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
    await expect(
      hardhatToken.connect(addr1).transfer(addr2.address, 50)
    ).to.changeTokenBalances(hardhatToken, [addr1, addr2], [-50, 50])
  })
})