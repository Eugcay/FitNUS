import firebase from "firebase";
import "firebase/firestore";

export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";

export async function signUp(name, email, password) {
  return async (dispatch) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      const currUser = firebase.auth().currentUser;

      firebase.firestore().collection("users").doc(currUser.uid).set({
        name,
        email,
      });

      dispatch({ type: SIGN_UP });
    } catch (error) {
      alert(error);
    }
  };
}

export async function login(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);

    dispatch({ type: LOGIN });
  } catch (error) {
    alert(error);
  }
}

export async function logout() {
  try {
    firebase.auth().signOut();
  } catch (error) {
    alert(error);
  }
}
