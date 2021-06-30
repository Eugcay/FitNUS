import firebase from "firebase";
import { SET_USER_RUNS, SET_USER_HISTORY} from "./types";

export function getUserRuns() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("runs")
      .onSnapshot((snapshot) => {
        const runs = [];
        snapshot.docs.forEach((doc) => {
          runs.push({ id: doc.id, data: doc.data });
        });
        dispatch({ type: SET_USER_RUNS, runs });
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

export function addToHistory(workout) {
  const date = firebase.firestore.FieldValue.serverTimestamp();
  return async (dispatch) => {
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("history")
      .add({
        ...workout,
        date,
      });

    dispatch({
      type: ADD_WORKOUT,
      data: {
        ...workout,
        date,
      },
    });
  };
}