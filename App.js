import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginStack from "./routes/loginStack";
import Main from "./routes/Main";
import addWorkoutStack from "./routes/addWorkoutStack";
import firebase from "firebase";
import { firebaseConfig } from "./config";
import { createStackNavigator } from "@react-navigation/stack";
import * as Linking from "expo-linking";
import config from "./linking";
import Spinner from "./components/Spinner";
import { Provider } from "react-redux";
import Store from "./store";

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
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Spinner />
        </View>
      );
    } else {
      return (
        <Provider store={Store}>
          <NavigationContainer linking={this.linking}>
            {loggedIn ? (
              <Stack.Navigator initialRouteName="Main" screenOptions={{
                headerShown: false,
              }}>
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Start Workout" component={addWorkoutStack}/>
              </Stack.Navigator>
            ) : (
              <LoginStack />
            )}
          </NavigationContainer>
        </Provider>
      );
    }
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
