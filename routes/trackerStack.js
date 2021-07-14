import React from 'react'
import { View} from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";

import Tracker from '../screens/tracker';
import AddExercises from '../screens/startworkout/addExercises';

const Stack = createStackNavigator()

export const TrackerStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Tracker" component={Tracker}/>
            <Stack.Screen name="Add to Dashboard" component={AddExercises}/>
        </Stack.Navigator>
    )
}
