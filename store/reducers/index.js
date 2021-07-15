import { userReducer } from "./user";
import { workoutReducer } from "./workouts";
import { historyReducer } from "./history";
import { templatesReducer } from "./templates";
import { jioReducer } from "./jios";
import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import { achievementsReducer } from "./achievements";

const rootReducer = combineReducers({
  user: userReducer,
  workout: workoutReducer,
  history: historyReducer,
  jios: jioReducer,
  templates: templatesReducer,
  achievements: achievementsReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
