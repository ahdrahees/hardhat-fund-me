# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

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

