import React from "react";
import firebase from "firebase";
import { getWorkoutById } from "./workoutApi";

export function getUser() {
  return firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid);
}

export async function getUserHistory() {
  const hist = [];
  await getUser()
    .collection("history")
    .onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const ref = doc.data();
        ref.workoutRef.get().then((snap) => {
          hist.push({
            id: doc.id,
            workout: snap.data(),
          });
        });
      });
    });
  return hist
}

export function addToHistory(workout) {
  return firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .collection("history")
    .doc(workout)
    .set({
      date: Date.now(),
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
