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
import WorkoutSearch from "../../components/fitBudComponents/workoutSearch";
import ExListItem from "../../components/detailsComponents/ExListItem";
import { Divider } from "react-native-paper";
import firebase from "firebase";
import { styles } from "./styles";

const JioDetails = (props) => {
  const [workouts, setWorkouts] = useState([]);
  const [info, setInfo] = useState({});
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchWorkouts = firebase
      .firestore()
      .collection("Workouts")
      .onSnapshot((querySnapshot) => {
        const workouts = [];
        querySnapshot.forEach((documentSnapshot) => {
          workouts.push({
            data: documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setInfo(props.route.params?.jioState);
        setWorkouts(workouts);
      });

    if (props.route.params?.exercises) {
      setDetails(props.route.params?.exercises);
    } else if (props.route.params?.jioState?.details) {
      setDetails(props.route.params?.jioState?.details);
    }
    return fetchWorkouts;
  }, [props.route.params?.jioState, props.route.params?.exercises]);

  const submitJio = async () => {
    const created = firebase.firestore.FieldValue.serverTimestamp()
    if (props.route.params.jioState?.details) {
      firebase
        .firestore()
        .collection("jios")
        .doc(info.id)
        .set({
          ...info,
          creation: created,
          details: details,
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
          workouts={workouts}
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
        <TouchableOpacity style={styles.addButton} onPress={() => submitJio()}>
          <Ionicons name="add" color="blue" size={18} />
          <Text style={styles.addButtonText}>Add Jio</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default JioDetails;
