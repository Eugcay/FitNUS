import React from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

export default function Background({ children }) {
  const image = { uri: "https://reactjs.org/logo-og.png" }
//   require("../assets/BG.png")
  return (
    <ImageBackground source={require("../assets/BG.png")} style={styles.image}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center"
    
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
