import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import WorkoutSearch from "../../../components/fitBudComponents/workoutSearch";
import ExListItem from "../../../components/detailsComponents/ExListItem";
import { Divider } from "react-native-paper";
import { getWorkouts } from "../../../helpers";
import firebase from "firebase";
import { styles } from "./styles";
import { connect } from "react-redux";

const JioDetails = (props) => {
  const [workouts, setWorkouts] = useState([]);
  const [info, setInfo] = useState({});
  const [details, setDetails] = useState(null);
  const [templates, setTemplates] = useState([])

  useEffect(() => {
    setTemplates(props.templates);
    setInfo(props.route.params?.jioState);
    const fetchWorkouts = getWorkouts().onSnapshot((querySnapshot) => {
      const results = [];
      querySnapshot.docs.forEach((documentSnapshot) => {
        results.push({
          data: documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setWorkouts(results);
    });

    if (props.route.params?.exercises) {
      setDetails(props.route.params?.exercises);
    } else if (props.route.params?.jioState?.details) {
      setDetails(props.route.params?.jioState?.details);
    }
    return fetchWorkouts;
  }, [props.route.params?.jioState, props.route.params?.exercises, props.templates]);

  const updateAndSubmit = async () => {
    console.log(info.img)
    if (info.img && info.img.indexOf('firebase') === -1) {
      console.log("ye");
      const res = await fetch(info.img);
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
        });
      };

      const error = (snapshot) => {
        console.log(snapshot);
      };

      task.on("state_change", progress, error, completed);
    } else {
      submitJio(info?.img || null)
    }
  };

  const submitJio = async (snapshot) => {
    const created = firebase.firestore.FieldValue.serverTimestamp();
    if (props.route.params.jioState?.id) {
      firebase
        .firestore()
        .collection("jios")
        .doc(info.id)
        .set({
          ...info,
          creation: created,
          details: details,
          img: snapshot,
        })
        .then(props.navigation.navigate("Main"));
    } else {
      firebase
        .firestore()
        .collection("jios")
        .add({
          ...info,
          details,
          user: firebase.auth().currentUser.uid,
          creation: created,
          img: snapshot,
          likes: [props.route.params?.user],
        })
        .then(props.navigation.navigate("Main"));
    }
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        marginVertical: 12,
      }}
    >
      <ScrollView style={{ height: "90%" }}>
        <WorkoutSearch
          navigation={props.navigation}
          workouts={workouts.concat(templates)}
          jio={true}
        />
        <Divider style={{ marginVertical: 15 }} />
        <Text style={styles.setsTitle}>Exercise Sets</Text>
        <FlatList
          data={details}
          keyExtractor={(item) => item.key}
          renderItem={ExListItem}
          scrollEnabled={false}
        />
      </ScrollView>
      {details && (
        <TouchableOpacity style={styles.addButton} onPress={() => updateAndSubmit()}>
          <Ionicons name="add" color="blue" size={18} />
          <Text style={styles.addButtonText}>Add Jio</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const mapStateToProps = (store) => ({
  templates: store.templates.templates
})

export default connect(mapStateToProps, null)(JioDetails);
