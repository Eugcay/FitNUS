import { userReducer } from "./user";
import { workoutReducer } from "./workouts";
import { statsReducer } from "./statistics";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    user: userReducer,
    workout: workoutReducer,
    stats: statsReducer,
})

export default rootReducer