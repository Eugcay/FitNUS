import { SET_USERS, CLEAR } from "../actions/types";

const initialState = {
  users: [],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.data,
      };
    case CLEAR:
      return initialState;
    default:
      return state;
  }
};
