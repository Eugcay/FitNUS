import React from 'react'
import { View, ImageBackground, TouchableOpacity} from 'react-native'

const SelectWorkoutType = ({navigation}) => {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Start Workout')} style={{height: '48%', width: '100%'}}>
                <ImageBackground source={require('../assets/runworkout1.jpeg')}/>
            </TouchableOpacity>
            <TouchableOpacity style={{height: '48%', width: '100%'}}>
                <ImageBackground source={require('../assets/static1.jpeg')}/>
            </TouchableOpacity>
            
        </View>
    )
}

export default SelectWorkoutType;
