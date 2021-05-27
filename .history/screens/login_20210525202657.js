import React, { useState } from "react";
import { StyleSheet, View, TextInput, Image, Text, TouchableOpacity } from "react-native";
import Background from "../components/Background";
import { AntDesign } from "@expo/vector-icons";

export default function LoginScreen() {
  const [userId, setUserId] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const handleSubmit = () => {
    console.log('hello')
  }

  return (
      <Background>   
      <Image
        source={require("../assets/nus-logo-gold-b-horizontal.png")}
        style={styles.image}
      />
      <View style={styles.input}>
        <AntDesign name="user" size={24} color="blue" />
        <TextInput placeholder="User ID" style={{paddingHorizontal: 10}} onChangeText={(text) => setUserId({value: text, error: ''})}/>
      </View>
      <View style={styles.input}>
        <AntDesign name='lock' size={24} color="blue" />
        <TextInput placeholder="Password" style={{paddingHorizontal: 10}} onChangeText={(text) => setPassword({value: text, error: ''})}/>
      </View>
      <View></View>
      <TouchableOpacity title="Login" style={styles.loginButton} onPress={handleSubmit}>
        <Text>Login</Text>
      </TouchableOpacity>
    </Background>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    alignSelf: "center",
    marginBottom: 20
  },

  input: {
    backgroundColor: '#BED1EF',
    flexDirection: "row",
    alignItems: "center",
    width: '80%',
    height: '5%',
    marginVertical: 10,
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    opacity: 0.8
  },

  layout: {
      flex: 1,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "blue"
  },

  loginButton: {
    marginTop: 20,
    width: '80%',
    alignItems: "center",
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#FFC94A',
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#fff'}
});
