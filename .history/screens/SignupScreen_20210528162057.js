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

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState({ input: "", error: "", pressed: false });
  const [userId, setUserId] = useState({
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
    firebase
      .auth()
      .createUserWithEmailAndPassword(userId, password)
      .then((result) => {
        firebase.firestore().collection("users")
        .doc(firebase.auth().createUserWithEmailAndPassword.userId)
        .set({
          name,
          email
      })
        console.log(result)})
      .catch((error) => console.log(error));
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
          placeholder="User ID"
          style={{ paddingHorizontal: 10 }}
          onChangeText={(id) => setUserId(id)}
        />
      </View>
      <View style={styles.input}>
        <AntDesign name="lock" size={24} color="blue" />
        <TextInput
          placeholder="Password"
          style={{ paddingHorizontal: 10 }}
          onChangeText={(pwd) => setPassword(pwd)}
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
