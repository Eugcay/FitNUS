import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { logout } from "../Api/authApi";

import Profile from "../screens/profile";
import EditProfile from "../screens/editProfile";

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={Profile} options={
          headerRight: () => (
            <Button onPress={logout} title='Logout' color='red'/>
          ) 
        }/>
        <Stack.Screen name="Edit Profile" component={EditProfile} />
      </Stack.Navigator>
  );
};

export default ProfileStack;
