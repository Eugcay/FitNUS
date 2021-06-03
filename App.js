import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginStack from "./routes/loginStack";
import Main from "./routes/Main";
import firebase from "firebase";
import { firebaseConfig } from "./config";
import { createStackNavigator } from "@react-navigation/stack";
import * as Linking from "expo-linking"
import config from './linking'
import Spinner from "./components/Spinner";

const prefix = Linking.createURL('/')

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
    config: config
  }

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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner/>
        </View>
      );
    } else {
      return (
        <NavigationContainer linking={this.linking}>
          {loggedIn ? (
            <Stack.Navigator initialRouteName="Main" >
              <Stack.Screen name="Main" component={Main} />
            </Stack.Navigator>
          ) : (
            <LoginStack />
          )}
        </NavigationContainer>
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
