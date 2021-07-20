import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import Background from "../../../components/Background";
import { AntDesign } from "@expo/vector-icons";
import { signUp } from "../../../helpers/auth";
import { styles } from "./styles";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState('')

  const handleSubmit = () => {
    if (name.length === 0) {
      alert("No valid name entered!");
    } else if (password !== confirm) {
      alert ("Passwords do not match")
    } else {
      signUp(name, email, password);
    }
  };

  return (
    <Background>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.replace("Landing")}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="arrowleft" size={22} color="azure" />
          <Text style={{ color: "azure", fontSize: 15, marginLeft: 7 }}>
            Back
          </Text>
        </View>
      </TouchableOpacity>

      <Image
        source={require("../../../assets/FitNUS_white_and_gold.png")}
        style={styles.logo}
      />

      <Text
        style={{
          color: "#F0FFFF",
          marginTop: 10,
          marginBottom: 5,
          fontSize: 16,
        }}
      >
        Sign Up
      </Text>

      <View style={styles.input}>
        <AntDesign name="lock" size={24} color="blue" />
        <TextInput
          placeholder="Name"
          style={{ paddingHorizontal: 10, width: '90%' }}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.input}>
        <AntDesign name="user" size={24} color="blue" />
        <TextInput
          placeholder="NUS or personal email"
          style={{ paddingHorizontal: 10, width: '90%' }}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize='none'
        />
      </View>
      <View style={styles.input}>
        <AntDesign name="lock" size={24} color="blue" />
        <TextInput
          placeholder="Password"
          style={{ paddingHorizontal: 10, width: '90%' }}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize='none'
          secureTextEntry
        />
      </View>
      <View style={styles.input}>
        <AntDesign name="lock" size={24} color="blue" />
        <TextInput
          placeholder="Confirm Password"
          style={{ paddingHorizontal: 10, width: '90%' }}
          onChangeText={(text) => setConfirm(text)}
          autoCapitalize='none'
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        title="Sign Up"
        style={styles.loginButton}
        onPress={handleSubmit}
      />
      <TouchableOpacity style={styles.SignupButton} onPress={handleSubmit}>
        <Text>Sign up</Text>
      </TouchableOpacity>
    </Background>
  );
};

export default SignupScreen;
