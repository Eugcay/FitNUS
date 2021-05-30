import firebase from "firebase";

export function getWorkouts() {
  return firebase
    .firestore()
    .collection("Workouts")
    
}

export function getWorkoutById(id) {
  return firebase.firestore().collection('Workouts').doc(id).onSnapshot(snapshot => snapshot.data())
}
