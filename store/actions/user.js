import React from "react";
import firebase from "firebase";

import {
  SET_USER,
  UPDATE_USER,
  SET_USER_HISTORY,
  ADD_WORKOUT,
  CLEAR,
} from "./types";

export function getUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: SET_USER, currentUser: snapshot.data() });
        } else {
          console.log("No such user");
        }
      });
  };
}

export function updateUser(
  name,
  email,
  bio,
  photoURL,
  caloriesGoal,
  durationGoal,
  distanceGoal,
  workoutGoal
) {
  const user = {
    name,
    email,
    bio,
    photoURL,
    caloriesGoal,
    durationGoal,
    distanceGoal,
    workoutGoal,
  };
  return async (dispatch) => {
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .set(user);

    dispatch({ type: UPDATE_USER, currentUser: user });
  };
}

export function getUserHistory() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("history")
      .orderBy("date", "desc")
      .get()
      .then((snapshot) => {
        const hist = [];
        snapshot.docs.forEach((doc) => {
          if (doc.data()?.workoutData) {
            hist.push({
              id: doc.id,
              date: doc.data().date,
              workout: doc.data()?.workoutData,
              calories: doc.data().calories,
              duration: doc.data().duration,
            });
          } else {
            doc
              .data()
              .workoutRef.get()
              .then((snap) =>
                hist.push({
                  id: doc.id,
                  date: doc.data().date,
                  workout: snap.data(),
                  calories: doc.data().calories,
                  duration: doc.data().duration,
                })
              );
          }
        });
        return hist;
      })
      .then((hist) => dispatch({ type: SET_USER_HISTORY, history: hist }));
  };
}

export function addToHistory(workoutId, calories, duration, workoutData) {
  const date = firebase.firestore.FieldValue.serverTimestamp();
  return async (dispatch) => {
    const workoutRef = `/Workout/${workoutId}`;
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("history")
      .add({
        date,
        workoutRef,
        calories,
        duration,
        workoutData,
      });

    dispatch({
      type: ADD_WORKOUT,
      data: {
        date,
        workoutData,
        calories,
        duration,
      },
    });
  };
}

export const clearData = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR });
  };
};
