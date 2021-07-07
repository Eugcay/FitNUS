import { SET_COMPLETED, SET_FEED, SET_UPCOMING } from "../actions/types";

const initialState = {
  feed: [],
  upcoming: [],
  completed: [],
};

export const jioReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FEED:
      return {
        ...state,
        feed: action.feed,
      };
    case SET_UPCOMING:
      return {
        ...state,
        upcoming: action.upcoming,
      };

    case SET_COMPLETED:
      return {
        ...state,
        completed: action.completed,
      };

    default:
      return state;
  }
};
