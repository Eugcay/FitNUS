import React from "react";
import { Button } from "react-native";
import { logout } from "../Api/authApi";
import { createStackNavigator } from "@react-navigation/stack";

import FitBud from "../screens/fitBud";
import WorkoutDetails from "../screens/workoutDetails";
import StartWorkout from "../screens/startworkout";
import Map from "../screens/map";
import AddExercises from "../screens/addExercises";
import { ExerciseDetails } from "../screens/exerciseDetails";
// import AddExercises from ""

const Stack = createStackNavigator();

const FitBudStack = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator initialRouteName="">
        <Stack.Screen name="Fit Bud" component={FitBud} options={{
          headerRight: () => (
            <Button onPress={() => navigation.navigate("Start Workout")} title='Start workout' color="#FFF01A"/>
          ) 
        }}></Stack.Screen>
        <Stack.Screen name="Workout Details" component={WorkoutDetails}></Stack.Screen>
        <Stack.Screen name="Start Workout" component={StartWorkout}></Stack.Screen>
        <Stack.Screen name="Add Exercises" component={AddExercises}></Stack.Screen>
        <Stack.Screen name="Exercise Details" component={ExerciseDetails}></Stack.Screen>
        <Stack.Screen name="Map" component={Map}></Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default FitBudStack