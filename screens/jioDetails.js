import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import WorkoutSearch from "../components/fitBudComponents/workoutSearch";
import { getWorkouts } from "../Api/workoutApi";

const JioDetails = (props) => {
  const [workouts, setWorkouts] = useState([]);
  const [details, setDetails] = useState({})
  useEffect(() => {
    const fetchWorkouts = getWorkouts().onSnapshot((querySnapshot) => {
      const workouts = [];
      querySnapshot.forEach((documentSnapshot) => {
        workouts.push({
          data: documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setWorkouts(workouts);
      setDetails(props.route.params)
    });

    return fetchWorkouts;

  }, [props.route.params]);
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        marginVertical: 15,
      }}
    >
      <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>
        Workout Details
      </Text>
      <WorkoutSearch navigation={props.navigation} workouts={workouts}/>
      <View style={{flex: 1, alignItems: 'center',}}>
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
      </View>
    </View>
  );
};

export default JioDetails;

const styles = StyleSheet.create({});
