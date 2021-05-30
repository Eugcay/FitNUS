import React from "react";
import firebase from "firebase";

export function getUser() {
  return firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .onSnapshot(snapshot => {
        if (snapshot.exists) {
           return snapshot.data()
        } else {
            console.log('Data not found')
        }
    }).catch(error => console.log(error))

}

export async function getUserHistory() {

}

export async function addToHistory(wokrout) {
    return firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection('history').doc(workout).set({
        date: Date()
    })
}

function workoutDone(wokrout, history) {
    
    let jk = []
    jk.reduce((x, y) => (x.workout == workout) || y, false)
}