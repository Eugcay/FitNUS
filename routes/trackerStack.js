import React from 'react'
import { View} from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";

import Tracker from '../screens/tracker';

const Stack = createStackNavigator()

export const TrackerStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Tracker" component={Tracker}/>
        </Stack.Navigator>
    )
}
