import { userReducer } from "./user";
import { workoutReducer } from "./workouts";
import { statsReducer } from "./statistics";
import { runReducer } from "./runs";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    user: userReducer,
    workout: workoutReducer,
    stats: statsReducer,
    runs: runReducer,
})

export default rootReducer