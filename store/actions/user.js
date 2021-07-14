import React from "react";
import firebase from "firebase";

import {
  SET_USER,
  UPDATE_USER,
  SET_USER_HISTORY,
  SET_USER_FOLLOWING,
  SET_USER_FOLLOWERS,
  SET_USER_ACCRUED_ACHIEVEMENTS,
  ADD_ACCRUED_ACHIEVEMENT,
  UPDATE_ACCRUED_ACHIEVEMENT,
  ADD_SINGLE_ACHIEVEMENT,
  SET_USER_SINGLE_ACHIEVEMENTS,
  ADD_WORKOUT,
  REMOVE_FROM_HISTORY,
  CLEAR,
  SET_USER_RUNS,
} from "./types";

export function getUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: SET_USER, currentUser: snapshot.data() });
        } else {
          console.log("No such user");
        }
      });
  };
}

export function updateUser(user) {
  return async (dispatch) => {
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .set(user);

    dispatch({ type: UPDATE_USER, currentUser: user });
  };
}

export function getUserRuns() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("runs")
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        const runs = [];
        snapshot.docs.forEach((doc) => {
          runs.push({ id: doc.id, data: doc.data() });
        });
        dispatch({ type: SET_USER_RUNS, runs: runs });
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
      .onSnapshot((snapshot) => {
        const hist = [];
        snapshot.docs.forEach((doc) => {
          hist.push({ id: doc.id, data: doc.data() });
        });
        dispatch({ type: SET_USER_HISTORY, history: hist });
      });
  };
}

export function getUserFollowing() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("following")
      .orderBy("dateFollowed")
      .onSnapshot((snapshot) => {
        const following = [];
        snapshot.docs.forEach((doc) => following.push(doc.id));
        dispatch({ type: SET_USER_FOLLOWING, following });
      });
  };
}

export function getUserFollowers() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("followers")
      .orderBy("dateFollowed")
      .onSnapshot((snapshot) => {
        const followers = [];
        snapshot.docs.forEach((doc) => followers.push(doc.id));
        dispatch({ type: SET_USER_FOLLOWERS, followers });
      });
  };
}

export function getUserAccruedAchievements() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("accruedAchievements")
      .onSnapshot((snapshot) => {
        const accruedAchievements = [];
        snapshot.docs.forEach((doc) =>
          accruedAchievements.push({ id: doc.id, data: doc.data() })
        );
        dispatch({ type: SET_USER_ACCRUED_ACHIEVEMENTS, accruedAchievements });
      });
  };
}

export function addToAccruedAchievements(accrued) {
  return async (dispatch) => {
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("accruedAchievements")
      .add({
        ...accrued,
      });

    dispatch({
      type: ADD_ACCRUED_ACHIEVEMENT,
      data: {
        ...accrued,
      },
    });
  };
}

export function getUserSingleAchievements() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("singleAchievements")
      .onSnapshot((snapshot) => {
        const singleAchievements = [];
        snapshot.docs.forEach((doc) =>
          singleAchievements.push({ id: doc.id, data: doc.data() })
        );
        dispatch({ type: SET_USER_SINGLE_ACHIEVEMENTS, singleAchievements });
      });
  };
}

export function addToSingleAchievements(single) {
  return async (dispatch) => {
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("singleAchievements")
      .add({
        ...single,
      });

    dispatch({
      type: ADD_SINGLE_ACHIEVEMENT,
      single
    });
  };
}

export const clearData = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR });
  };
};
