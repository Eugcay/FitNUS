import React, { useState, useEffect, useReducer } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import { deleteUser } from "../../../helpers/auth";
import { styles } from "./styles";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        [action.input]: action.value,
      };
    default:
      return state;
  }
};

function EditProfile(props) {
  const { user } = props.route.params;
  const [userState, dispatch] = useReducer(reducer, user);


  const [changePhoto, setChange] = useState(false);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const path = `users/${firebase.auth().currentUser.uid}/profile`;

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => <TouchableOpacity onPress={deleteUser}><Text style={{marginRight: 5, color: 'crimson', fontSize: 12}}>Delete Account</Text></TouchableOpacity>
    })
  }, [])

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
      const res = await fetch(userState.photoURL);
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
      console.log(userState)
      update(user?.photoURL || null);
    }
  };

  const update = async (url) => {
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .set( userState );
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
      setUserState(result.uri, "photoURL", false);
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

  const setUserState = (value, input, numeric) => {
    const digits = "0123456789";
    if (numeric) {
      for (let i = 0; i < value.length; i++) {
        if (digits.indexOf(value[i]) === -1) {
          alert("numbers only!");
        }
      }
    }

    dispatch({ type: "UPDATE", input, value });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={setDP}>
          <Image
            source={
              userState?.photoURL
                ? { uri: userState.photoURL }
                : require("../../../assets/user.png")
            }
            style={styles.image}
          />

          <Text style={styles.text}>edit</Text>
        </TouchableOpacity>

        <View style={styles.input}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.fields}
            // onChangeText={(text) => console.log(text)}
            onChangeText={(text) => setUserState(text, "name", false)}
            placeholder="name"
            value={userState.name}

          ></TextInput>
        </View>

        <View style={styles.input}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.fields}
            onChangeText={(text) => setUserState(text, "email", false)}
            placeholder="email"
            value={userState.email}
            textContentType="emailAddress"
          ></TextInput>
        </View>

        <View style={styles.input}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={styles.fields}
            onChangeText={(text) => setUserState(text, "bio", false)}
            placeholder="bio"
            value={userState.bio}
            multiline={true}
          ></TextInput>
        </View>

        <View style={styles.input}>
          <Text style={styles.label}>Duration Goal (min)</Text>
          <TextInput
            style={styles.fields}
            onChangeText={(text) => setUserState(text, "durationGoal", true)}
            placeholder="Set goal for total weekly workout duration"
            value={userState.durationGoal}
            maxLength={6}
          ></TextInput>
        </View>

        <View style={styles.input}>
          <Text style={styles.label}>Distance Goal (km)</Text>
          <TextInput
            style={styles.fields}
            onChangeText={(text) => setUserState(text, "distanceGoal", true)}
            placeholder="Set goal for total distance run per week"
            value={userState.distanceGoal}
            maxLength={8}
          ></TextInput>
        </View>

        <View style={styles.input}>
          <Text style={styles.label}>Weekly Workout Goal (sessions)</Text>
          <TextInput
            style={styles.fields}
            onChangeText={(text) => setUserState(text, "workoutGoal", true)}
            placeholder="Set goal for minimum workouts per week"
            value={userState.workoutGoal}
            maxLength={6}
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

export default EditProfile;