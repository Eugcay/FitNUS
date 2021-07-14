import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import firebase from "firebase";
import { createNativeWrapper } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { logout } from "../helpers/auth";

const Verification = (props) => {

  const goback = async () => {
    // try {
    //   const user = firebase.auth().currentUser
    //   await user.delete()
    //   console.log('success')
    // } catch (error) {
    //   alert(error)
    // }
     logout()
  }

  const resend = async () => {
    try {
      const user = firebase.auth().currentUser;
      console.log(user.email)
      await user.sendEmailVerification();
    } catch (error) {
      alert(error)
    }
  }

  return (
    <View style={styles.background}>
      <TouchableOpacity onPress={goback} style={styles.backButton}>
        <MaterialCommunityIcons name='arrow-left' size={17} color='lightblue'/>
        <Text style={{color: 'lightblue', marginLeft: 3}}>Cancel</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.info}>Please check your email inbox and verify your email</Text>
      <TouchableOpacity onPress={resend} style={styles.resendButton}>
        {/* <TextInput value={email}/> */}
        <Text>Resend Verification Email</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Verification;

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
    marginVertical: 30
  },

  info: {
    color: 'gold',
    marginVertical: 10
  },

  resendButton: {
    backgroundColor: "gold",
    width: "60%",
    height: '5%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },

  backButton: {
    flexDirection: 'row',
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left:  30
  }
});
