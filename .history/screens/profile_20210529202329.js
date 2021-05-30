import React from 'react'
import { View,  Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'


const Profile = ({navigation}) => {
    

    return (
    <View>
        <Text styles={styles.text}>My Profile</Text>
        
    </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    text: {
        alignItems: 'center'
    }
})