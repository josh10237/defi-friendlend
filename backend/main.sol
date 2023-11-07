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
    }

    struct LoanRequest {
        address borrower;
        uint256 amount;
        uint256 filled;
        uint256 dueDate;
        bool isFulfilled;
        mapping(address => uint256) contributions;
    }

    address public owner;
    mapping(address => Member) public members;
    LoanRequest[] public loanRequests;
    mapping(address => uint256) public bannedMembers;

    constructor() {
        owner = msg.sender;
    }

    function proposeInvite(address newMemberAddress) public {
        // Logic to propose a new member
    }

    function voteOnPendingPerson(address candidateAddress, bool vote) public {
        // Logic to vote on a pending member
    }

    function join(string memory nickname) public {
        // Logic for a new member to join
    }

    function depositFunds(uint256 amount) public payable {
        // Logic to deposit funds into the lending pool
    }

    function requestLoan(uint256 amount, uint256 interestRate, uint256 dueDate, string memory reason) public {
        // Logic to request a new loan
    }

    function fillLoanRequest(uint256 loanId, uint256 contribution) public {
        // Logic to contribute to a loan request
    }

    function withdrawFunds(uint256 amount) public {
        // Logic to withdraw funds from the lending pool
    }

    function cancelLoan(uint256 loanId) public {
        // Logic to cancel an unfilled loan request
    }

    function payNowLoan(uint256 loanId) public {
        // Logic to pay off an outstanding loan early
    }

    function getAllMembers() public view returns (Member[] memory) {
        // Logic to retrieve all non-pending members
    }

    function getAllOpenLoans() public view returns (LoanRequest[] memory) {
        // Logic to get all open loan requests
    }

    function getPendingMembers() public view returns (Member[] memory) {
        // Logic to list all pending members
    }

    // System and helper functions are not fully implemented due to their complex nature
    // and requirement for further specifications.

    // ... Additional functions like autoPayLoan, default, calculateInterest, updateFriendScore, checkMembershipStatus ...

}
