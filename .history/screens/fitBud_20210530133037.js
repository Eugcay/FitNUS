import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import firebase from "firebase";
import { getUser } from "../Api/userApi";
import { getWorkouts } from "../Api/workoutApi";
import {logout} from '../Api/authApi'
// import HeaderTitle from "./pages/fitBudComponents/header";
// import HistoryBar from "./pages/fitBudComponents/historyBar";
// import MenuButton from "./pages/fitBudComponents/menuButton";
// import FitBudSuggests from "./pages/fitBudComponents/fitBudSuggests";
// import WorkoutSearch from "./pages/fitBudComponents/workoutSearch";
// import WorkoutSearchButton from "./pages/fitBudComponents/workoutSearchButton";

export default function FitBud({ navigation }) {
  const [history, setHistory] = useState([])
  const [workouts, setWorkouts] = useState(null)

  const getHistory = async () => {
    try {
      const user = await getUser()
      setHistory(hist)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchWorkouts = async () => {
    try {
      const res = await getWorkouts()
      setWorkouts(res)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getHistory = getUser().onSnapshot(snapshot => setHistory(
      snapshot.docs.map(doc => {
        id: doc.id,

      })
    ))
    fetchWorkouts()
  }, [])

  const onLogout = () => {
    logout()
  };

  return (
    <>
      <View>
        <Text>FitBud</Text>
      </View>
      <Button title="Logout" onPress={() => onLogout()} />
    </>
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
