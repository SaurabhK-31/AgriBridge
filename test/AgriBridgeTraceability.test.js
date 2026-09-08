const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AgriBridgeTraceability Contract", function () {
    let contract;
    let owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        const ContractFactory = await ethers.getContractFactory("AgriBridgeTraceability");
        contract = await ContractFactory.deploy();
        await contract.waitForDeployment();
    });

    it("Should register a batch and return cryptographic hash", async function () {
        const batchId = "AG-TEST-101";
        const cryptoHash = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

        await contract.registerBatch(batchId, cryptoHash);

        const retrievedHash = await contract.getBatchHash(batchId);
        expect(retrievedHash).to.equal(cryptoHash);

        const verification = await contract.verifyBatch(batchId);
        expect(verification.exists).to.equal(true);
        expect(verification.cryptographicHash).to.equal(cryptoHash);
    });

    it("Should prevent duplicate batch registration", async function () {
        const batchId = "AG-TEST-102";
        const cryptoHash = "0x1234567890abcdef";

        await contract.registerBatch(batchId, cryptoHash);

        await expect(contract.registerBatch(batchId, cryptoHash)).to.be.revertedWith(
            "AgriBridge: Batch ID already registered"
        );
    });

    it("Should record supply chain events on-chain", async function () {
        const batchId = "AG-TEST-103";
        const cryptoHash = "0xabcdef1234567890";

        await contract.registerBatch(batchId, cryptoHash);
        await contract.addSupplyChainEvent(batchId, "QUALITY_CHECKED", "APMC Mandi", "Grade A Export");

        const eventCount = await contract.getBatchEventsCount(batchId);
        expect(eventCount).to.equal(2); // Initial farm + quality check
    });
});
