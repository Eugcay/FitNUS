import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Feather } from "@expo/vector-icons";

import Tracker from "../screens/tracker";
import FitBud from "../screens/fitBud";
import Jio from "../screens/jio";
import ProfilePage from "../screens/profile";
import { color } from "jimp";

const Tab = createMaterialBottomTabNavigator();

const MainStack = () => {
  return (
    <>
      <Tab.Navigator initialRouteName="FitBud">
        <Tab.Screen name="FitBud" component={FitBud} 
          options= {{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="arm-flex" color={color} size="25"/>
            )
          }}/>
        <Tab.Screen name="Jio" component={Jio} />
        <Tab.Screen name="Tracker" component={Tracker} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </>
  );
};

export default MainStack;
