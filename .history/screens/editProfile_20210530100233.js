import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function EditProfile() {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.3}>
        <Image source={require("../assets/user.png")} style={styles.image} />
        <Text>edit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  image: {
    marginBottom: 25,
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    alignSelf: "center",
    borderRadius: 120,
    backgroundColor: "#D3D3D3",
    opacity: 0.6
  },

  
});
