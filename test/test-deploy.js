const { ethers, run, network } = require("hardhat")
const { assert, expect } = require("chai")

describe("SimpleStorage", () => {
    let simpleStorage
    beforeEach(async () => {
        simpleStorage = await ethers.deployContract("SimpleStorage")
        await simpleStorage.waitForDeployment()
    })

    it("Should start with a favourite number of 0", async () => {
        const currentValue = await simpleStorage.retrieveFavNumber()
        const expectedValue = "0"
        // assert.equal(currentValue.toString(), expectedValue)
        expect(currentValue.toString()).to.equal(expectedValue)
    })

    it("Should update when we call store", async () => {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.storeFavNumber(7)
        await transactionResponse.wait(1)
        const updatedValue = await simpleStorage.retrieveFavNumber()
        assert.equal(updatedValue.toString(), expectedValue)
    })

    it("People should be empty", async () => {
        const people = simpleStorage.people
        const expectedValue = 0
        assert.equal(people.length, expectedValue)
    })

    it("Should add person to people", async () => {
        const personToBeAdded = { name: "Adedeji", favoriteNumber: 666 }
        const transactionResponse = await simpleStorage.addPerson(
            personToBeAdded.name,
            personToBeAdded.favoriteNumber,
        )
        await transactionResponse.wait(1)
        const people = simpleStorage.people
        for (let i = 0; i < people.length; i++) {
            assert.equal(people[i].name, personToBeAdded.name)
            break
        }
    })
})
