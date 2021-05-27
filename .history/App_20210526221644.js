import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {
  LoginScreen,
  SignupScreen
} from './screens'


const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <LoginScreen/>
        
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
