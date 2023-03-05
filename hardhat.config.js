require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("dotenv").config()

const GOERLI_RPC_URL =
    process.env.GOERLI_RPC_URL ||
    "https://eth-mainnet.g.alchemy.com/v2/your-api-key"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"

const GANACHE_RPC_URL = process.env.GANACHE_RPC_URL
const GANACHE_PRIVATE_KEY = process.env.GANACHE_PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            // accounts hardhat automaticaly place
            chainId: 31337,
        },
        ganache: {
            url: GANACHE_RPC_URL,
            accounts: [GANACHE_PRIVATE_KEY],
            chainId: 5777,
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
