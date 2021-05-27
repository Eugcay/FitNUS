import { StatusBar } from "expo-status-bar";
import React, { useState, Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import Tracker from "./screens/tracker";
import FitBud from "./screens/fitBud";
import Jio from "./screens/jio";
import firebase from "firebase";
import { firebaseConfig } from "./config";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      loggedIn: false
    }
  }
  

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }

  render() {
    const {loggedIn, loaded} = this.state
    return (
    (!loaded) ? (
      <View>
        <Text>hello</Text>
      </View>
    ) : (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={loggedIn ? "FitBud" : "LoginScreen"}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name='FitBud' component={FitBud} />
          <Stack.Screen name="Jio" component={Jio} />
          <Stack.Screen name="Tracker" component={Tracker} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  )
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
