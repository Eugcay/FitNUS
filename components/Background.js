import React from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView, Platform, View
} from "react-native";

export default function Background({ children }) {
  return (
    <View style={styles.image}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : 'height'} style={styles.container}>
        {children}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: '#0B2A59'
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
