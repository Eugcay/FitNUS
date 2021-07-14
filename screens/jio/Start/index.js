import React, { useState, useEffect, useReducer } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Divider, RadioButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./styles";
import moment from "moment";
import { presetLocations } from "../../../mapConfig";
import { connect } from "react-redux";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.value;
    case "UPDATE":
      return {
        ...state,
        [action.input]: action.value,
      };
    default:
      return state;
  }
};

const initialState = {
  name: "Exercise Jio",
  description: "",
  location: "",
  time: new Date(),
  duration: "",
  type: "",
  completed: false,
};

const JioStart = (props) => {
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [showDate, setDate] = useState(false);
  const [showTime, setTime] = useState(false);
  const [showLocations, setLocation] = useState(false);

  const [jioState, dispatch] = useReducer(reducer, initialState);
  const jioData = props.route.params?.jioData;

  const uid = firebase.auth().currentUser.uid;
  const user = {
    uid,
    name: props.currUser.name,
    photoURL: props.currUser?.photoURL,
  };

  useEffect(() => {
   
    if (jioData) {
      dispatch({ type: "SET", value: { ...jioData.data, id: jioData.id } });
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => removeJio(jioData.id)}>
            <Text style={{ color: "red", marginRight: 5 }}>Delete</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [props.route.params?.jioData]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        setGalleryPermission(status === "granted");
      }
    })();
  }, []);

  const changeDateTime = (event, selectedDate) => {
    const currDate = selectedDate || jioState.time;
    //moment(selectedDate).add(8, 'hours').toDate()
    setJioState(currDate, "time");
    setDate(false);
    setTime(false);
  };

  const removeJio = async (id) => {
    const storageRef = firebase.storage().refFromURL(jioState.img);

    storageRef.delete().then(() => console.log('success')).catch(err => console.log(err))

    firebase
      .firestore()
      .collection("jios")
      .doc(id)
      .delete()
      .then(props.navigation.navigate("Main"));
  };

  const setJioState = (value, input) => {
    dispatch({ type: "UPDATE", value, input });
  };

  const setPhoto = () => {
    if (galleryPermission) {
      openPicker();
    } else {
      Alert.alert("no access to gallery!");
    }
  };

  const openPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setJioState(result.uri, "img");
    }
  };

  const updateAndSubmit = async () => {

    if (jioState.img && jioState.img.indexOf('firebase') === -1) {
      console.log('ye')
      const res = await fetch(jioState.img);
      const blob = await res.blob();
      const path = `jios/${
        firebase.auth().currentUser.uid
      }/${Math.random().toString(36)}`;

      const task = firebase.storage().ref().child(path).put(blob);

      const progress = (snapshot) => {
        console.log(`transferred: ${snapshot.bytesTransferred}`);
      };

      const completed = () => {
        task.snapshot.ref.getDownloadURL().then((snapshot) => {
          submitJio(snapshot);
          console.log(snapshot);
        });
      };

      const error = (snapshot) => {
        console.log(snapshot);
      };

      task.on("state_change", progress, error, completed);
    } else {
      console.log('no')
       submitJio(jioState?.img || null)
     }
  };

  const submitJio = async (snapshot) => {

    const created = firebase.firestore.FieldValue.serverTimestamp();
    const ref = await firebase.firestore().collection("jios");
    if (jioData) {
      ref
        .doc(jioState.id)
        .update({
          ...jioState,
          creation: created,
          img: snapshot
        })
        .then(props.navigation.navigate("Main"));
    } else {
      ref
        .add({
          ...jioState,
          user: firebase.auth().currentUser.uid,
          creation: created,
          likes: [user],
          img: snapshot
        })
        .then(props.navigation.navigate("Main"));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{
        flex: 1,
        width: "100%",
      }}
    >
      <ScrollView>
        <View style={styles.container}>
          {jioState.img ? (
            <TouchableOpacity
              style={styles.addImage}
              onPress={() => setPhoto()}
            >
              <Image
                source={{ uri: jioState.img }}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addImage}
              onPress={() => setPhoto()}
            >
              <Ionicons name="camera-outline" size={18} color="blue" />
              <Text style={{ fontSize: 15 }}> Add Image (optional)</Text>
            </TouchableOpacity>
          )}

          <View style={{ flex: 1, width: "90%", marginVertical: 10 }}>
            <View style={styles.formItem}>
              <Text style={styles.labels}>Workout Name</Text>
              <TextInput
                value={jioState.name}
                onChangeText={(text) => setJioState(text, "name")}
                placeholder="Title"
                textContentType="name"
              />
              <Divider />
            </View>
            <View style={styles.formItem}>
              <Text style={styles.labels}>Location</Text>
              {Platform.OS === "ios" && (
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    value={jioState?.location.title || "Choose Location"}
                    onChangeText={(text) => setJioState(text, "location")}
                    placeholder="Choose Location"
                    textContentType="location"
                    editable={false}
                    style={{ width: "90%" }}
                  ></TextInput>

                  <TouchableOpacity
                    onPress={() => setLocation(!showLocations)}
                    style={{ width: "10%" }}
                  >
                    <MaterialCommunityIcons name="menu-down" size={23} />
                  </TouchableOpacity>
                </View>
              )}

              {(Platform.OS === "android" || showLocations) && (
                <Picker
                  selectedValue={jioState?.location}
                  enabled={true}
                  onValueChange={(itemValue, itemIndex) => {
                    setJioState(itemValue, "location");
                  }}
                  style={Platform.OS === "android" && { height: 50 }}
                >
                  {presetLocations.map((loc) => (
                    <Picker.Item label={loc.title} value={loc} />
                  ))}
                </Picker>
              )}
              <Divider />
            </View>
            <View style={styles.dateTimePicker}>
              <View style={[styles.formItem, { width: "50%" }]}>
                <Text style={styles.labels}>Date</Text>

                {Platform.OS === "android" && (
                  <TouchableOpacity
                    onPress={() => setDate(!showDate)}
                    style={{ width: "80%" }}
                  >
                    <Text>{moment(jioState?.time).format("MMM D, YYYY")}</Text>
                  </TouchableOpacity>
                )}

                {(Platform.OS !== "android" || showDate) && (
                  <DateTimePicker
                    value={jioState?.time || new Date()}
                    mode="date"
                    display="default"
                    is24Hour={true}
                    onChange={changeDateTime}
                  />
                )}
              </View>
              <View style={[styles.formItem, { width: "50%" }]}>
                <Text style={styles.labels}>Time</Text>
                {Platform.OS === "android" && (
                  <TouchableOpacity
                    onPress={() => setTime(!showTime)}
                    style={{ width: "80%" }}
                  >
                    <Text>{moment(jioState?.time).format("h:mm a")}</Text>
                  </TouchableOpacity>
                )}
                {(Platform.OS !== "android" || showTime) && (
                  <RNDateTimePicker
                    value={jioState?.time || new Date()}
                    mode="time"
                    display="default"
                    is24Hour={true}
                    onChange={changeDateTime}
                  />
                )}
              </View>
            </View>
            <Divider />

            <View style={styles.formItem}>
              <Text style={styles.labels}>Estimated Time</Text>
              <TextInput
                value={jioState.duration}
                onChangeText={(text) => setJioState(text, "duration")}
                placeholder="Duration"
              />
              <Divider />
            </View>
            <View style={styles.formItem}>
              <Text style={styles.labels}>Description</Text>
              <TextInput
                value={jioState.description}
                onChangeText={(text) => setJioState(text, "description")}
                placeholder="Description"
                multiline={true}
              />
              <Divider />
            </View>
            <Text style={styles.labels}>Workout Type</Text>
            <RadioButton.Group
              onValueChange={(value) => setJioState(value, "type")}
              value={jioState.type}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ width: "20%" }}>Static</Text>
                <RadioButton value="Static" />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ width: "20%" }}>Run</Text>
                <RadioButton value="Run" uncheckedColor="black" />
              </View>
            </RadioButton.Group>
            <Divider />
            {jioState.type === "Run" && (
              <View style={styles.formItem}>
                <Text style={styles.labels}>Additional Run Details</Text>
                <TextInput
                  onChangeText={(text) => setJioState(text, "details")}
                  placeholder="Description"
                  multiline={true}
                />
                <Divider />
              </View>
            )}
            <TouchableOpacity
              style={styles.bottomButtonContainer}
              onPress={() =>
                jioState.type === "Run"
                  ? updateAndSubmit()
                  : props.navigation.navigate("Details", {
                      jioState,
                      user: user,
                    })
              }
            >
              {jioState.type === "Run" ? (
                <>
                  <Ionicons name="add" color="blue" size={18} />
                  <Text style={styles.bottomButton}>Run</Text>
                </>
              ) : (
                <>
                  <Text style={styles.bottomButton}>{jioData && 'Edit'} Workout Details</Text>
                  <Ionicons name="arrow-forward" size={17} color="blue" />

                </>
              )}
            </TouchableOpacity>
            {jioData && jioState.type !== "Run" && <TouchableOpacity onPress={() => updateAndSubmit()}><Text style={styles.bottomButton}>Save</Text></TouchableOpacity>}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (store) => ({
  currUser: store.user.currentUser,
});

export default connect(mapStateToProps, null)(JioStart);
