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
import WorkoutSearch from "../components/fitBudComponents/workoutSearch";
import ExListItem from "../components/detailsComponents/ExListItem";
import { getWorkouts } from "../Api/workoutApi";
import { Divider } from "react-native-paper";
import firebase from "firebase";

const JioDetails = (props) => {
  const [workouts, setWorkouts] = useState([]);
  const [info, setInfo] = useState({});
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchWorkouts = getWorkouts().onSnapshot((querySnapshot) => {
      const workouts = [];
      querySnapshot.forEach((documentSnapshot) => {
        workouts.push({
          data: documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setInfo(props.route.params?.info);
      setWorkouts(workouts);
    });

    if (props.route.params?.exercises) {
      setDetails(props.route.params?.exercises);
    }
    return fetchWorkouts;
  }, [props.route.params?.info, props.route.params?.exercises]);

  const submitJio = async () => {
    firebase
      .firestore()
      .collection("jios")
      .add({
        ...info,
        details,
        user: firebase.auth().currentUser.uid,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
        likes: [],
      }).then(props.navigation.navigate('Main'));
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        marginVertical: 12,
      }}
    >
      <ScrollView style={{height: '90%'}}>
        <WorkoutSearch
          navigation={props.navigation}
          workouts={workouts}
          jio={true}
        />
        <Divider style={{marginVertical: 15}}/>
        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", marginBottom: 12 }}>
          Exercise Sets
        </Text>
        <FlatList
          data={details}
          keyExtractor={(item) => item.key}
          renderItem={ExListItem}
          scrollEnabled={false}
        />
        </ScrollView>
        {details && (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => submitJio()}
          >
            <Ionicons name="add" color="blue" size={18} />
            <Text
              style={{
                alignSelf: "center",
                marginVertical: 15,
                fontSize: 16,
                fontWeight: "bold",
                color: "blue",
                marginLeft: 5,
              }}
            >
              Add Jio
            </Text>
          </TouchableOpacity>
        )}
        {/* <View style={{flex: 1, alignItems: 'center',}}>
        <Text style={{ textAlign: "center", marginTop: 20, fontSize: 16 }}>
          Or
        </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate()}>
          <Text
            style={{
              alignSelf: "center",
              marginVertical: 15,
              fontSize: 17,
              fontWeight: "bold",
              color: "blue",
            }}
          >
            Create Custom Workout
          </Text>
        </TouchableOpacity>
      </View> */}
      
    </View>
  );
};

export default JioDetails;

const styles = StyleSheet.create({});
