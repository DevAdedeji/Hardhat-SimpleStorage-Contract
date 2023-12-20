const { task } = require("hardhat/config")

task("block-number", "Print the current block number", async (taskArguments, hre)=> {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(blockNumber);
  })

module.exports =  {}