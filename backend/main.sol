// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FriendLend {
    struct Member {
        address memberAddress;
        string username;
        uint256 friendScore;
        uint256 balance;
        bool isPending;
        uint256 dateAdded;
        bool exists;
    }

    struct LoanRequest {
        address borrower;
        uint256 amount;
        uint256 filled;
        uint256 dueDate;
        bool isFulfilled;
        mapping(address => uint256) contributions;
    }


    address public owner; //address of group creator
    mapping(address => Member) public members; //mapping to member structs
    address[] public allMembers; //array of all member addresses

    mapping(address => mapping(address => int)) public votes; //mapping of candidate addresses to a mapping of the people and their votes for the candidate
    uint public memberCount = 0; //number of confirmed members

    LoanRequest[] public loanRequests;
    mapping(address => uint256) public bannedMembers;

    constructor(string memory myUsername) {
        owner = msg.sender;
        members[owner] = Member(owner, myUsername, 0, 0, false, 0, true);
        memberCount += 1;
        allMembers.push(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    modifier onlyMembers() {
        require(!members[msg.sender].isPending, "Only members can call this function.");
        _;
    }

    function proposeInvite(address newMemberAddress) public onlyMembers(){
        // Logic to propose a new member
        require(!members[newMemberAddress].exists, "member already exists");
        members[newMemberAddress] = Member(newMemberAddress, "", 0, 0, true, 0, true);
        allMembers.push(newMemberAddress);
    }


    function voteOnPendingPerson (address candidateAddress, bool vote) public onlyMembers(){
        // Logic to vote on a pending member
        require(candidateAddress != msg.sender, 'Cannot vote for yourself');
        require(members[candidateAddress].isPending, 'Candidate must be pending');
        require(votes[candidateAddress][msg.sender] == 0, "already voted for this candidate");
        if (vote) {
            votes[candidateAddress][msg.sender] = 1;
        } else {
            votes[candidateAddress][msg.sender] = -1;
        }
    }


    function join(string memory username) public {
        require(canJoin(), 'Member does not have enough votes');
        require(members[msg.sender].isPending, 'Member must be pending to join');
        members[msg.sender].username = username;
        members[msg.sender].isPending = true;
        allMembers.push(msg.sender);
        memberCount += 1;
    }

    function depositFunds(uint256 amount) public onlyMembers() payable {
        // Logic to deposit funds into the lending pool
        members[msg.sender].balance += msg.value;
    }

    function requestLoan(uint256 amount, uint256 interestRate, uint256 dueDate, string memory reason) public {
        // Logic to request a new loan
    }

    function fillLoanRequest(uint256 loanId, uint256 contribution) public {
        // Logic to contribute to a loan request
    }

    function withdrawFunds(uint256 amount) public onlyMembers() {
        // Logic to withdraw funds from the lending pool
        require (members[msg.sender].balance >= amount, "insufficient balance");
        members[msg.sender].balance -= amount;
        payable(msg.sender).transfer(amount);
    }

    function cancelLoan(uint256 loanId) public {
        // Logic to cancel an unfilled loan request
    }

    function payNowLoan(uint256 loanId) public {
        // Logic to pay off an outstanding loan early
    }

    function canJoin() public view returns (bool cj) {
        uint sum = 0;

        for (uint i = 0; i < allMembers.length; i++) {
            if (votes[msg.sender][allMembers[i]] == 1) {
                sum ++;
            }
        }
        if (sum * 1e18 / memberCount > 5e17) {
            return true;
        } else {
            return false;
        }
    }

    function getAllMembers() public view returns (Member[] memory) {
        // Logic to retrieve all non-pending members
        Member[] memory nonPending = new Member[](memberCount);
        uint j = 0;
        for (uint i = 0; i < allMembers.length; i++) {
            if (!members[allMembers[i]].isPending) {
                nonPending[j] = members[allMembers[i]];
                j ++;
            }
        }
        return nonPending;
    }

    function getAllOpenLoans() public view returns (int k) {
        // Logic to get all open loan requests
    }


    function getMembersToVoteOn() public onlyMembers() view returns (Member[] memory) {
        // Logic to list all pending member
        //member
        uint count = 0;
        for (uint i = 0; i < allMembers.length; i++) {
            if (members[allMembers[i]].isPending && votes[allMembers[i]][msg.sender] == 0) {
                count ++;
            }
        }
        
        Member[] memory pending = new Member[](count);
        uint j = 0;
        for (uint i = 0; i < allMembers.length; i++) {
            if (members[allMembers[i]].isPending && votes[allMembers[i]][msg.sender] == 0) {
                pending[j] = members[allMembers[i]];
                j ++;

            }
        }
        return pending;

    }
    // System and helper functions are not fully implemented due to their complex nature
    // and requirement for further specifications.

    // ... Additional functions like autoPayLoan, default, calculateInterest, updateFriendScore, checkMembershipStatus ...

}
