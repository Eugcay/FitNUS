import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  LoginScreen,
  SignupScreen
} from './screens'


import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './screens/signup';

const Stack = createStackNavigator()

export default function App() {
  return (
    <View style={styles.container}>
      <LoginScreen/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
