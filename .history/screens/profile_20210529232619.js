import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import { getUser } from "../Api/userApi";

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const profile = await getUser();
      setUser(profile);
      console.log(user);
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
      <Image source="assets/user.png"/>
      <Text>{user.name}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Edit Profile")}>
        <Text style={styles.forgotButton}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  text: {
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    alignItems: "center",
  },
});
