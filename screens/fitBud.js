import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import firebase from "firebase";
import { addToHistory, getUser, getUserHistory } from "../Api/userApi";
import { getWorkoutById, getWorkouts } from "../Api/workoutApi";
import { logout } from "../Api/authApi";
import React from "react";
import { StyleSheet, View, Text, Button, SafeAreaView } from "react-native";
import firebase from "firebase";
import HeaderTitle from "../components/fitBudComponents/header";
import HistoryBar from "../components/fitBudComponents/historyBar";
import MenuButton from "../components/fitBudComponents/menuButton";
import FitBudSuggests from "../components/fitBudComponents/fitBudSuggests";
import WorkoutSearch from "../components/fitBudComponents/workoutSearch";

export default function FitBud({ navigation }) {
  const [history, setHistory] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  

  // get user

  // get history of user
  useEffect(() => {
    const getHistory = async () => {
      const hist = await getUserHistory()
        .get()
        .then((snapshot) => {
            const hist = []
            snapshot.docs.forEach((doc) =>
              doc
                .data()
                .workoutRef.get()
                .then((snap) => hist.push({id: doc.id, date: doc.data().date, workout: snap.data()}))
            )
          return hist
        })
        .then(hist => setHistory(hist))
        .catch((error) => error);
      console.log(history);
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
    addToHistory(workout.id)
    getUser().set({
      
    })
  };

  const onLogout = () => {
    logout();
  };

  return (
    <View>
      <HeaderTitle />
      <MenuButton />
      <SafeAreaView>
        <HistoryBar />
      </SafeAreaView> 
      <FitBudSuggests />
      <WorkoutSearch />
    </ View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
});
