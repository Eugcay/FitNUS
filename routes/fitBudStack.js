import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FitBud from "../screens/fitBud";
import WorkoutDetails from "../screens/workoutDetails";

const Stack = createStackNavigator();

const FitBudStack = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="">
        <Stack.Screen name="Fit Bud" component={FitBud}></Stack.Screen>
        <Stack.Screen name="Workout Details" component={WorkoutDetails}></Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default FitBudStack