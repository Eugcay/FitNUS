import React from 'react'
import { Text, View, Image, StyleSheet, ScrollView, touchableOpacity } from 'react-native'
import { timestampToDate } from '../helpers'
import firebase from 'firebase'

export default function WorkoutDetails({route, navigation}) {
     const {workout, date} = route.params

     console.log(workout)

     const images = {
         exercise: {
            'Run': require('../assets/Run.jpeg'),
            'Boxing': require('../assets/boxing.jpeg'),
            'Pilates': require('../assets/Pilates.jpeg')
         }
     }
    
    return (
        <View style={styles.container}>
            <Image source={images.exercise[workout.name]} style={styles.image}/>
            <View style={styles.top}>
                <Text style={styles.title}>{workout.name}</Text>
                <Text>{date ? timestampToDate(date.seconds) : ''}</Text>
            </View>
            <Text style={styles.body}>{workout.description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },

    image: {
        width: '100%',
        height: '60%',
        minHeight: 250,
    },

    title: {
        fontSize: 22
    },

    top: {
        marginVertical: 5,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#C0C0C0"
    },

    body: {
        marginTop: 10,
        marginHorizontal: 10,
        textAlign: 'justify'
    }
})