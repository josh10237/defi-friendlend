import { fixBigIntTypes } from "../utils"

const initialState = {
    members: [],
    currentUser: {}
}

const memberReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_MEMBERS":
            const members = action.payload
            for (let i = 0; i < members.length; i++) {
                const member = members[i]
                members[i] = fixBigIntTypes(member)
            }
            return {...state, members: members}
        case "SET_CURRENT_USER":
            return {...state, currentUser: action.payload}
        case "UPDATE_USER_BALANCE":
            return {...state, currentUser: {...state.currentUser, balance: action.payload}}
        case "UPDATE_USER_LOAN_STATUS":
            return {...state, currentUser: 
                {...state.currentUser, 
                    loanStatus: action.payload.loanStatus,
                    loanid: action.payload.loanID
                }}
        default:
            return state
    }
}

export default memberReducer