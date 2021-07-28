import firebase from "firebase";
import "firebase/firestore";

export async function signUp(name, email, password) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);

    // send verification email
    const currUser = firebase.auth().currentUser;

    await currUser.sendEmailVerification();
    await currUser.updateProfile({displayName: name})

    firebase.firestore().collection("users").doc(currUser.uid).set({
      name,
      email,
      bio: "",
      photoURL: "",
      caloriesGoal: "",
      durationGoal: "",
      pb: [],
      created: new Date()
    });
   
    
    
      
  } catch (error) {
    alert(error);
  }
}

export async function login(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    if (!firebase.auth().currentUser.emailVerified) {
      resend()
    }
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
    const name = user.displayName
    const email = user.email
    await user.sendEmailVerification();
    firebase.firestore().collection("users").doc(user.uid).set({
      name,
      email,
      bio: "",
      photoURL: "",
      caloriesGoal: "",
      durationGoal: "",
      pb: [],
      created: new Date()
    });
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
