import { ADD_EXERCISE, CLEAR_WORKOUT } from "../actions/types";

const initialState = {
    exercises: null
}

export const workoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EXERCISE: 
            return {
                ...state,
                exercises: state.exercises.concat(action.data)
            }
        case CLEAR_WORKOUT: 
            return initialState
        default: 
            return state;
    }
}