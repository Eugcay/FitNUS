import React, { useState, useEffect } from "react";
import { addToHistory, getUser, getUserHistory } from "../Api/userApi";
import { getWorkouts } from "../Api/workoutApi";
import { logout } from "../Api/authApi";
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import firebase from "firebase";
import HeaderTitle from "../components/fitBudComponents/header";
import HistoryBar from "../components/fitBudComponents/historyBar";
import MenuButton from "../components/fitBudComponents/menuButton";
import FitBudSuggests from "../components/fitBudComponents/fitBudSuggests";
import WorkoutSearch from "../components/fitBudComponents/workoutSearch";

export default function FitBud({ navigation }) {
  const [history, setHistory] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  // get user

  // get history of user
  useEffect(() => {
    const getHistory = async () => {
      setLoading(true);
      const hist = await getUserHistory()
        .get()
        .then((snapshot) => {
          const hist = [];
          snapshot.docs.forEach((doc) =>
            doc
              .data()
              .workoutRef.get()
              .then((snap) =>
                hist.push({
                  id: doc.id,
                  date: doc.data().date,
                  workout: snap.data(),
                })
              )
          );
          return hist;
        })
        .then((hist) => setHistory(hist))
        .then(() => console.log(history))
        .catch((error) => error);
        
    };
    
    getHistory();

    
  }, []);

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

  const addWorkout = (workout) => {
    addToHistory(workout.id);
    getUser().set({});
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f2f2f2" }}
    scrollEnabled={true}>
      <Text style={styles.headers}>Workout History!</Text>
      
        <SafeAreaView>
          {history && <HistoryBar navigation={navigation} hist={history} />}
        </SafeAreaView>
      
      <View style={styles.divider}></View>
      <Text style={styles.headers}>Try something New!</Text>
      <FitBudSuggests navigation={navigation} />
      <Text style={styles.headers}>Find a Workout</Text>
      
      <WorkoutSearch navigation={navigation} workouts={workouts}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headers: {
    fontSize: 20,
    paddingHorizontal: 15,
    marginVertical: 10
  },

  divider: {
    width: "100%",
    marginVertical: 10,
    borderBottomColor: "#A0A0A0",
    borderBottomWidth: 1,
    alignSelf: 'center'
  }


});
