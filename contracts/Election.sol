pragma solidity ^0.5.0;

contract Election {
  // Model a candidate
  // Store candidates
  // Fetch candidates
  // Store Candidates Count
  address private admin;

  struct Candidate {
    uint id;
    string name;
    uint voteCount;
  }

  mapping(address => bool) public voters;
  mapping(uint => Candidate) public candidates;

  uint public candidatesCount;

  constructor() public {
    admin = msg.sender;
    addCandidate("Candidate 1");
    addCandidate("Candidate 2");
  }

  function addCandidate(string memory _name) public {
    require(msg.sender == admin);
    candidatesCount ++;
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
  }

  function vote(uint _candidateId) public {
    require(!voters[msg.sender], "You can only vote once.");
    //_candidate_id should be at least 2 by the constructor, but I'm future-proofing.
    require(_candidateId >=1  && _candidateId <= candidatesCount, "Invalid Candidate Id.");

    voters[msg.sender] = true;
    candidates[_candidateId].voteCount ++;

  }


}
