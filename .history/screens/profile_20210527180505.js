import React from 'react'
import { View,  Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

const ProfilePage = ({navigation}) => {
    return (
    <View>
        <Text styles={styles.text}>My Profile</Text>
    </View>
    )
}

export default ProfilePage

const styles = StyleSheet.create({
    text: {
        alignItems: 'center'
    }
})