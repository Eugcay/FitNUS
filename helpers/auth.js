import firebase from "firebase";
import "firebase/firestore";

export async function signUp(name, email, password) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);

  
    // send verification email
    const currUser = await firebase.auth().currentUser;
      
    await firebase.firestore().collection("users").doc(currUser.uid).set({
      name,
      email,
      bio: "",
      photoURL: "",
      caloriesGoal: "",
      durationGoal: "",
      pb: [],
    });

    currUser.sendEmailVerification();

  } catch (error) {
    alert(error);
  }
}

export async function login(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    alert(error);
  }
}

export async function logout() {
  try {
    firebase.auth().signOut();
  } catch (error) {
    alert(error);
  }
}
export const resend = async () => {
  try {
    const user = firebase.auth().currentUser;
    console.log(user.email);
    await user.sendEmailVerification();
  } catch (error) {
    alert(error);
  }
};

export const resetPassword = async (email) => {
  try {
    firebase.auth().sendPasswordResetEmail(email);
  } catch (error) {
    const errCode = error.code;
    const errMsg = error.message;
    alert(errMsg)
  }
};

export const deleteUser = async () => {
  try {
    const user = firebase.auth().currentUser
    await firebase.firestore().collection('users').doc(user.uid).delete()
    await logout()
    await user.delete();
    console.log("success");
  } catch (error) {
    alert(error);
  }
};
