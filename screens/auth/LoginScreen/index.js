import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import Background from "../../../components/Background";
import { AntDesign } from "@expo/vector-icons";
import { login } from "../../../helpers/auth";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { styles } from "./styles";

export default function LoginScreen({ navigation }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const link =
    "https://vafs.nus.edu.sg/adfs/oauth2/authorize?response_type=code&amp;client_id=97F0D1CACA7D41DE87538F9362924CCB-184318&amp;resource=sg_edu_nus_oauth&amp;redirect_uri=https%3A%2F%2Fmyaces.nus.edu.sg%3A443%2Fhtd%2Fhtd";

  const handleDeepLink = (event) => {
    let data = Linking.parse(event.url);
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    Linking.addEventListener("url", handleDeepLink);
    return () => {
      Linking.removeEventListener("url");
    };
  }, []);

  const handleSubmit = () => {
    login(userId, password);
  };

  return (
    <Background>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="arrowleft" size={22} color="azure" />
          <Text style={{ color: "azure", fontSize: 15, marginLeft: 7 }}>
            Back
          </Text>
        </View>
      </TouchableOpacity>
      <Image
        source={require("../../../assets/National_University_of_Singapore_logo_NUS.png")}
        style={styles.logo}
      />

      <Image source={require("../../../assets/Girls.png")} style={styles.image} />
      <View style={styles.input}>
        <AntDesign name="user" size={24} color="blue" />
        <TextInput
          placeholder="Email"
          style={{ paddingHorizontal: 10 }}
          onChangeText={(text) => {console.log(text); setUserId(text)}}
          errorText="Please enter valid email"
          autoCapitalize='none'
        />
      </View>
      <View style={styles.input}>
        <AntDesign name="lock" size={24} color="blue" />
        <TextInput
          placeholder="Password"
          style={{ paddingHorizontal: 10 }}
          onChangeText={(text) => setPassword(text)}
          errorText="Please enter valid password"
          secureTextEntry={true}
          value={password}
          autoCapitalize='none'
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
        <Text style={styles.signUpButton}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        title="Login"
        style={styles.loginButton}
        onPress={handleSubmit}
      >
        <Text style={{ color: "#0B2A59" }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('Reset Password')}>
        <Text style={{ fontSize: 13, color: "#F5DC3C" }}>
          Forgot Your Password?
        </Text>
      </TouchableOpacity>
    </Background>
  );
}

