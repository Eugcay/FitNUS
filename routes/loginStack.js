import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { KeyboardAvoidingView } from "react-native";

import LandingPage from "../screens/landingPage";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
      </Stack.Navigator>
    </>
  );
};

export default LoginStack;
