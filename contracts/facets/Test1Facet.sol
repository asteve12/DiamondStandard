// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Test1Facet {
 
function balanceOf()public view returns(uint256 x){
        x = type(uint256).max;
        console.log(x);

    }

 
}
