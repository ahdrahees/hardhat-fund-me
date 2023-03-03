require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("dotenv").config()

const GOERLI_RPC_URL =
    process.env.GOERLI_RPC_URL ||
    "https://eth-mainnet.g.alchemy.com/v2/your-api-key"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
    },
    // solidity: "0.8.17",  // we can add multilpe solidity versions for compiler
    solidity: {
        compilers: [
            { version: "0.8.0" },
            { version: "0.8.2" },
            { version: "0.8.17" },
            { version: "0.6.6" },
        ],
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
}
