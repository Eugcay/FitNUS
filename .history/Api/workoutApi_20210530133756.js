import firebase from "firebase";

export async function getWorkouts() {
  return firebase
    .firestore()
    .collection("workouts")
    
}


