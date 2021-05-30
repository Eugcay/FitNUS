import React from "react";
import firebase from "firebase";

export function getUser() {
  return firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .onSnapshot(snapshot => {
        if (snapshot.exists) {
            return snapshot.data()    
        } else {
            console.log('Data not found')
        }
    })
}


