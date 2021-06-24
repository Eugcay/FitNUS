import firebase from "firebase";
import { SET_STATS, SET_WEEKLY_STATS, SET_MONTHLY_STATS } from "./types";

const getStats = (arr) => {
  const stats = arr.reduce(
    (x, y) => ({
      calories: x.calories + y.calories,
      duration: x.duration + y.duration,
      distance: x.distance + y.distance,
    }),
    { calories: 0, duration: 0, distance: 0 }
  );
  stats.workouts = arr.length;
  return stats;
};

export const getUserStats = () => {
  return (dispatch) => {
  firebase
  .firestore()
  .collection("users")
  .doc(firebase.auth().currentUser.uid)
  .collection("history").onSnapshot((snapshot) => {
      const hist = [];
      snapshot.docs.forEach((doc) => {
        hist.push(doc.data());
      });
      const stats = getStats(hist);
      dispatch({ type: SET_STATS, data: stats });
    });
  };
};


