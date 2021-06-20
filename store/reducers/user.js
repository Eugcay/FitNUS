import { SET_USER, SET_USER_HISTORY, ADD_WORKOUT, CLEAR, UPDATE_USER, REMOVE_FROM_HISTORY } from "../actions/types"

const initialState= {
    currentUser: null,
    history: null,
    rendered: false,
    friends: [],
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: 
            return {
                ...state,
                currentUser: action.currentUser
            }
        case UPDATE_USER: 
            return {
                ...state,
                currentUser: action.currentUser
            }
        case SET_USER_HISTORY: 
            return {
                ...state,
                history: action.history
            }
        case ADD_WORKOUT: 
            return {
                ...state,
                history: state.history.concat(action.data)
            }
        case REMOVE_FROM_HISTORY:
            const data = [...state.history]
            const index = data.indexOf(action.workout)
            data.splice(index, 1)
            return {
                ...state,
                history: data
            }
        case CLEAR: 
            return initialState
        default: 
            return state
    }
}
    