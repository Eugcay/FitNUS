import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import JioFeed from "../screens/jioFeed";
import JioSearch from "../screens/jioSearch";
import SelectWorkoutType from "../screens/selectWorkoutType";

const Tab = createMaterialTopTabNavigator();

const JioTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#e91e63",
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: "lightblue" },
      }}
    >
      <Tab.Screen name="Feed" component={JioFeed} />
      <Tab.Screen name="Explore" component={JioSearch} />
    </Tab.Navigator>
  );
};

export default JioTabs;
