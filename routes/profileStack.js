import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../screens/profile";
import EditProfile from "../screens/profile/editProfile";

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
      </Stack.Navigator>
  );
};

export default ProfileStack;
