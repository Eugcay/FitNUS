import React from "react";
import firebase from "firebase";

export function getUser() {
  return firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then(snapshot => {
        if (snapshot.exists) {
            snapshot.data()
            console.log(snapshot.data())
        }
    }).catch(error => console.log(error))
}
