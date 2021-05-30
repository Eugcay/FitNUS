import React, {useState} from 'react'
import { View,  Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { getUser } from '../Api/userApi'


const Profile = ({navigation}) => {
    consr [user, setUser] = useState 

    return (
    <View>
        <Text styles={styles.text}>My Profile</Text>
        
    </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    text: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})