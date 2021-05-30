import firebase from "firebase";
import 'firebase/firestore'

export async function signUp(name, email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
            history: [],
          });
        console.log(result);
      })
      .catch((error) => alert(error));
}

export async function login(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => console.log(result))
      .catch((error) => Alert.prompt(error));
}