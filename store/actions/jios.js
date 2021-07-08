import firebase from "firebase";
import { SET_FEED, SET_UPCOMING, SET_COMPLETED } from "./types";

export const fetchFeed = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("jios")
      .where("time", ">=", new Date())
      .onSnapshot((snapshot) => {
        let jios = [];
        snapshot.docs.forEach((doc) =>
          !doc.data().completed && jios.push({ id: doc.id, data: doc.data() })
        );
        // const jiosFollowing = jios.filter(jio => props.following.includes(jio.user))
        dispatch({ type: SET_FEED, feed: jios });
      });
  };
};

export const fetchUpcoming = () => {
  const uid = firebase.auth().currentUser.uid;
  const posts = [];
  return (dispatch) => {
    firebase
      .firestore()
      .collection("jios")
      .where("completed", '!=', true)
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data().likes.find((liker) => liker.uid === uid) || doc.data().user === uid) {
            posts.push({ id: doc.id, data: doc.data() });
          }
        });
        dispatch({ type: SET_UPCOMING, upcoming: posts });
      });
  };
};

export const fetchCompleted = () => {
  const uid = firebase.auth().currentUser.uid;
  const completed = [];
  return (dispatch) => {
    // await firebase
    //   .firestore()
    //   .collection("jios")
    //   .where("user", "<=", uid)
    //   .where("user", ">=", uid)
    //   .onSnapshot((snapshot) => {
    //     snapshot.docs.forEach((doc) => {
    //       if (doc.data().completed) {
    //         completed.push({ id: doc.id, data: doc.data() });
    //       }
    //     });
    //   });

    firebase
      .firestore()
      .collection("jios")
      .where("completed", "==", true)
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data().user === uid || doc.data().likes.find((liker) => liker.uid === uid)) {
            completed.push({ id: doc.id, data: doc.data() });
          }
        });
        dispatch({ type: SET_COMPLETED, completed });
      });
  };
};
