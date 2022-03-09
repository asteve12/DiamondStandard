import {ethers} from "hardhat";
import { getSelectors, FacetCutAction } from "./libraries/diamond";
import { DiamondCutFacet} from "../typechain-types"
/* global ethers */
/* eslint prefer-const: "off" */





export async function main() {
  const facet = [];
  const tf1 = await ethers.getContractFactory("Test1Facet");
  const detf1 = await tf1.deploy()
   const accounts = await ethers.getSigners();
   const contractOwner = accounts[0];

 await detf1.deployed();

  console.log("test1FACET",detf1.address)
  facet.push({
    facetAddress:detf1.address,
    action: FacetCutAction.Add,
    functionSelectors: getSelectors(detf1)
  })

  const cutDiamond = (await ethers.getContractAt(
    "DiamondCutFacet",
    contractOwner.address
  )) as DiamondCutFacet;
  const functionData = detf1.interface.encodeFunctionData("balanceOf")
  const addingDiamond = await cutDiamond.diamondCut(facet,detf1.address,functionData)
   console.log("Diamond cut tx: ", addingDiamond.hash);
  let receipt = await addingDiamond.wait();
  if (!receipt.status) {
    throw Error(`testfacet1 Diamond upgrade failed: ${addingDiamond.hash}`);
  }
  console.log("testFacet1 upgrade successful");
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

exports.main = main;
