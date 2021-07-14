import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { resetPassword } from "../../../helpers/auth";

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

