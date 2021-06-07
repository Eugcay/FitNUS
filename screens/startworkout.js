import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function StartWorkout({ navigation }) {
  return (
    <ImageBackground source={require("../assets/jio.png")} style={styles.image}>
      <View style={styles.bottom}>
        <Text style={styles.caption}>Welcome to the club</Text>
        <Text style={styles.content}>Find a buddy and get started!</Text>
        
      </View>
      <View style={styles.buttonSurrounding}>
      <TouchableOpacity style={styles.join}>
          <Text>Find your friends</Text>
        </TouchableOpacity>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "contain",
    alignItems: "center",
  },

  bottom: {
    width: '100%',
    flex: 1,
    justifyContent: "flex-end",
  },

  caption: {
    color: "white",
    fontSize: 40,
    backgroundColor: "#000000a0"
  },

  content: {
    color: "white",
    fontSize: 20,
    backgroundColor: "#000000a0",
    marginBottom: 20
    
  },

  join: {
    marginBottom: 40,
    width: "80%",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },

  buttonSurrounding: {
      width: '100%',
      backgroundColor: "#000000a0",
      alignItems: "center"
  }
});
