import React, { useState } from "react";
import { StyleSheet, View, TextInput, Image } from "react-native";
import Background from "../components/Background";
import { AntDesign } from "@expo/vector-icons";

export default function LoginScreen() {
  const [userId, setUserId] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  return (
      <Background>   
      <Image
        source={require("../assets/nus-logo-gold-b-horizontal.png")}
        style={styles.image}
      />
      <View opacicty={0.6} style={styles.input}>
        <AntDesign name="user" size={24} color="blue" />
        <TextInput placeholder="User ID" onChangeText={(text) => setUserId({value: text, error: ''})}/>
      </View>
      <View style={styles.input}>
        <AntDesign name='lock' size={24} color="blue" />
        <TextInput placeholder="Password" onChangeText={(text) => setPassword({value: text, error: ''})}/>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    alignSelf: "center",
  },

  input: {
    color: 'white',
    flexDirection: "row",
    alignItems: "center",
    width: '60%',
    height: 40,
    marginVertical: 25,
    borderWidth: 1.5,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 20
  },

  layout: {
      flex: 1,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "blue"
  }
});
