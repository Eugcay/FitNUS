import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Jio from "../screens/jio";
import JioTabs from "./jioTabs";
import profile from "../screens/profile";
import JioStart from "../screens/jioStart";

const Stack = createStackNavigator();

const JioStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Jio" screenOptions={{headerStyle: { backgroundColor: "powderblue" },}}>
      
      <Stack.Screen
        name="Main"
        component={JioTabs}
        options={{
          headerTitle: "Jio",
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Start Jio')} style={{marginRight: 10, flexDirection: 'row'}}>
              <MaterialCommunityIcons name="plus-thick" size={20} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Profile" component={profile} />
      <Stack.Screen name="Start Jio" component={JioStart} />
    </Stack.Navigator>
  );
};

export default JioStack;
