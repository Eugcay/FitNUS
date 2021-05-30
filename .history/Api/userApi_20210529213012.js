import React from "react";
import firebase from "firebase";

export async function getUser() {
  return firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then(snapshot => {
        if (snapshot.exists) {
            snapshot.data()
        }
    }).catch(error => console.log(error))
}
