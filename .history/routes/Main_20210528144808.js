import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Feather } from "@expo/vector-icons";

import Tracker from "../screens/tracker";
import FitBud from "../screens/fitBud";
import Jio from "../screens/jio";
import ProfilePage from "../screens/profile";


const Tab = createMaterialBottomTabNavigator();

const Main = () => {
  return (
    <>
      <Tab.Navigator initialRouteName="FitBud">
        <Tab.Screen
          name="FitBud"
          component={FitBud}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="arm-flex" color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen
          name="Jio"
          component={Jio}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-group" color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen
          name="Tracker"
          component={Tracker}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="activity" color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfilePage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle" color={color} size={25} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Main;
