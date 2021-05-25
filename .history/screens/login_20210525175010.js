import React, {useState} from 'react';
import { StyleSheet, View, TextInput, Image} from 'react-native';
import Background from '../components/Background';
import { AntDesign } from '@expo/vector-icons';

export default function LoginScreen() {
    const [userId, setUserId] = useState({value: '', error: ''})
    const [password, setPassword] = useState({value: '', error: ''})

    return (
        <Background>
            <Image source="../assets/nus-logo-gold-b-horizontal.png" style={styles.image}/>
            <View style={styles.input}>
                <AntDesign name='user' size={24} color='blue'/>
                <TextInput/>
            </View> 
        </Background>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '60%',
        height: '100%',
        alignSelf: 'center'
    },

    input: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 60,
        marginTop: 50,
        borderWidth: 1.5,
        paddingHorizontal: 10
    }
})