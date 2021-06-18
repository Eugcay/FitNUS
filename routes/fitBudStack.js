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
            <Button onPress={() => navigation.navigate("Start Workout")} title='Start workout' color="#0B2A59"/>
          ) 
        }}></Stack.Screen>
        <Stack.Screen name="Workout Details" component={WorkoutDetails}></Stack.Screen> 
      </Stack.Navigator>
    </>
  );
};

export default FitBudStack