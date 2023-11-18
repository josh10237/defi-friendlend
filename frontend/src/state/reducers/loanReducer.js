import { fixBigIntTypes } from "../utils"

const initialState = {
    loans: []
}

const loanReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_LOANS":
            const openLoans = action.payload
            for (let i = 0; i < openLoans.length; i++) {
                const loan = openLoans[i]
                openLoans[i] = fixBigIntTypes(loan)
            }
            return {
                ...state,
                loans: openLoans
            }

        case "ADD_LOAN":
            const newLoan = fixBigIntTypes(action.payload)
            return {
                ...state,
                loans: [...state.loans, newLoan]
            }

        default:
            return state
    }
}

export default loanReducer