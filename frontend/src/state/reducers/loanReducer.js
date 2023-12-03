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
        
        case "DELETE_LOAN":
            const updatedLoans = state.loans.filter(loan => loan.id !== action.payload);
            return {
                ...state,
                loans: updatedLoans
            };
        case "UPDATE_LOAN_BALANCE":
            const newLoans = state.loans.map((loan) => {
                if (loan.id === action.payload.loanID) {
                    return {...loan, filled: action.payload.newFilled}
                } else {
                    return loan
                }
            })
            return {
                ...state,
                loans: newLoans
            }
        default:
            return state
    }
}

export default loanReducer