import { CoverageMap } from 'istanbul-lib-coverage'
import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'

export default function Background({children}) {
    return (
        <ImageBackground source='../assets/adaptive-icon.png' style={styles.image}>
            <KeyboardAvoidingView ></KeyboardAvoidingView>
        </ImageBackground>

        
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})