import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Tracker from "../screens/tracker";
import FitBud from "../screens/fitBud";
import Jio from "../screens/jio";
import ProfilePage from "../screens/profile";

const Tab = createMaterialBottomTabNavigator();

const MainStack = () => {
  return (
    <>
      <Tab.Navigator initialRouteName="FitBud">
        <Tab.Screen name="FitBud" component={FitBud} />
        <Tab.Screen name="Jio" component={Jio} />
        <Tab.Screen name="Tracker" component={Tracker} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </>
  );
};

export default MainStack;
