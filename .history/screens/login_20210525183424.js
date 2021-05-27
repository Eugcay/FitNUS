import React, { useState } from "react";
import { StyleSheet, View, TextInput, Image } from "react-native";
import Background from "../components/Background";
import { AntDesign } from "@expo/vector-icons";

export default function LoginScreen() {
  const [userId, setUserId] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  return (
      <Background>
     {/* <View style={styles.layout}> */}
      <Image
        source={require("../assets/nus-logo-gold-b-horizontal.png")}
        style={styles.image}
      />
      <View>
        <View style={styles.input}>
          <AntDesign name="user" size={24} color="blue" />
          <TextInput placeholder="User ID" onChangeText={(text) => setUserId({value: text, error: ''})}/>
        </View>
        <View style={styles.input}>
          <AntDesign name='lock' size={24} color="blue" />
          <TextInput placeholder="Password" onChangeText={(text) => setPassword({value: text, error: ''})}/>
        </View>
      </View>
    {/* /  </View> */}
   
    </Background>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    alignSelf: "center",
  },

  input: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 60,
    marginTop: 50,
    borderWidth: 1.5,
    borderRadius: 25,
    paddingHorizontal: 10,
  },

  layout: {
      flex: 1,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "blue"
  }
});
