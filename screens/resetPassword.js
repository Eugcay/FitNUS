import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { resetPassword } from "../helpers/auth";

const ResetPassword = ({navigation}) => {
  const [email, setEmail] = useState("");

  const reset = () => {
      resetPassword(email)
  } 

  return (
    <View style={styles.background}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={17} color="lightblue" />
        <Text style={{ color: "lightblue", marginLeft: 3 }}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Reset Password</Text>
      <View style={styles.emailBox}>
        <Text style={{ marginRight: 3 }}>Email: </Text>
        <TextInput value={email} style={{width: '80%'}} onChangeText={(value) => setEmail(value)} />
      </View>
      <TouchableOpacity onPress={reset} style={styles.resetButton}>
          <Text style={{ fontSize: 16}}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#0B2A59",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    color: "gold",
    marginVertical: 30,
  },

  emailBox: {
    flexDirection: "row",
    width: "70%",
    height: "4%",
    minHeight: 30,
    borderRadius: 5,
    backgroundColor: "lightblue",
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: "center",
    marginVertical: 20,
  },

  backButton: {
    flexDirection: "row",
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 30,
    left: 30,
  },

  resetButton: {
    backgroundColor: 'gold',
    width: '50%',
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginTop: 20
  },
});
