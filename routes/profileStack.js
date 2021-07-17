import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../screens/profile";
import EditProfile from "../screens/profile/editProfile";
import SelectWorkoutType from "../screens/startworkout/selectWorkout";
import RunMap from "../screens/startworkout/runMap";
import StartWorkout from "../screens/startworkout";
import AddExercises from "../screens/startworkout/addExercises";
import { ExerciseDetails } from "../screens/startworkout/exerciseDetails";

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
        <Stack.Screen
          name="Select Workout Type"
          component={SelectWorkoutType}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Start Workout"
          component={StartWorkout} 
        />
        <Stack.Screen name="Run Map" component={RunMap} />
        <Stack.Screen
          name="Add Exercises"
          component={AddExercises}
        />
        <Stack.Screen
          name="Exercise Details"
          component={ExerciseDetails}
        />
      </Stack.Navigator>
  );
};

export default ProfileStack;
