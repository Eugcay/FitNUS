import React from "react";
import { Button } from "react-native";
import { logout } from "../Api/authApi";
import { createStackNavigator } from "@react-navigation/stack";

import FitBud from "../screens/fitBud";
import WorkoutDetails from "../screens/workoutDetails";
import StartWorkout from "../screens/startworkout";

const Stack = createStackNavigator();

const FitBudStack = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator initialRouteName="">
        <Stack.Screen name="Fit Bud" component={FitBud} options={{
          headerRight: () => (
            <Button onPress={() => navigation.navigate("Start Workout")} title='Start workout' color='red'/>
          ) 
        }}></Stack.Screen>
        <Stack.Screen name="Workout Details" component={WorkoutDetails}></Stack.Screen>
        <Stack.Screen name="Start Workout" component={StartWorkout}></Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default FitBudStack