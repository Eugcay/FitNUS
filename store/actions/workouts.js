import firebase from "firebase";
import { CLEAR_WORKOUT, ADD_EXERCISE } from "./types";

export function addExercise(exercise) {
    return (dispatch) => {
        dispatch({
            type: ADD_EXERCISE,
            data: exercise
        }) 
    }
}

export function clearWorkout() {
    return dispatch => {
        dispatch({type: CLEAR_WORKOUT})
    }
}