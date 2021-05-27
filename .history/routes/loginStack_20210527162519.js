import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen"

export default function LoginStack() {
    return (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={loggedIn ? "FitBud" : "LoginScreen"}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen name="FitBud" component={FitBud} />
            <Stack.Screen name="Jio" component={Jio} />
            <Stack.Screen name="Tracker" component={Tracker} />
          </Stack.Navigator>
        </NavigationContainer>
    )
}