import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, Image, StyleSheet } from "react-native";
import Background from "../components/Background";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";

const SignupScreen = ({navigation}) => {
  const [form, setForm] = useState({ name: "", userId: "", password: "" });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((result) => console.log(result))
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
          onChangeText={handleChange}
        />
      </View>
      <View style={styles.input}>
        <AntDesign name="user" size={24} color="blue" />
        <TextInput
          placeholder="User ID"
          style={{ paddingHorizontal: 10 }}
          onChangeText={handleChange}
        />
      </View>
      <View style={styles.input}>
        <AntDesign name="lock" size={24} color="blue" />
        <TextInput
          placeholder="Password"
          style={{ paddingHorizontal: 10 }}
          onChangeText={handleChange}
        />
      </View>
      <TouchableOpacity
        title="Sign Up"
        style={styles.loginButton}
        onPress={handleSubmit}
      />
      <TouchableOpacity onPress={() => navigation.replace('SignupScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
    </Background>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  logo: {
    width: "60%",
    height: "14%",
    alignSelf: "center",
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
    fontWeight: 'bold',
    color: '#FFC94A',
  },
});
