import firebase from "firebase";
import { SET_USER_TEMPLATES } from "./types";

export const getUserTemplates = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("templates")
      .onSnapshot((sanpshot) => {
        const templates = [];
        sanpshot.docs.forEach((doc) => {
          templates.push({id: doc.id, data: doc.data()});
        });
        dispatch({type: SET_USER_TEMPLATES, templates})
      });
  };
};
