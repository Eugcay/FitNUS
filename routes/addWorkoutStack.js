import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartWorkout from "../screens/startworkout";
import Map from "../screens/map";
import AddExercises from "../screens/addExercises";
import { ExerciseDetails } from "../screens/exerciseDetails"

const Stack = createStackNavigator();

const addWorkoutStack = ({navigation}) => {
  return (
      <>
    <Stack.Navigator>
      <Stack.Screen
        name="Start Workout"
        component={StartWorkout}
      ></Stack.Screen>
      <Stack.Screen
        name="Add Exercises"
        component={AddExercises}
      ></Stack.Screen>
      <Stack.Screen
        name="Exercise Details"
        component={ExerciseDetails}
      ></Stack.Screen>
      <Stack.Screen name="Map" component={Map}></Stack.Screen>
    </Stack.Navigator>
    </>
  );
};

export default addWorkoutStack