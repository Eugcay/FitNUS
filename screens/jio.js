import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

export default function Jio({ navigationj }) {
  return (
    <View>
      <ImageBackground source={require("../assets/suggestionSample.jpeg")} style={styles.image}>
        <Text>Hello good morning</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
    image: {
        flex: 1, 
        height: 220,
        backgroundColor: "black",
        marginTop: 10,
        marginBottom: 15,
        marginHorizontal: 15,
        justifyContent: "center",
        alignItems: "stretch",
        borderRadius: 15,
      },
})