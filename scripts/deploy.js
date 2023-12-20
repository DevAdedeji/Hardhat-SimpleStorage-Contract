const { ethers, run, network } = require("hardhat")
require("dotenv").config()

async function main() {
    const simpleStorage = await ethers.deployContract("SimpleStorage")
    await simpleStorage.waitForDeployment()
    const address = await simpleStorage.getAddress()
    // Verify contract on etherscan if network is not hardhat
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deploymentTransaction().wait(6)
        await verify(address, [])
    }
    // Get current value
    const currentFavNumber = await simpleStorage.retrieveFavNumber()
    console.log(`Current value is: ${currentFavNumber}`)
    // Store favNumber
    const transactionResponse = await simpleStorage.storeFavNumber(500)
    await transactionResponse.wait(1)
    // Get updated value
    const updatedFavNumber = await simpleStorage.retrieveFavNumber()
    console.log(`Updated value is: ${updatedFavNumber}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying contract")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        } else {
            console.log(e)
        }
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
