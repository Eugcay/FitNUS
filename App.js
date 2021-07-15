import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";
import { firebaseConfig } from "./config";
import { createStackNavigator } from "@react-navigation/stack";
import * as Linking from "expo-linking";
import config from "./linking";
import Spinner from "./components/Spinner";
import { Provider } from "react-redux";
import Store from "./store"

import LoginStack from "./routes/loginStack";
import Main from "./routes/Main";
import addWorkoutStack from "./routes/addWorkoutStack";
import JioStack from "./routes/jioStack";
import Verification from "./screens/auth/verification";

const prefix = Linking.createURL("/");

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      verified: false,
    };
  }

  linking = {
    prefixes: [prefix],
    config: config,
  };

  componentDidMount() {

    
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          verified: false,
          loaded: true,
        });
      } else if (user && !user.emailVerified) {
        this.setState({
          loggedIn: true,
          loaded: true,
          verified: false,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
          verified: true,
        });
      }
   });

  }

  setVerified = () => {
    this.setState({
      loggedIn: true,
      loaded: true,
      verified: true
    })
  }

  render() {
    const { loggedIn, loaded, verified } = this.state;
    return (
      <Provider store={Store}>
        {!loaded ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Spinner />
          </View>
        ) : (
          <NavigationContainer linking={this.linking}>
            {loggedIn && verified ? (
              <Stack.Navigator
                initialRouteName="Main"
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen
                  name="Start Workout"
                  component={addWorkoutStack}
                />
                <Stack.Screen name="Exercise Jio" component={JioStack} />
              </Stack.Navigator>
            ) : loggedIn && !verified ? (
              <Verification verify={this.setVerified}/>
            )
             : (
              <LoginStack />
            )}
          </NavigationContainer>
        )}
      </Provider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
