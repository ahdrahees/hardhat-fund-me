# Crowd Funding Hardhat Project

This project demonstrates Hardhat use case. It comes with a FundMe contract, a test for that contract both unit testing and staging testing, and a script that incract with fund() and withdraw() function in that contract. The contract is deployed by using hardhat-deploy.

Try running some of the following tasks:

1. To deploy contract:

    Localy:
    ```sh
    yarn hardhat deploy
    ```
    Testnet:
    ```sh
    yarn hardhat deploy --network goerli
    ```
    Mainnet:
    ```sh
    yarn hardhat deploy --network mainnet
    ```


2. To run Tests:

    Unit test:
    ```sh
    yarn test
    ```
    Staging test:
    ```sh
    yarn test:staging
    ```
3. To run scripts:
    fund()
    ```sh
    yarn hardhat run scripts/fund.js
    ```
    withdraw()
    ```shell
    yarn hardhat run scripts/withdraw.js
    ```


4. 
```shell
yarn hardhat --help

REPORT_GAS=true yarn hardhat test
yarn hardhat node
```

