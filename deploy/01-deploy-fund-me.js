//import
// declaring async main funtion
//calling main funtion

const { network } = require("hardhat")
const {
    networkConfig,
    developmentChains,
} = require("../helper-hardhat-config.js")
/* similar to above which is in one line
const helperConfig = require("../helper-hardhat-config.js")
const networkConfig = helperConfig.networkConfig    */

const { verify } = require("../utils/verify")

// async function deployFunc(hre) {
// hre.getNamedAccounts
// hre.deployments
// }
// module.exports.default = deployFunc          ////// An alternative exrpressoin for the above expression(which uses non anonymus func) is shown in below this will be anonymus function

// converted above into an anonymus function way
// module.exports = async (hre) => {
//     const { getNamedAccounts, deployments } = hre
// }

// this is similar to above this way is called syntactic sugar
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chianId = network.config.chainId

    // well what happens when we wants to change chains?
    // when going for localhost or hardhat network we wants to use mock

    // if chainId is x use y as address
    // if chainId is a use b as address
    // const ethUsdPriceFeedAddress = networkConfig.chainId.ethUsdPriceFeed
    // const ethUsdPriceFeedAddress = networkConfig[chianId]["ethUsdPriceFeed"] // It is similar to above, it is a way to take value from a nested object

    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chianId]["ethUsdPriceFeed"]
    }

    const args = [ethUsdPriceFeedAddress]
    // deploy
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, // put price feed address here
        log: true,
        waitConfirmations: network.config.blockConfirmation || 1,
    })

    // verify
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args)
    }
    log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
}

module.exports.tags = ["all", "fundme"]
