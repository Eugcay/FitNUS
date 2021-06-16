import firebase from "firebase";
import {
  CLEAR_WORKOUT,
  ADD_EXERCISE,
  UPDATE_EXERCISE,
  DELETE_EXERCISE,
  REPLACE_EXERCISE
} from "./types";

export function addExercises(exercise) {
  return (dispatch) => {
    dispatch({
      type: ADD_EXERCISE,
      exercise: exercise,
    });
  };
}

export function updateExercise(exercise) {
  return (dispatch) => {
    dispatch({ type: UPDATE_EXERCISE, exercise: exercise });
  };
}

export function replaceExercise(replaced, exercise) {
  return dispatch => {
    dispatch({ type: REPLACE_EXERCISE, exercise: exercise, replaced: replaced})
  }
}

export function deleteExercise(exercise) {
  return (dispatch) => {
    dispatch({ type: DELETE_EXERCISE, exercise: exercise });
  };
}
export function clearWorkout() {
  return (dispatch) => {
    dispatch({ type: CLEAR_WORKOUT });
  };
}
