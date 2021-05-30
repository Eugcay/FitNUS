import firebase from "firebase";
import 'firebase/firestore'

export async function signUp(name, email, password) {
    try {
     await firebase.auth().createUserWithEmailAndPassword(email, password)
      
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
            history: [],
          });
    }
      catch((error) => alert(error));
}

export async function login(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => console.log(result))
      .catch((error) => prompt(error));
}