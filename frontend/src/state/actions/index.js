// Loan Action Types
export const setLoans = (loans) => {
    return {
        type: "SET_LOANS",
        payload: loans
    }
}

export const addLoan = (loan) => {
    return {
        type: "ADD_LOAN",
        payload: loan
    }
}

// Member Action Types
export const setMembers = (members) => {
    return {
        type: "SET_MEMBERS",
        payload: members
    }
}

export const setCurrentUser = (user) => {
    return {
        type: "SET_CURRENT_USER",
        payload: user
    }
}