import { addons } from "react-native"
import { USER_STATE_CHANGE, USER_HISTORY_STATE_CHANGE, ADD_WORKOUT, CLEAR } from "../actions/types"

const initialState= {
    currentUser: null,
    history: [],
    friends: [],
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGE: 
            return {
                ...state,
                currentUser: action.currentUser
            }
        case USER_HISTORY_STATE_CHANGE: 
            return {
                ...state,
                history: action.history
            }
        case ADD_WORKOUT: 
            return {
                ...state,
                history: state.history.concat(action.data)
            }
        case CLEAR: 
            return initialState
        default: 
            return state
    }
}
    