import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import firebase from "firebase";
import { getUser } from "../Api/userApi";
import { getWorkouts } from "../Api/workoutApi";
// import HeaderTitle from "./pages/fitBudComponents/header";
// import HistoryBar from "./pages/fitBudComponents/historyBar";
// import MenuButton from "./pages/fitBudComponents/menuButton";
// import FitBudSuggests from "./pages/fitBudComponents/fitBudSuggests";
// import WorkoutSearch from "./pages/fitBudComponents/workoutSearch";
// import WorkoutSearchButton from "./pages/fitBudComponents/workoutSearchButton";

export default function FitBud({ navigation }) {
  const [history, setHistory] = useState(null)
  const [workouts, setWorkouts] = useState(null)

  const getHistory = async () => {
    try {
      const user = await getUser()
      const hist = user.history
      setHistory(hist)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchWorkouts = () => {
    try {
      const res = await getWorkouts()
      setWorkouts(res)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getHistory()
    fetchWorkouts()
  }, [])

  const onLogout = () => {
    firebase.auth().signOut();
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
