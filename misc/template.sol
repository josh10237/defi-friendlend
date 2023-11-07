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
    address[] public memberAddresses;
    LoanRequest[] public loanRequests;
    mapping(address => address[]) public pendingInvites;
    mapping(address => mapping(address => bool)) public votes;

    // Events
    event NewMember(address indexed member, string username);
    event LoanRequested(address indexed borrower, uint256 amount, uint256 dueDate);
    event LoanFulfilled(uint256 indexed loanId, address indexed lender, uint256 amount);
    event InviteProposed(address indexed proposer, address indexed invitee);
    event Voted(address indexed voter, address indexed candidate, bool vote);

    // Modifier to check if the caller is a member
    modifier onlyMember() {
        require(bytes(members[msg.sender].username).length > 0, "Not a member");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function join(string memory _username) external {
        require(bytes(members[msg.sender].username).length == 0, "Already a member");
        Member memory newMember = Member({
            username: _username,
            friendScore: 0,
            balance: 0
        });
        members[msg.sender] = newMember;
        memberAddresses.push(msg.sender);
        emit NewMember(msg.sender, _username);
    }

    function proposeInvite(address _invitee) external onlyMember {
        pendingInvites[msg.sender].push(_invitee);
        emit InviteProposed(msg.sender, _invitee);
    }

    function voteOnPendingPerson(address _candidate, bool _vote) external onlyMember {
        require(!votes[msg.sender][_candidate], "Already voted");
        votes[msg.sender][_candidate] = true;
        if (_vote) {
            members[_candidate].friendScore += 1;
        }
        emit Voted(msg.sender, _candidate, _vote);
    }

    function requestLoan(uint256 _amount, uint256 _dueDate) external onlyMember {
        LoanRequest memory newRequest = LoanRequest({
            borrower: msg.sender,
            amount: _amount,
            filled: 0,
            dueDate: _dueDate,
            isFulfilled: false
        });
        loanRequests.push(newRequest);
        emit LoanRequested(msg.sender, _amount, _dueDate);
    }

    function fillLoanRequest(uint256 _loanId, uint256 _amount) external payable onlyMember {
        LoanRequest storage request = loanRequests[_loanId];
        require(!request.isFulfilled, "Loan is already fulfilled");
        require(msg.value == _amount, "Amount mismatch");
        require(request.amount >= request.filled + _amount, "Overfilling loan request");

        request.filled += _amount;
        members[request.borrower].balance += _amount;
        if (request.filled == request.amount) {
            request.isFulfilled = true;
        }
        emit LoanFulfilled(_loanId, msg.sender, _amount);
    }

    // Allow members to withdraw their balance
    function withdrawBalance() external onlyMember {
        uint256 amount = members[msg.sender].balance;
        require(amount > 0, "Insufficient balance");
        payable(msg.sender).transfer(amount);
        members[msg.sender].balance = 0;
    }

    // A function to check the member's balance
    function checkBalance(address _member) external view returns (uint256) {
        return members[_member].balance;
    }
}
