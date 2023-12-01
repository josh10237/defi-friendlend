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


// get current user
export const updateUserBalance = (user, balance) => {
    console.log("here123")
    return {
        type: "UPDATE_USER_BALANCE",
        payload: {user: user, balance: balance}
    }
}
