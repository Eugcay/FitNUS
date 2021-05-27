import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from './screens/login';
import SignupScreen form './screens/signup'


import { createStackNavigator } from '@react-navigation/stack';



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
