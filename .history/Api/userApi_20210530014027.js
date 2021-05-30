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
            console.log(snapshot.data())
            return {
                ...snapshot.data(),
                id: snapshot.id
            }
        } else {
            console.log('Data not found')
        }
    }).catch(error => console.log(error))
}

