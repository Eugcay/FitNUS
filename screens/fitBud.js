import React, { useState, useEffect } from "react";
import { getWorkouts } from "../Api/workoutApi";
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import firebase from "firebase";
import HistoryBar from "../components/fitBudComponents/historyBar";
import FitBudSuggests from "../components/fitBudComponents/fitBudSuggests";
import WorkoutSearch from "../components/fitBudComponents/workoutSearch";
import { connect } from "react-redux";

 function FitBud(props) {
  const [history, setHistory] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [user, setUser] = useState(null)


  // get history of user
  useEffect(() => {
    setHistory(props.history)
    setUser(props.user)
    console.log(history)
  }, [props.user, props.history]);

  // get workouts
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
    });

    return fetchWorkouts;
  }, []);

  // const addWorkout = (workout) => {
  //   addToHistory(workout.id);
  //   getUser().set({});
  // };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f2f2f2" }}
      scrollEnabled={true}
    >
      <Text style={styles.headers}>Workout History!</Text>

      <SafeAreaView>
        {history && <HistoryBar navigation={props.navigation} hist={history} />}
      </SafeAreaView>

      <View style={styles.divider}></View>
      <Text style={styles.headers}>Try something New!</Text>
      <FitBudSuggests navigation={props.navigation} />
      <View style={{ marginVertical: 20 }}>
        <Text style={styles.headers}>Find a Workout</Text>
        <WorkoutSearch navigation={props.navigation} workouts={workouts} />
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.user.currentUser,
  history: store.user.history
})

export default connect(mapStateToProps, null)(FitBud)



const styles = StyleSheet.create({
  headers: {
    fontSize: 20,
    paddingHorizontal: 15,
  },

  divider: {
    width: "100%",
    marginVertical: 10,
    borderBottomColor: "#A0A0A0",
    borderBottomWidth: 1,
    alignSelf: "center",
  },
});
