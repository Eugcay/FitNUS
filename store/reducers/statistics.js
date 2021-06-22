import { SET_STATS, SET_MONTHLY_STATS, SET_WEEKLY_STATS } from "../actions/types";

const initialState = {
  statistics: {
    calories: 0,
    duration: 0,
    distance: 0,
    workouts: 0,
  },
  monthly: {
    calories: 0,
    duration: 0,
    distance: 0,
    workouts: 0,
  },
  weekly: {
    calories: 0,
    duration: 0,
    distance: 0,
    workouts: 0,
  },
};

export const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATS:
      return {
        ...state,
        statistics: action.data,
      };
    case SET_MONTHLY_STATS: 
      return {
        ...state,
        monthly: action.data
      }
    case SET_WEEKLY_STATS:
      return {
        ...state,
        weekly: action.data
      }
    default:
      return state;
  }
};
