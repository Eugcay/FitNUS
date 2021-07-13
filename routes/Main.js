import React, { useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { TrackerStack } from "./trackerStack";
import FitBudStack from "./fitBudStack";
import Jio from "../screens/jio";
import ProfileStack from "./profileStack";
import WorkoutHistory from '../screens/history'

import {
  clearData,
  getUser,
  getUserFollowing,
  getUserFollowers,
  getUserAccruedAchievements,
  getUserSingleAchievements
} from "../store/actions/user";

import { fetchUpcoming, fetchCompleted } from "../store/actions/jios";

import { getUserRuns, getUserHistory } from "../store/actions/history";

import { getUserTemplates } from "../store/actions/templates";

const Tab = createMaterialBottomTabNavigator();

export const Main = (props) => {
  useEffect(() => {
    props.clearData();
    props.getUser();
    props.getUserRuns();
    props.getUserHistory();
    props.getUserTemplates();
    props.getUserFollowing();
    props.getUserFollowers();
    props.getUserAccruedAchievements();
    props.fetchCompleted()
    props.fetchUpcoming()
    props.getUserSingleAchievements();
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
        <Tab.Screen name='History' component={WorkoutHistory} options={{
          tabBarIcon: (({color, size}) => (
            <MaterialCommunityIcons name='calendar' color={color} size={25}/>
          )),
          tabBarColor: "#0B2A59" 
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
      getUserSingleAchievements,
      getUserRuns,
      getUserTemplates,
      fetchCompleted,
      fetchUpcoming,
      clearData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(Main);
