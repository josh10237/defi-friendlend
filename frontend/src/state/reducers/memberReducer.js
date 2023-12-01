import { fixBigIntTypes } from "../utils"

const initialState = {
    members: [],
    currentUser: {}
}

const memberReducer = (state = initialState, action) => {
    console.log("reducerme")
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
            console.log("here456")
            const currUser = action.payload.user;
            console.log("STARTING BALANCE: " + currUser.balance)
            const bal = action.payload.balance;
            currUser.balance = bal
            console.log("ENDING BALANCE: " + currUser.balance)
            return {...state, currentUser: currUser}
        default:
            return state

    }
}

export default memberReducer