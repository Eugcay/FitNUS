import React from "react";
import firebase from "firebase";

export function getUser() {
  return firebase
    .firestore()
    .collection("users")
    .then()
    .doc(id)
    .get()
    .then(snapshot => snapshot.data())
}
