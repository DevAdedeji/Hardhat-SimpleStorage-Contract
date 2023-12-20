const { task } = require("hardhat/config")

task("accounts", "Print signer accounts", async (taskArguments, hre)=> {
    const signers = await hre.ethers.getSigners();
    for (const account of signers){
      console.log(account.address)
    }
  })

module.exports =  {}