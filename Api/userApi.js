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
    .doc(workoutId)
    .set({
      date: Date.now(),
      workoutRef: `/Workout/${workoutId}`
    });
}


export function totalCalories() {
  return getUserHistory().onSnapshot((snapshot) => {
    snapshot.docs
      .map((doc) =>
        getWorkoutById(doc.id).onSnapshot(
          (documentSnapshot) => documentSnapshot.data().calories
        )
      )
      .reduce((x, y) => x + y, 0);
  });
}
