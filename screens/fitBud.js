import React, { useState, useEffect } from "react";
import { getWorkouts } from "../Api/workoutApi";
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import HistoryBar from "../components/fitBudComponents/historyBar";
import FitBudSuggests from "../components/fitBudComponents/fitBudSuggests";
import WorkoutSearch from "../components/fitBudComponents/workoutSearch";
import { connect } from "react-redux";
import Spinner from "../components/Spinner";
import { getUserHistory } from "../store/actions/user";
import { Divider } from "react-native-elements";


 function FitBud(props) {
  const [history, setHistory] = useState(null);
  const [runs, setRuns] = useState(null)
  const [workouts, setWorkouts] = useState([]);
  const [user, setUser] = useState(null)

  // get history of user
  useEffect(() => {
    setHistory(props.history)
    setUser(props.currentUser)
    setRuns(props.runs)
  }, [props.currentUser, props.history]);

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

  

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f2f2f2" }}
      scrollEnabled={true}
    >
      <View style={{ marginTop: 5, marginBottom: 10 }}>
        <WorkoutSearch navigation={props.navigation} workouts={workouts} />
      </View>
      <Divider width={1} style={{marginVertical: 10}}/>
      
      <Text style={styles.headers}>Try something New!</Text>
      <FitBudSuggests navigation={props.navigation} />
      <Divider width={1} style={{marginVertical: 10}}/>
      <Text style={styles.headers}>Do it again!</Text>
      <SafeAreaView style={{marginBottom: 20}}>
        {history ? <HistoryBar navigation={props.navigation} hist={history} runs={runs} /> : <Spinner/>}
      </SafeAreaView>
    </ScrollView>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.user.currentUser,
  history: store.history.workouts,
  runs: store.history.runs,
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
