import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import firebase from "firebase";
import { getUser } from "../Api/userApi";

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try { 
      const profile = await getUser();
      console.log(profile)
      setUser(profile);
      
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text styles={styles.text}>My Profile</Text>
      <Image source={require("../assets/user.png")} style={styles.image} />
      <Text style={styles.text}>{user.name}</Text>
      
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("Edit Profile")}>
        <Text >Edit profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  text: {
    fontSize: 23,
  },

  container: {
    flex: 1,
    alignItems: "center",
  },

  image: {
    marginBottom: 25,
    width: "25%",
    height: "15%",
    alignSelf: "center",
    borderRadius: 120,
    backgroundColor: "#D3D3D3",
  },

  editButton: {
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    width: '40%',
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 7,
  },
});
