import { SET_USER_RUNS } from "../actions/types";

const initialState = {
  runs: [],
};

export const runReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_RUNS:
      return {
        ...state,
        runs: action.runs,
      };
    default:
      return state;
  }
};
