import firebase from "firebase";

export function getWorkouts() {
  return firebase.firestore().collection("Workouts");
}

export async function getWorkoutById(id) {
  const workout = await firebase
    .firestore()
    .collection("Workouts")
    .doc(id)
    .onSnapshot((snapshot) => snapshot.data());

  return workout
}
