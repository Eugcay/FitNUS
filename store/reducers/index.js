import { userReducer } from "./user";
import { workoutReducer } from "./workouts";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    user: userReducer,
    workout: workoutReducer,
})

export default rootReducer