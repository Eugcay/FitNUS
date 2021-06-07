import React from "react";
import firebase from "firebase";
import { getWorkoutById } from "./workoutApi";

export function getUser() {
  return firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid);
}


export function getUserHistory() {  
  return getUser()
    .collection("history")
}

export function addToHistory(workoutId) {
  return firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .collection("history")
    .add({
      date: Date.now(),
      workoutRef: `/Workout/${workoutId}`
    });
}



