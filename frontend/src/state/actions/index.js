// gets all loans
export const setLoans = (loans) => {
    return {
        type: "SET_LOANS",
        payload: loans
    }
}

// create a new loan
export const addLoan = (loan) => {
    return {
        type: "ADD_LOAN",
        payload: loan
    }
}

// delete laon
export const deleteLoan = (loanid) => {
    return {
        type: "DELETE_LOAN",
        payload: loanid
    }
}

// gets list of all users
export const setMembers = (members) => {
    return {
        type: "SET_MEMBERS",
        payload: members
    }
}

// get current user
export const setCurrentUser = (user) => {
    return {
        type: "SET_CURRENT_USER",
        payload: user
    }
}


// get current user
export const updateUserBalance = (balance) => {
    console.log("here123")
    return {
        type: "UPDATE_USER_BALANCE",
        payload: balance
    }
}

export const updateUserLoanStatus = (loanID, loanStatus, amount, interest, dueDate, reason) => {
    return {
        type: "UPDATE_USER_LOAN_STATUS",
        payload: {loanID: loanID, loanStatus: loanStatus, amount: amount, interest: interest, dueDate: dueDate, reason: reason}
    }
}
