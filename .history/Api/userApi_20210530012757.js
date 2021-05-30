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
            return snapshot.data()
        } else {
            console.log('Data not found')
        }
    }).catch(error => console.log(error))
}


