import React from "react";
import firebase from "firebase";

export function getUser() {
  return firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)

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