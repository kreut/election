const truffleAssert = require('truffle-assertions');

var Election = artifacts.require("./Election.sol");

contract("Election", accounts => {
  let electionInstance;
    beforeEach('setup contract for each test', async () => {
        electionInstance = await Election.deployed();
    });

  it("initializes with two candidates", async () => {
    candidatesCount = await electionInstance.candidatesCount();
    assert.equal(candidatesCount, 2, 'two candidates are initialized');

    candidate_1 = await electionInstance.candidates(1);
    assert.equal(candidate_1['id'], '1', 'It assigns the correct id to candidate 1');
    assert.equal(candidate_1['name'], 'Candidate 1', 'It assigns the correct name to candidate 1');
    assert.equal(candidate_1['voteCount'], '0', 'It assigns the correct voteCount to candidate 1');

    candidate_2 = await electionInstance.candidates(2);
    assert.equal(candidate_2['id'], '2', 'It assigns the correct id to candidate 2');
    assert.equal(candidate_2['name'], 'Candidate 2', 'It assigns the correct name to candidate 2');
    assert.equal(candidate_2['voteCount'], '0', 'It assigns the correct voteCount to candidate 2');
  });

  it("adds a candidate", async () => {
    await electionInstance.addCandidate('Mike');
    candidatesCount = await electionInstance.candidatesCount();
    candidate = await electionInstance.candidates(3);

    assert.equal(candidatesCount.toNumber(), 3, 'it increments the candidatesCount');
    assert.equal(candidate['id'].toNumber(), 3, 'it assigns the Candidate the correct id');
    assert.equal(candidate['name'], 'Mike', 'it assigns the Candidate the correct name');
    assert.equal(candidate['voteCount'].toNumber(), 0, 'it assigns an initial voteCount of 0');
  })
});
