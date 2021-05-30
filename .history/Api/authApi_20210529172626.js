import firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export async function signUp(name, email, password) {
  await firebase.auth().createUserWithEmailAndPassword(email, password);

  const currUser = firebase.auth().currentUser;

  firebase
    .firestore()
    .collection("users")
    .doc(currUser.uid)
    .set({
      name: name,
      email: currUser.email,
      history: [],
    })
    .then((res) => console.log(res))
    .catch((error) => alert(error));
}

export async function login(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => console.log(result))
    .catch((error) => Alert.prompt(error));
}
