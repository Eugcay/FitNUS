import {
  SET_USER,
  SET_USER_HISTORY,
  ADD_WORKOUT,
  CLEAR,
  UPDATE_USER,
  REMOVE_FROM_HISTORY,
  SET_USER_FOLLOWING,
  SET_USER_FOLLOWERS,
} from "../actions/types";

const initialState = {
  currentUser: null,
  history: [],
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

    case SET_USER_HISTORY:
      return {
        ...state,
        history: action.history,
      };

    case ADD_WORKOUT:
      return {
        ...state,
        history: state.history.concat(action.data),
      };

    case REMOVE_FROM_HISTORY:
      const data = [...state.history];
      const index = data.indexOf(action.workout);
      data.splice(index, 1);
      return {
        ...state,
        history: data,
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
