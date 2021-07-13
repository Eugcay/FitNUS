import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WorkoutHistory from "../screens/history";
import WorkoutDetails from "../screens/workoutDetails";
import RunDetails from "../screens/runDetails";
import PostPage from "../screens/postPage";

const Stack = createStackNavigator();

const HistoryStack = () => {
  return (
    <Stack.Navigator initialRouteName="Calendar">
      <Stack.Screen
        name="Calendar"
        component={WorkoutHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Workout Details" component={WorkoutDetails} />
      <Stack.Screen name="Run Details" component={RunDetails} />
      <Stack.Screen name="Jio Details" component={PostPage} />
    </Stack.Navigator>
  );
};

export default HistoryStack;
