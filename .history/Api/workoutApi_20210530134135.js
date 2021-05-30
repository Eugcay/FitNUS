import firebase from "firebase";

export function getWorkouts() {
  return firebase
    .firestore()
    .collection("workouts")
    
}


