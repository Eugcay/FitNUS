import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Tracker from "../screens/tracker";
import FitBud from "../screens/fitBud";
import Jio from "../screens/jio";
import ProfilePage from "../screens/profile";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="FitBud">
        <Stack.Screen name="FitBud" component={FitBud} />
        <Stack.Screen name="Jio" component={Jio} />
        <Stack.Screen name="Tracker" component={Tracker} />
        <Stack.Screen name="Profile" component={ProfilePage} />
      </Stack.Navigator>
    </>
  );
};

export default MainStack;
