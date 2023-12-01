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
            return {...state, currentUser: {...state, balance: action.payload}}
        default:
            return state
    }
}

export default memberReducer