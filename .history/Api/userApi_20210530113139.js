import React from "react";
import firebase from "firebase";

export async function getUser() {
  const user = await firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then(snapshot => {
        if (snapshot.exists) {
            
           return snapshot.data()
        } else {
            console.log('Data not found')
        }
    }).catch(error => console.log(error))
    
    return user
}

export async function getUserHistory() {

}

export async function addToHistory(wokrout) {
    return firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection('history')..doc(workout).set({
        date: Date()
    })
}

function workoutDone(wokrout, history) {
    
    let jk = []
    jk.reduce((x, y) => (x.workout == workout) || y, false)
}