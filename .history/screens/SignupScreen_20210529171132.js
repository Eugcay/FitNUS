import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import Background from "../components/Background";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import { signUp} from "../Api/authApi";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState({ input: "", error: "", pressed: false });
  const [email, setEmail] = useState({
    input: "",
    error: "",
    pressed: false,
  });
  const [password, setPassword] = useState({
    input: "",
    error: "",
    pressed: false,
  });

  const handleSubmit = () => {
    signUp(name.input, email.input, password.input)
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
            history: [],
          });
        console.log(result);
      })
      .catch((error) => alert(error));
  };

  return (
    <Background>
      <Image
        source={require("../assets/National_University_of_Singapore_logo_NUS.png")}
        style={styles.logo}
      />

      <View style={styles.input}>
        <AntDesign name="lock" size={24} color="blue" />
        <TextInput
          placeholder="Name"
          style={{ paddingHorizontal: 10 }}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.input}>
        <AntDesign name="user" size={24} color="blue" />
        <TextInput
          placeholder="Username"
          style={{ paddingHorizontal: 10 }}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.input}>
        <AntDesign name="lock" size={24} color="blue" />
        <TextInput
          placeholder="Password"
          style={{ paddingHorizontal: 10 }}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity
        title="Sign Up"
        style={styles.loginButton}
        onPress={handleSubmit}
      />
      <TouchableOpacity style={styles.SignupButton} onPress={handleSubmit}>
        <Text>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity stylb onPress={() => navigation.replace("LoginScreen")}>
        <Text style={styles.forgotButton}>Login</Text>
      </TouchableOpacity>
    </Background>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  logo: {
    width: "60%",
    height: "12%",
    alignSelf: "center",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#CCE5FF",
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    height: "5%",
    marginVertical: 13,
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    opacity: 0.8,
  },

  inputbox: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    color: "black",
  },

  link: {
    fontWeight: "bold",
    color: "#FFC94A",
  },

  SignupButton: {
    marginTop: 15,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#FFC94A",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },

  forgotButton: {
    height: 30,
    marginBottom: 2,
    color: "#F5DC3C",
  },
});
