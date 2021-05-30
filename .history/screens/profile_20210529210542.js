import React from 'react'
import { View,  Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { getUser } from '../API/userApi'


const Profile = ({navigation}) => {
    const user = getUser()

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