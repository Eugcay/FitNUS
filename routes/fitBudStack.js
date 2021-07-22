import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FitBud from "../screens/fitBud";
import WorkoutDetails from "../screens/workoutDetails";
import Map from "../screens/map";
import RunDetails from "../screens/runDetails";
import ScrollMap from "../screens/fitBud/scrollMap"

const Stack = createStackNavigator();

const FitBudStack = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="Fit Bud" component={FitBud} />
        <Stack.Screen name="Workout Details" component={WorkoutDetails}></Stack.Screen>
        <Stack.Screen name="Run Details" component={RunDetails}></Stack.Screen>
        <Stack.Screen name="Map" component={Map}></Stack.Screen> 
        <Stack.Screen name="Scroll Map" component={ScrollMap}></Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default FitBudStack