// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PriceConverter.sol"; //importing PriceConverter

//859,865
//840281
//816858
error NotOwner();

contract FundMe {
    using PriceConverter for uint256; // attaching library into uint256

    uint256 public constant MINIMUM_USD = 50 * 1e18; // 1 * 10**18
    // 21,393 gas- constant = 21393 * 12 == 0.31062636 usd
    //23,493 gas =  23493 * 12000000000= 0.000281916 eth= 0.34111836 usd - without constant var

    address[] public funders;
    mapping(address => uint256) public addressToAmountedFunded;

    address public immutable i_owner;

    //23644 gas-
    // 21508 gas- immutable

    constructor() {
        i_owner = msg.sender;
    }

    function fund() public payable {
        require(
            msg.value.getConversionRate() >= MINIMUM_USD,
            "Didn't send enough!"
        );
        funders.push(msg.sender);
        addressToAmountedFunded[msg.sender] += msg.value;
    }

    function withdraw() public onlyOwner {
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            addressToAmountedFunded[funder] = 0;
        }
        funders = new address[](0); // reset the array funders

        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call withdraw failed");
    }

    modifier onlyOwner() {
        // require(msg.sender == i_owner, "Sender is not owner!");       // to check the owner of the contract
        if (msg.sender != i_owner) {
            revert NotOwner();
        }
        _; // continue rest of the code in the withdraw() if the require is true
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}
