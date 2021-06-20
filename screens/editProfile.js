import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { updateUser } from "../store/actions/user";
import { connect } from "react-redux";
import firebase from "firebase";

function EditProfile(props) {
  const { user } = props.route.params;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user?.bio);
  const [photoURL, setPhoto] = useState(user.photoURL ? user.photoURL : null);
  const [changePhoto, setChange] = useState(false);
  const [calGoal, setCalGoal] = useState(
    user.caloriesGoal ? user.caloriesGoal : ""
  );
  const [durationGoal, setDurationGoal] = useState(
    user.durationGoal ? user.durationGoal : ""
  );
  const [distanceGoal, setDistanceGoal] = useState(user?.distanceGoal);
  const [workoutGoal, setWokroutGoal] = useState(user?.workoutGoal);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const path = `users/${firebase.auth().currentUser.uid}/profile`;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        setGalleryPermission(status === "granted");
      }
    })();
  }, []);

  const upload = async () => {
    if (changePhoto) {
      const res = await fetch(image);
      const blob = await res.blob();

      const profile = firebase.storage().ref().child(path).put(blob);

      const progress = (snapshot) => {
        console.log(`transferred: ${snapshot.bytesTransferred}`);
      };

      const completed = () => {
        profile.snapshot.ref.getDownloadURL().then((snapshot) => {
          update(snapshot);
          console.log(snapshot);
        });
      };

      const error = (snapshot) => {
        console.log(snapshot);
      };

      profile.on("state_change", progress, error, completed);
    } else {
      update(photoURL);
    }
  };

  const update = async (url) => {
    await props.uploadChanges({
      name,
      email,
      bio,
      url,
      calGoal,
      durationGoal,
      distanceGoal,
      workoutGoal
    });
    props.navigation.goBack();
  };

  const setDP = () => {
    console.log(galleryPermission);
    if (galleryPermission) {
      pickImage();
    } else {
      Alert.alert("no access to gallery!");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setChange(true);
    }
  };

  const confirmSubmit = () => {
    Alert.alert("Confirm changes?", "Confirm to continue", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Confirm", onPress: () => upload() },
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    confirmSubmit();
  };

  return (
    <ScrollView >
      <View style={styles.container}>
      <TouchableOpacity onPress={setDP}>
        <Image
          source={
            image
              ? { uri: image }
              : photoURL
              ? { uri: photoURL }
              : require("../assets/user.png")
          }
          style={styles.image}
        />

        <Text style={styles.text}>edit</Text>
      </TouchableOpacity>

      <View style={styles.input}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.fields}
          onChangeText={(text) => console.log(text)}
          onChange={(text) => setName(text)}
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

      <View style={styles.input}>
        <Text style={styles.label}>Calories Goal (cal)</Text>
        <TextInput
          style={styles.fields}
          onChangeText={(text) => setCalGoal(text)}
          placeholder="Set goal for calories burnt weekly"
          value={calGoal}
        ></TextInput>
      </View>

      <View style={styles.input}>
        <Text style={styles.label}>Duration Goal (min)</Text>
        <TextInput
          style={styles.fields}
          onChangeText={(text) => setDurationGoal(text)}
          placeholder="Set goal for total weekly workout duration"
          value={durationGoal}
        ></TextInput>
      </View>

      <View style={styles.input}>
        <Text style={styles.label}>Distance Goal (km)</Text>
        <TextInput
          style={styles.fields}
          onChangeText={(text) => setDistanceGoal(text)}
          placeholder="Set goal for total distance run per week"
          value={distanceGoal}
        ></TextInput>
      </View>

      <View style={styles.input}>
        <Text style={styles.label}>Weekly Workout Goal (sessions)</Text>
        <TextInput
          style={styles.fields}
          onChangeText={(text) => setWokroutGoal(text)}
          placeholder="Set goal for minimum workouts per week"
          value={workoutGoal}
        ></TextInput>
      </View>

      <TouchableOpacity
        title="Save"
        style={styles.saveButton}
        onPress={handleSubmit}
      >
        <Text style={{ color: "#FFFFF0" }}>Save</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadChanges: (
      user
    ) =>
      dispatch(
        updateUser(
          user
        )
      ),
  };
};

export default connect(null, mapDispatchToProps)(EditProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center'
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
