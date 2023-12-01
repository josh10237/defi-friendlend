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
