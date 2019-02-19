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


}
