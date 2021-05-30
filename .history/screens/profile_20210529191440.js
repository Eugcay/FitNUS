import React from 'react'
import { View,  Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { getUser } from '../Api/userApi'

const ProfilePage = async ({navigation}) => {
    

    return (
    <View>
        <Text styles={styles.text}>My Profile</Text>
        <Text styles={styles.text}>Hi</Text>
    </View>
    )
}

export default ProfilePage

const styles = StyleSheet.create({
    text: {
        alignItems: 'center'
    }
})