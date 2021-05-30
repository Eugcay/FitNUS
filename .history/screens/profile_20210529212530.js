import React, {useState, useEffect} from 'react'
import { View,  Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { getUser } from '../Api/userApi'


const Profile = ({navigation}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const profile = getUser()
        setUser(profile)
    })

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