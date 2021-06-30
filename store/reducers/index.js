import { userReducer } from "./user";
import { workoutReducer } from "./workouts";
import { statsReducer } from "./statistics";
import { runReducer } from "./history";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    user: userReducer,
    workout: workoutReducer,
    history: runReducer,
})

export default rootReducer