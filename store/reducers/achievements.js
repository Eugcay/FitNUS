import {
  SET_USER_ACCRUED_ACHIEVEMENTS,
  SET_USER_SINGLE_ACHIEVEMENTS,
  ADD_ACCRUED_ACHIEVEMENT,
  ADD_SINGLE_ACHIEVEMENT,
} from "../actions/types";

const initialState = {
  singleAchievements: [],
  accruedAchievements: [],
};

export const achievementsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ACCRUED_ACHIEVEMENTS:
      return {
        ...state,
        accruedAchievements: action.accruedAchievements,
      };

    case ADD_ACCRUED_ACHIEVEMENT:
      return {
        ...state,
        accruedAchievements: state.accruedAchievements.concat(action.accrued),
      };

    case SET_USER_SINGLE_ACHIEVEMENTS:
      return {
        ...state,
        singleAchievements: action.singleAchievements,
      };

    case ADD_SINGLE_ACHIEVEMENT:
      return {
        ...state,
        singleAchievements: state.singleAchievements.concat(action.single),
      };

    default:
      return state;
  }
};
