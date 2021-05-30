import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { getUser } from "../Api/userApi";

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const profile = getUser()
      .onSnapshot((snapshot) => {
        console.log(snapshot.data());
        setUser(snapshot.data());
      });
    return profile;
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/user.png")} style={styles.image} />
      <Text style={styles.text}>{user.name}</Text>
      <Text>{user.email}</Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("Edit Profile")}
      >
        <Text>Edit profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  text: {
    fontSize: 23,
    marginBottom: 5
  },

  container: {
    flex: 1,
    alignItems: "center",
  },

  image: {
    marginBottom: 25,
    marginTop: 10,
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
    width: "40%",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 7,
  },
});
