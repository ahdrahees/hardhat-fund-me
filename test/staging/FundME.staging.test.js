const { getNamedAccounts, deployment, ethers, network } = require("hardhat")

const { developmentChains } = require("../../helper-hardhat-config")
const { assert } = require("chai")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          //ternary operator is used
          let fundMe
          let deployer
          const sendValue = await ethers.utils.parseUnit("0.05")
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("allow people to fund and withdraw", async function () {
              const fundTxnResponse = await fundMe.fund({
                  value: sendValue,
              })
              await fundTxnResponse.wait(1)

              const withdrawTxnResponse = await fundMe.withdraw()
              await withdrawTxnResponse.wait(1)

              const endingFundMeBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              console.log(
                  endingFundMeBalance.toString() +
                      " should equal 0, running assert equal..."
              )
              assert.equal(endingFundMeBalance.toString(), "0")
          })
      })
