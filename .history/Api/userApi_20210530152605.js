import React from "react";
import firebase from "firebase";

export function getUser() {
  return firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)

}

export function getUserHistory() {
    return getUser().collection('history')
}

export function addToHistory(workout) {
    return firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection('history').doc(workout).set({
        date: Date.now()
    })
}

export async function totalCalories() {
    return
}