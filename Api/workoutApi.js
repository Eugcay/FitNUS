import firebase from "firebase";

export function getWorkouts() {
  return firebase.firestore().collection("Workouts");
}

export async function getWorkoutById(id) {
  return firebase
    .firestore()
    .collection("Workouts")
    .doc(id)
}
