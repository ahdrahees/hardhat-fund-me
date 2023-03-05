const { deployments, ethers } = require("hardhat")

describe("FundMe", async function () {
    let fundMe
    beforeEach(async function () {
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe")
    })
    describe("constructor", async function () {})
})
ethers
