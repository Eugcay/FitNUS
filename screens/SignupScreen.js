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
import { signUp } from "../helpers/auth";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    signUp(name, email, password);
  };

  return (
    <Background>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.replace('Landing')}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="arrowleft" size={22} color="azure" />
          <Text style={{ color: "azure", fontSize: 15, marginLeft: 7 }}>
            Back
          </Text>
        </View>
      </TouchableOpacity>

      <Image
        source={require("../assets/National_University_of_Singapore_logo_NUS.png")}
        style={styles.logo}
      />

      <Text
        style={{
          color: "#F0FFFF",
          marginTop: 10,
          marginBottom: 5,
          fontSize: 16,
        }}
      >
        Sign Up
      </Text>

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
          placeholder="NUS or personal email"
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
    minHeight: 40
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
    marginBottom: 60,
  },

  forgotButton: {
    height: 30,
    marginBottom: 30,
    color: "#F5DC3C",
  },

  backButton: {
    width: "80%",
    marginBottom: 40,
    alignSelf: "auto",
  },
});
