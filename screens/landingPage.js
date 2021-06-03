import React from "react";
import { Image, Text, TouchableOpacity, StyleSheet} from "react-native";
import Background from "../components/Background";
import * as WebBrowser from "expo-web-browser";
import { Ionicons } from "@expo/vector-icons";
import Donut from "../components/Donut";

function LandingPage({ navigation }) {
  // const config = {
  //   issuer: 'https://{yourOktaDomain}/oauth2/default',
  //   response_type: 'code',
  //   clientId: '97F0D1CACA7D41DE87538F9362924CCB-184318',
  //   redirectUrl: ':/callback',
  //   additionalParameters: {},
  //   scopes: ['openid', 'profile', 'email', 'offline_access']
  // };
  
  const link =
    "https://vafs.nus.edu.sg/adfs/oauth2/authorize?response_type=code&amp;client_id=97F0D1CACA7D41DE87538F9362924CCB-184318&amp;resource=sg_edu_nus_oauth&amp;redirect_uri=fitnus://callback";
  return (
    <Background>
      <Image
        source={require("../assets/National_University_of_Singapore_logo_NUS.png")}
        style={styles.logo}
      />
      <Text style={styles.name}>FITNUS</Text>
    
      <Ionicons name="md-barbell" size={60} color="#FFC94A" />
      <Text style={{color: "#F0FFFF", marginTop: 10, marginBottom: 2, fontSize: 13}}>Login as</Text>

      <TouchableOpacity
        title="NUS Auth"
        style={styles.nusButton}
        onPress={() => WebBrowser.openBrowserAsync(link)}
      >
        <Text style={styles.buttonText}>NUS Student / Staff</Text>
      </TouchableOpacity>
      <TouchableOpacity
        title="Login"
        style={styles.loginButton}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.buttonText}>Guest</Text>
      </TouchableOpacity>

      

      <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.replace("SignupScreen")}>
        <Text style={{color: '#F5DC3C', fontSize: 12}}>Don't have an account?</Text>
        <Text style={{color: '#F5DC3C', fontSize: 12, textDecorationLine: 'underline'}}> Sign up</Text>
      </TouchableOpacity>
      
    </Background>
  );
}

export default LandingPage;

const styles = StyleSheet.create({
  logo: {
    width: "65%",
    height: "13%",
    alignSelf: "center",
    marginBottom: 14
  },

  loginButton: {
    marginTop: 15,
    width: "77%",
    alignItems: "center",
    marginVertical: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#F0FFFF",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#fff",
  },

  nusButton: {
      marginTop: 15,
      width: "77%",
      alignItems: "center",
      marginVertical: 10,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: "#FFC94A",
      borderRadius: 17,
      borderWidth: 1,
      borderColor: "#fff",
  },

  buttonText: {
    color: "#0B2A59",
    fontSize: 15
  },

  name: {
      fontSize: 45,
      color: "#FFD700",
      fontFamily: 'Times New Roman',
      fontWeight: 'bold',
      marginTop: 10
  },

  forgotButton: {
    alignItems: 'flex-end',
    width: '76%',
    height: 30,
    marginVertical: 8,
    fontSize: 14,
    color: "#F5DC3C",
  },
});
