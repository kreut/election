const truffleAssert = require('truffle-assertions');

var Election = artifacts.require("./Election.sol");

contract("Election", accounts => {
  let electionInstance;
    beforeEach('setup contract for each test', async () => {
        electionInstance = await Election.deployed();
    });

  it("initializes the contract with the correct values", async () => {
    let candidate = await electionInstance.candidate();
    assert.equal("Candidate 1", candidate, "it returns the correct candidate");
  });
});
