import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  View,
  StyleSheet,
} from "react-native";
import { Card } from "react-native-paper";
import { getWorkouts } from "../../Api/workoutApi";

const FitBudSuggests = ({ navigation }) => {
  const title = "Fit-Bud Suggests:";
  let onPress = () => alert("pressmemememe");
  const [workout, setWorkout] = useState({});
  const [loading, setLoading] = useState(true);

  // suggestion = () => (
  //     //get workout object from database
  //     <View>
  //       <Text>History has not been made</Text>
  //     </View>
  // );
  // get workouts
  useEffect(() => {
    const fetchWorkouts = getWorkouts()
      .limit(3)
      .onSnapshot((querySnapshot) => {
        const workouts = [];
        querySnapshot.forEach((documentSnapshot) => {
          workouts.push({
            data: documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        const rand = Math.floor(Math.random() * 3);
        const suggestion = workouts[rand];
        setWorkout(suggestion);
        console.log(workout);
        setLoading(false);
      });

    return fetchWorkouts;
  }, []);

  //   <ImageBackground
  //         source={require("../../assets/suggestionSample.jpeg")}
  //         style={styles.image}
  //         blurRadius={5}
  //       >
  // </ImageBackground>

  return (
    <TouchableOpacity onPress={() => !loading && navigation.navigate("Workout Details", { workout: workout.data, date: null })} >
      <ImageBackground
        source={require("../../assets/suggestionSample.jpeg")}
        imageStyle={{ borderRadius: 15 }}
        style={styles.image}
        blurRadius={5}
      >
        
          <Text style={styles.text}>{!loading && workout.data.name}</Text>
       
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default FitBudSuggests;

const styles = StyleSheet.create({
    
    containter: {
        borderRadius: 15,
        marginBottom: 10
    },

  
  image: {
    flex: 1, 
    height: 220,
    backgroundColor: "black",
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "stretch",
    borderRadius: 15,

    // width: "90%",
    // height: "60%",
    // alignSelf: "center",
    // justifyContent: "center",
  },

  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
    alignSelf: "center",
    borderRadius: 20
  },
});
