import {
  ADD_EXERCISE,
  CLEAR_WORKOUT,
  UPDATE_EXERCISE,
  DELETE_EXERCISE,
  REPLACE_EXERCISE,
} from "../actions/types";

const initialState = {
  exercises: [],
};

export const workoutReducer = (state = initialState, action) => {
  switch (action.type) {
      
    case ADD_EXERCISE:
        console.log(action)
      return {
        ...state,
        exercises: state.exercises.concat(action.exercise),
      };
    case UPDATE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.map((content) =>
          content.key === action.exercise.key ? action.exercise : content
        ),
      };
    case DELETE_EXERCISE:
      const data = [...state.exercises];
      const item = data.filter((content) => content.key == action.exercise.key);
      const index = data.indexOf(item);
      data.splice(index, 1);
      return {
        ...state,
        exercises: data,
      };
    case REPLACE_EXERCISE:
      const copy = [...state.exercises];
      const id = state.exercises.indexOf(action.replaced);
      copy.splice(id, 1, action.exercise)
      return {
          ...state,
          exercises: copy
      }
    case CLEAR_WORKOUT:
      return initialState;
    default:
      return state;
  }
};
