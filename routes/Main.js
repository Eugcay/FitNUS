import React, { useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { TrackerStack } from "./trackerStack";
import FitBudStack from "./fitBudStack";
import JioStack from "./jioStack";
import Jio from "../screens/jio";
import ProfileStack from "./profileStack";

import {
  clearData,
  getUser,
  getUserFollowing,
  getUserFollowers,
  getUserAccruedAchievements
} from "../store/actions/user";

import { getUserRuns, getUserHistory } from "../store/actions/history";

import { getUserTemplates } from "../store/actions/templates";

const Tab = createMaterialBottomTabNavigator();

export const Main = (props) => {
  useEffect(() => {
    props.clearData();
    props.getUser();
    props.getUserRuns();
    props.getUserHistory();
    props.getUserTemplates()
    props.getUserFollowing();
    props.getUserFollowers();
    props.getUserAccruedAchievements();
  }, []);

  return (
    <>
      <Tab.Navigator initialRouteName="FitBud" barStyle={{ color: "black" }}>
        <Tab.Screen
          name="FitBud"
          component={FitBudStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="arm-flex" color={color} size={25} />
            ),
            tabBarColor: "#0B2A59",
          }}
        />
        <Tab.Screen
          name="Jio"
          component={Jio}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-group"
                color={color}
                size={25}
              />
            ),
            tabBarColor: "#0B2A59",
          }}
        />
        <Tab.Screen
          name="Tracker"
          component={TrackerStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="activity" color={color} size={25} />
            ),
            tabBarColor: "#0B2A59",
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
                size={25}
              />
            ),
            tabBarColor: "#0B2A59",
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.user.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      getUser,
      getUserHistory,
      getUserFollowing,
      getUserFollowers,
      getUserAccruedAchievements,
      getUserRuns,
      getUserTemplates,
      clearData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(Main);
