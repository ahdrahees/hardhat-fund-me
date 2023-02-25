//import
// declaring async main funtion
//calling main funtion

const { network } = require("hardhat")

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
}
