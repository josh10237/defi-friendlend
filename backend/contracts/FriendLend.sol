// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract FriendLend {
    struct Member {
        address memberAddress;
        string username;
        string myPassword;
        uint256 friendScore;
        uint256 balance;
        bool isPending;
        uint256 dateAdded;
        bool exists;
    }

    struct Loan {
        uint id;
        address borrower;
        uint256 amount;
        uint256 interest;
        uint256 filled;
        uint256 dueDate;
        bool isLent;
        bool isReturned;
        string reason;
        bool exists;
    }

    struct Investment {
        uint256 amount;
        uint256 interest;
        uint256 dueDate;
        address borrower;
        string username;
        string reason;
    }

    address public owner; //address of group creator
    mapping(address => Member) public members; //mapping to member structs
    address[] public allMembers; //array of all member addresses
    string public groupName;
    mapping(address => mapping(address => int)) public votes; //mapping of candidate addresses to a mapping of the people and their votes for the candidate
    uint public memberCount = 0; //number of confirmed members

    uint currLoanId = 0;
    Loan[] public loans; //list of all lones
    mapping(uint => mapping(address => uint)) public loanContributions;
    mapping(address => uint256) public bannedMembers;

    constructor(
        string memory theGroupName,
        string memory myUsername,
        string memory myPassword
    ) public {
        owner = msg.sender;
        members[owner] = Member(
            owner,
            myUsername,
            myPassword,
            0,
            0,
            false,
            0,
            true
        );
        memberCount += 1;
        allMembers.push(msg.sender);
        groupName = theGroupName;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    modifier onlyMembers() {
        require(
            !members[msg.sender].isPending,
            "Only members can call this function."
        );
        _;
    }

    function proposeInvite(address newMemberAddress) public onlyMembers {
        // Logic to propose a new member
        require(!members[newMemberAddress].exists, "member already exists");
        members[newMemberAddress] = Member(
            newMemberAddress,
            "",
            "",
            0,
            0,
            true,
            0,
            true
        );
        allMembers.push(newMemberAddress);
    }

    function voteOnPendingPerson(
        address candidateAddress,
        bool vote
    ) public onlyMembers {
        // Logic to vote on a pending member
        require(candidateAddress != msg.sender, "Cannot vote for yourself");
        require(
            members[candidateAddress].isPending,
            "Candidate must be pending"
        );
        require(
            votes[candidateAddress][msg.sender] == 0,
            "already voted for this candidate"
        );
        if (vote) {
            votes[candidateAddress][msg.sender] = 1;
        } else {
            votes[candidateAddress][msg.sender] = -1;
        }
    }

    function join(string memory username) public {
        require(canJoin(), "Member does not have enough votes");
        require(
            members[msg.sender].isPending,
            "Member must be pending to join"
        );
        members[msg.sender].username = username;
        members[msg.sender].isPending = true;
        allMembers.push(msg.sender);
        memberCount += 1;
    }

    function depositFunds() public payable onlyMembers {
        // Logic to deposit funds into the lending pool
        members[msg.sender].balance += msg.value;
    }

    function requestLoan(
        uint256 amount,
        uint256 interestRate,
        uint256 dueDate,
        string memory reason
    ) public onlyMembers {
        // Logic to request a new loan
        Loan memory loan = Loan(
            currLoanId,
            msg.sender,
            amount,
            interestRate,
            0,
            dueDate,
            false,
            false,
            reason,
            true
        );
        loans.push(loan);
        currLoanId += 1;
    }

    function lendLoan(uint loanId) private {
        require(loans[loanId].id == loanId, "test");
        loans[loanId].isLent = true;
        members[loans[loanId].borrower].balance += loans[loanId].amount;
    }

    function fillLoanRequest(
        uint loanId,
        uint256 contribution
    ) public onlyMembers {
        // Logic to contribute to a loan request
        require(
            loans[loanId].exists,
            "loan does not exist or has been cancelled"
        );
        uint256 togo = loans[loanId].amount - loans[loanId].filled;
        if (togo < contribution) {
            contribution = togo;
        }
        loans[loanId].filled += contribution;
        require(
            members[msg.sender].balance >= contribution,
            "insufficient balance"
        );
        members[msg.sender].balance -= contribution;
        loanContributions[loanId][msg.sender] += contribution;
        if (loans[loanId].filled == loans[loanId].amount) {
            lendLoan(loanId);
        }
    }

    function withdrawFunds(uint256 amount) public onlyMembers {
        // Logic to withdraw funds from the lending pool
        require(members[msg.sender].balance >= amount, "insufficient balance");
        members[msg.sender].balance -= amount;
        payable(address(msg.sender)).transfer(amount);
    }

    function cancelLoan(uint256 loanId) public {
        require(
            loans[loanId].borrower == msg.sender,
            "only the lender can cancel"
        );
        require(loans[loanId].exists, "loan does not exist");
        require(!loans[loanId].isLent, "loan already has been lent");
        loans[loanId].exists = false;
        for (uint i = 0; i < allMembers.length; i++) {
            // repay all people who contributed
            if (loanContributions[loanId][allMembers[i]] > 0) {
                members[allMembers[i]].balance += loanContributions[loanId][
                    allMembers[i]
                ];
            }
        }
    }

    function payLoan(uint256 loanId) public onlyMembers {
        require(
            loans[loanId].exists,
            "loan does not exist or has been cancelled"
        );
        require(
            loans[loanId].borrower == msg.sender,
            "only the lender can cancel"
        );
        require(loans[loanId].isLent, "loan already not been lent");
        require(
            members[loans[loanId].borrower].balance > loans[loanId].amount,
            "you do not have enough balance to repay"
        );
        // Logic to pay off an outstanding loan early

        members[loans[loanId].borrower].balance -=
            (1 + loans[loanId].interest) *
            loans[loanId].amount;
        for (uint i = 0; i < allMembers.length; i++) {
            // repay all people who contribute their contributions + interest
            if (loanContributions[loanId][allMembers[i]] > 0) {
                members[allMembers[i]].balance +=
                    (1 + loans[loanId].interest) *
                    loanContributions[loanId][allMembers[i]];
            }
        }
        loans[loanId].isReturned = true;
    }

    function canJoin() public view returns (bool cj) {
        uint sum = 0;

        for (uint i = 0; i < allMembers.length; i++) {
            if (votes[msg.sender][allMembers[i]] == 1) {
                sum++;
            }
        }
        if ((sum * 1e18) / memberCount > 5e17) {
            return true;
        } else {
            return false;
        }
    }

    function getAllConfirmedMembers()
        public
        view
        onlyMembers
        returns (Member[] memory)
    {
        // Logic to retrieve all non-pending members
        Member[] memory nonPending = new Member[](memberCount);
        uint j = 0;
        for (uint i = 0; i < allMembers.length; i++) {
            if (!members[allMembers[i]].isPending) {
                nonPending[j] = members[allMembers[i]];
                j++;
            }
        }
        return nonPending;
    }

    function getAllOpenLoans() public view onlyMembers returns (Loan[] memory) {
        // Logic to get all open loan requests
        uint count = 0;
        for (uint i = 0; i < loans.length; i++) {
            if (!loans[i].isLent) {
                count += 1;
            }
        }
        uint j = 0;
        Loan[] memory openLoans = new Loan[](count);
        for (uint i = 0; i < loans.length; i++) {
            if (!loans[i].isLent) {
                openLoans[j] = loans[i];
            }
        }
        return openLoans;
    }

    function getPendingMembers()
        public
        view
        onlyMembers
        returns (Member[] memory)
    {
        //returns all pending members the user has voted on
        uint count = 0;
        for (uint i = 0; i < allMembers.length; i++) {
            if (
                members[allMembers[i]].isPending &&
                votes[allMembers[i]][msg.sender] != 0
            ) {
                count++;
            }
        }

        Member[] memory pending = new Member[](count);
        uint j = 0;
        for (uint i = 0; i < allMembers.length; i++) {
            if (
                members[allMembers[i]].isPending &&
                votes[allMembers[i]][msg.sender] != 0
            ) {
                pending[j] = members[allMembers[i]];
                j++;
            }
        }
        return pending;
    }

    function getMembersToVoteOn()
        public
        view
        onlyMembers
        returns (Member[] memory)
    {
        // Logic to list all pending members the sender has not voted on
        uint count = 0;
        for (uint i = 0; i < allMembers.length; i++) {
            if (
                members[allMembers[i]].isPending &&
                votes[allMembers[i]][msg.sender] == 0
            ) {
                count++;
            }
        }

        Member[] memory pending = new Member[](count);
        uint j = 0;
        for (uint i = 0; i < allMembers.length; i++) {
            if (
                members[allMembers[i]].isPending &&
                votes[allMembers[i]][msg.sender] == 0
            ) {
                pending[j] = members[allMembers[i]];
                j++;
            }
        }
        return pending;
    }

    function getPortfolio()
        public
        view
        onlyMembers
        returns (Investment[] memory)
    {}
    // System and helper functions are not fully implemented due to their complex nature
    // and requirement for further specifications.

    // ... Additional functions like autoPayLoan, default, calculateInterest, updateFriendScore, checkMembershipStatus ...
}
