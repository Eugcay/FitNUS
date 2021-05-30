import firebase from "firebase";

import { Alert } from "react-native";

export async function signUp(name, email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase.firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name: name,
            email: currentUser.email,
            history: [],
          });
        console.log(result);
      })
      .catch((error) => Alert.alert(error));
}