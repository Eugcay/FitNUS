import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import Background from "../components/Background";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import { login } from "../Api/authApi";

export default function LoginScreen({ navigation }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    login(userId, password)
    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(userId.value, password.value)
    //   .then((result) => console.log(result))
    //   .catch((error) => alert(error));
  };

  return (
    <Background>
      <Image
        source={require("../assets/National_University_of_Singapore_logo_NUS.png")}
        style={styles.logo}
      />

      <Image source={require("../assets/Girls.png")} style={styles.image} />
      <View style={styles.input}>
        <AntDesign name="user" size={24} color="blue" />
        <TextInput
          placeholder="User ID"
          style={{ paddingHorizontal: 10 }}
          onChangeText={(text) => setUserId("")}
        />
      </View>
      <View style={styles.input}>
        <AntDesign name="lock" size={24} color="blue" />
        <TextInput
          placeholder="Password"
          style={{ paddingHorizontal: 10 }}
          onChangeText={(text) => setPassword("")}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.replace("SignupScreen")}>
        <Text style={styles.forgotButton}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        title="Login"
        style={styles.loginButton}
        onPress={handleSubmit}
      >
        <Text style={{ color: "#0B2A59" }}>Login</Text>
      </TouchableOpacity>
    </Background>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "70%",
    height: "14%",
    alignSelf: "center",
  },

  image: {
    marginBottom: 20,
    width: 150,
    height: 170,
    alignSelf: "center",
  },

  input: {
    backgroundColor: "#CCE5FF",
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    height: "5%",
    marginVertical: 10,
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    opacity: 0.8,
  },

  layout: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },

  loginButton: {
    marginTop: 15,
    marginBottom: 70,
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
    fontSize: 14,
    color: "#F5DC3C",
  },
});
