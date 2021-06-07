import React from "react";
import firebase from "firebase";

import { USER_STATE_CHANGE, USER_HISTORY_STATE_CHANGE, ADD_WORKOUT, CLEAR } from "./types";

export function getUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log("No such user");
        }
      });
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
        snapshot.docs.forEach((doc) =>
          doc
            .data()
            .workoutRef.get()
            .then((snap) =>
              hist.push({
                id: doc.id,
                date: doc.data().date,
                workout: snap.data(),
                calories: doc.data().calories,
                duration: doc.data().duration
              })
            )
        );
        return hist;
      })
      .then((hist) =>
        dispatch({ type: USER_HISTORY_STATE_CHANGE, history: hist })
      );
  };
}

// export const getStats = () => {
//   return (dispatch) => {
//     firebase
//       .firestore()
//       .collection("users")
//       .doc(firebase.auth().currentUser.uid)
//       .collection("history")
//       .orderBy("date", "desc")
//       .onSnapshot((snapshot) =>
//         snapshot.docs
//           .map((doc) => ({
//             calories: doc.data().calories,
//             duration: doc.data().duration,
//           }))
//           .reduce(
//             (x, y) => ({
//               calories: x.calories + y.calories,
//               duration: x.duration + y.duration,
//             }),
//             0
//           )
//       );
//   };
// };

export function addToHistory(workoutId, calories, duration, workoutData) {
  return async (dispatch) => {
    const workoutRef = `/Workout/${workoutId}`
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("history")
      .add({
        date: Date.now(),
        workoutRef,
        calories,
        duration,
      });

    dispatch({
      type: ADD_WORKOUT,
      data: {
        date: Date.now(),
        workoutData,
        calories,
        duration
      }
    })
  };
}

export const clearData = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR });
  };
};
