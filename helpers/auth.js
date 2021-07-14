import firebase from "firebase";
import "firebase/firestore";

export async function signUp(name, email, password) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);

    // send verification email
    const currUser = firebase.auth().currentUser;
    await currUser.sendEmailVerification()

    firebase.firestore().collection("users").doc(currUser.uid).set({
      name,
      email,
      bio: "",
      photoURL: "",
      caloriesGoal: "",
      durationGoal: "",
      pb: []
    });
  } catch (error) {
    alert(error);
  }
}

export async function login(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
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
