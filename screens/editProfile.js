import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import firebase from "firebase";
import { getUser } from "../Api/userApi";
import { color } from "react-native-reanimated";

export default function EditProfile({route, navigation}) {
  const {user} = route.params
  
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user?.bio);
  const [photoURL, setPhoto] = useState(user.photoURL ? user.photoURL : '');
  const [loading, setLoading] = useState(false);

  const uploadPost = () => {
      firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
          name: name,
          email: email,
          bio: bio,
          photoURL: photoURL
      }).then(navigation.goBack())
  }

  const confirmSubmit = () => {
    Alert.alert(
        "Confirm changes?",
        "Confirm to continue",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Confirm", onPress: () => uploadPost() }
        ]
      );
  }

  const handleSubmit = event => {
    event.preventDefault()
    confirmSubmit()
  }


  return !loading ? (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image source={require("../assets/user.png")} style={styles.image} />
        <Text style={styles.text}>edit</Text>
      </TouchableOpacity>

      <View style={styles.input}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.fields}
          onChangeText={(text) => console.log(text)}
          onChange={text => setName(text)}
          placeholder="name"
          value={name}
        ></TextInput>
      </View>

      <View style={styles.input}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.fields}
          onChangeText={(text) => setEmail(text)}
          placeholder="email"
          value={email}
        ></TextInput>
      </View>

      <View style={styles.input}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={styles.fields}
          onChangeText={(text) => setBio(text)}
          placeholder="bio"
          value={bio}
        ></TextInput>
      </View>

      <TouchableOpacity
        title="Save"
        style={styles.saveButton}
        onPress={handleSubmit}
      >
        <Text style={{color: "#FFFFF0"}}>Save</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <Text>Loading...</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },

  label: {
    color: "#808080",
  },

  image: {
    marginVertical: 5,
    margin: 5,
    height: 80,
    width: 80,
    alignSelf: "center",
    borderRadius: 120,
    backgroundColor: "#D3D3D3",
  },

  text: {
    fontSize: 12,
    alignSelf: "center",
    color: "#808080",
  },

  saveButton: {
    marginTop: 15,
    marginBottom: 70,
    width: "80%",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#A6A6A6",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#fff",
  },

  input: {
    width: "80%",
    alignItems: "flex-start",
    marginVertical: 10,
    borderBottomColor: "#A0A0A0",
    borderBottomWidth: 1,
  },

  fields: {
    marginTop: 3,
    paddingVertical: 3,
  },
});
