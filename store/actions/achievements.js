import firebase from "firebase";

import {
  SET_USER_ACCRUED_ACHIEVEMENTS,
  ADD_ACCRUED_ACHIEVEMENT,
  ADD_SINGLE_ACHIEVEMENT,
  SET_USER_SINGLE_ACHIEVEMENTS,
} from "./types";

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
      single,
    });
  };
}
