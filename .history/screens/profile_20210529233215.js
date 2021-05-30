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
      <Image source={require("../assets/user.png")} style={styles.image}/>
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
    fontSize:20
  },

  container: {
    flex: 1,
    alignItems: "center",
  },

  image: {
    marginBottom: 25,
    width:'25%',
    height: '15%',
    alignSelf: "center",
    borderRadius: 120,
    backgroundColor: '#D3D3D3'
  },
});
