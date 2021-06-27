import firebase from "firebase";
import { SET_USERS } from "./types";

export const fetchUsersData = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        dispatch({ type: SET_USERS, data: users });
      });
  };
};

export const fetchUserById = (id) => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          let user = snapshot.data();
          user.uid = snapshot.id;
          dispatch({ type: USERS_DATA_STATE_CHANGE, user });
        } else {
          console.log("does not exist");
        }
      });
  };
};
