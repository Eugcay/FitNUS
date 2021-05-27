import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Tracker from "../screens/tracker";
import FitBud from "../screens/fitBud";
import Jio from "../screens/jio"

const Stack = createStackNavigator()

const MainStack = () => {
    return (
        <>
          <Stack.Navigator
            initialRouteName="FitBud"
          >
            <Stack.Screen name="FitBud" component={FitBud} />
            <Stack.Screen name="Jio" component={Jio} />
            <Stack.Screen name="Tracker" component={Tracker} />
          </Stack.Navigator>
        </>
    )
} 

export default MainStack