import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import Background from "../components/Background";
import { AntDesign } from "@expo/vector-icons";

const SignupScreen = () => {
  const [form, setForm] = useState({ name: "", userId: "", password: "" });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
      console.log(form)
  }

  return (
    <Backgorund>
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
    </Backgorund>
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
});
