const networkConfig = {
    // created a networkConfig object for different network to use diffrent contract address of priceFeed in different network
    5: {
        name: "goerli",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },
    137: {
        name: "polygon mainnet",
        ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    },
    //31337
}
const developmentChains = ["hardhat", "localhost", "ganache"]

const DECIMAL = 8
const INITIAL_ANSWER = 200000000000

module.exports = {
    networkConfig,
    developmentChains,
    DECIMAL,
    INITIAL_ANSWER,
}
