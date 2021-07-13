import {
  SET_USER,
  CLEAR,
  UPDATE_USER,
  SET_USER_FOLLOWING,
  SET_USER_FOLLOWERS,
} from "../actions/types";

const initialState = {
  currentUser: null,
  rendered: false,
  following: [],
  followers: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      };

    case UPDATE_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      };

    case SET_USER_FOLLOWING:
      return {
        ...state,
        following: action.following,
      };

    case SET_USER_FOLLOWERS:
      return {
        ...state,
        followers: action.followers,
      };
    case CLEAR:
      return initialState;

    default:
      return state;
  }
};
