import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export default function Jio({ navigation }) {
  return (
    <ImageBackground source={require("../../assets/jio.png")} style={styles.image}>
      <View style={styles.bottom}>
        <Text style={styles.caption}>Welcome to the club</Text>
        <Text style={styles.content}>Find a buddy and get started!</Text>
      </View>
      <View style={styles.buttonSurrounding}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Exercise Jio")}
          style={styles.join}
        >
          <Text style={{fontSize: 15}}>Join a workout</Text>
        </TouchableOpacity>
       
      </View>
    </ImageBackground>
  );
}