import React from "react";
import { Image, Text, TouchableOpacity, StyleSheet} from "react-native";
import Background from "../components/Background";

import { Ionicons } from "@expo/vector-icons";
import { startAsync, makeRedirectUri, getDefaultReturnUrl } from "expo-auth-session";
import Donut from "../components/Donut";

function LandingPage({ navigation }) {
  const config = {
    issuer: 'https://vafs.nus.edu.sg/adfs/oauth2/authorize:',
    response_type: 'code',
    clientId: '97F0D1CACA7D41DE87538F9362924CCB-184318',
    resource: 'sg_edu_nus_oauth',
    redirectUrl: ':/callback',
    additionalParameters: {},
    scopes: ['openid', 'profile']
  };

  const authURL = 'https://vafs.nus.edu.sg/adfs/oauth2/authorize?'
  const clientId = 'INC000002364746'

  const openAuthSession = async () => {
    const redirectUrl = makeRedirectUri({ native: 'fitnus://'})
    console.log(redirectUrl)
    const result = await startAsync({
      authUrl:
        `${authURL}` +
        `?response_type=code` +
        `&client_id=${clientId}` +
        `&amp;resource=sg_edu_nus_oauth` +
        `&redirect_uri=${redirectUrl}`,
        
    });
    console.log(result)
    const { type, errorCode = 'You cancel or dismissed the login' } = result;
    if (type === 'success') {
      // Just simple way to store the token in this examples
      await AsyncStorage.setItem('userToken', JSON.stringify(result));
      navigation.navigate(ScreenKeys.main);
    } 
  }
  
  const link =
    "https://vafs.nus.edu.sg/adfs/oauth2/authorize";
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
        onPress={() => openAuthSession()}
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
