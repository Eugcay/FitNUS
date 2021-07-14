import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import JioFeed from '../screens/jio/Feed'
import JioSearch from "../screens/jio/Search";
import MyJios from "../screens/jio/myJios";
import jiosCompleted from '../screens/jio/Completed'

const Tab = createMaterialTopTabNavigator();

const JioTabs = () => {
  return (
    <Tab.Navigator
    initialRouteName='Feed'
      tabBarOptions={{
        activeTintColor: "#e91e63",
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: "lightblue" },
      }}
    >
      <Tab.Screen name="Feed" component={JioFeed} />
      <Tab.Screen name='My Jios' component={MyJios}/>
      <Tab.Screen name="Explore" component={JioSearch} />
      <Tab.Screen name='Finished' component={jiosCompleted}/>
    </Tab.Navigator>
  );
};

export default JioTabs;
