// SPDX-License-Identifier: MIT
//1. Pragma statements
pragma solidity ^0.8.0;

//2. Import statements
import "./PriceConverter.sol";

//3. Error codes
error FundMe__NotOwner();

//4. Interfaces, 5. Libraries, 6. Contracts

/**
 * @title A contract for crowd funding
 * @author ahdrahees
 * @notice This contract is to demo a sample funding contract
 * @dev This implement price feeds as our library
 */
contract FundMe {
    //a. Type declarations
    using PriceConverter for uint256; // attaching library into uint256

    //b. State variables
    uint256 public constant MINIMUM_USD = 50 * 1e18; // 1 * 10**18
    // 21,393 gas- constant = 21393 * 12 == 0.31062636 usd
    //23,493 gas =  23493 * 12000000000= 0.000281916 eth= 0.34111836 usd - without constant var

    address[] public s_funders; // s_ indicate this will be storage variable ( convection or style, practices)
    mapping(address => uint256) public s_addressToAmountedFunded;

    address public immutable i_owner;

    //23644 gas-
    // 21508 gas- immutable

    AggregatorV3Interface public s_priceFeed;

    //c. Events, d. Errors, e. Modifiers
    modifier onlyOwner() {
        // require(msg.sender == i_owner, "Sender is not owner!");       // to check the owner of the contract
        if (msg.sender != i_owner) {
            revert FundMe__NotOwner();
        }
        _; // continue rest of the code in the withdraw() if the require is true
    }

    //f. Functions
    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    // receive() external payable {
    //     fund();
    // }

    // fallback() external payable {
    //     fund();
    // }

    /**
     * @notice This function fund this contarct
     * @dev This implement price feeds as our library
     */
    function fund() public payable {
        require(
            msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
            "Didn't send enough ETH!"
        );
        s_funders.push(msg.sender);
        s_addressToAmountedFunded[msg.sender] += msg.value;
    }

    function withdraw() public onlyOwner {
        for (
            uint256 funderIndex = 0;
            funderIndex < s_funders.length;
            funderIndex++
        ) {
            address s_funder = s_funders[funderIndex];
            s_addressToAmountedFunded[s_funder] = 0;
        }
        s_funders = new address[](0); // reset the array funders

        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call withdraw failed");
    }
}
