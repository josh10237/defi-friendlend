import loanReducer from "./loanReducer";
import memberReducer from "./memberReducer";
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    loan: loanReducer,
    member: memberReducer
})

export default rootReducer