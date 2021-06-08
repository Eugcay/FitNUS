import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import firebase from "firebase";
import { color } from "react-native-reanimated";
import { updateUser } from "../store/actions/user";
import { connect } from "react-redux";

function EditProfile(props) {
  const { user } = props.route.params;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user?.bio);
  const [photoURL, setPhoto] = useState(user.photoURL ? user.photoURL : "");
  const [loading, setLoading] = useState(false);
  const [calGoal, setCalGoal] = useState(
    user.caloriesGoal ? user.caloriesGoal : ""
  );
  const [durationGoal, setDurationGoal] = useState(
    user.durationGoal ? user.durationGoal : ""
  );
  const [distanceGoal, setDistanceGoal] = useState(user?.distanceGoal);
  const [workoutGoal, setWokroutGoal] = useState(user?.workoutGoal);

  const upload = () => {
    props
      .uploadChanges(
        name,
        email,
        bio,
        photoURL,
        calGoal,
        durationGoal,
        distanceGoal,
        workoutGoal
      )
      .then(props.navigation.goBack());
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
  ) : (
    <Text>Loading...</Text>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadChanges: (
      name,
      email,
      bio,
      photoURL,
      caloriesGoal,
      durationGoal,
      distanceGoal,
      workoutGoal
    ) =>
      dispatch(
        updateUser(
          name,
          email,
          bio,
          photoURL,
          caloriesGoal,
          durationGoal,
          distanceGoal,
          workoutGoal
        )
      ),
  };
};

export default connect(null, mapDispatchToProps)(EditProfile);

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
