import React, { useState, useEffect } from "react";
import { getWorkouts } from "../../helpers"; 
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import HistoryBar from "../../components/fitBudComponents/historyBar";
import FitBudSuggests from "../../components/fitBudComponents/fitBudSuggests";
import WorkoutSearch from "../../components/fitBudComponents/workoutSearch";
import { connect } from "react-redux";
import Spinner from "../../components/Spinner";
import { Divider } from "react-native-elements";
import { styles } from "./styles";
import firebase from "firebase";


 function FitBud(props) {
  const [history, setHistory] = useState(null);
  const [runs, setRuns] = useState(null)
  const [workouts, setWorkouts] = useState([]);
  const [templates, setTemplates] = useState([])
  const [user, setUser] = useState(null)

  // get history of user
  useEffect(() => {
    setHistory(props.history)
    setUser(props.currentUser)
    setRuns(props.runs)
  }, [props.currentUser, props.history, props.runs]);

  // get workouts
  useEffect(() => {
    setTemplates(props.template)
    const fetchWorkouts = getWorkouts().onSnapshot((querySnapshot) => {
      const results = []
      querySnapshot.docs.forEach((documentSnapshot) => {
        results.push({
          data: documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setWorkouts(results);
    });

    return fetchWorkouts;
  }, [props.template]);

  return templates.length > 0 && (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f2f2f2" }}
      scrollEnabled={true}
    >
      <View style={{ marginTop: 5, marginBottom: 10 }}>
        <WorkoutSearch navigation={props.navigation} workouts={workouts.concat(templates)} />
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
  template: store.templates.templates
})

export default connect(mapStateToProps, null)(FitBud)


