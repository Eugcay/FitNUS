import firebase from "firebase";
import { SET_USER_RUNS } from "./types";

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
