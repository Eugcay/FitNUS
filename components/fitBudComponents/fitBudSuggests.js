import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  StyleSheet,
} from "react-native";
import MapView from "react-native-maps";
import { Card } from "react-native-paper";

import { getWorkouts } from "../../Api/workoutApi";

const FitBudSuggests = ({ navigation }) => {
  const title = "Fit-Bud Suggests:";

  const [workout, setWorkout] = useState({});
  const [loading, setLoading] = useState(true);

  const options = [
    {
      source: workout.data?.imageURL
        ? { uri: workout.data.imageURL }
        : require("../../assets/suggestionSample.jpeg"),
      
    },
  ];

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
    <View style={{ flex: 1, flexDirection: "column" }}>
      <TouchableOpacity
        style={styles.image}
        onPress={() => navigation.navigate("Maps")}
      >
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 1.2966,
            longitude: 103.7764,
            latitudeDelta: 0.045,
            longitudeDelta: 0.02,
          }}
          provider="google"
          showsUserLocation={true}
          showsCompass={true}
        ></MapView>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          !loading &&
          navigation.navigate("Workout Details", {
            workout: workout.data,
            date: null,
          })
        }
      >
        <ImageBackground
          source={
            workout.data?.imageURL
              ? { uri: workout.data.imageURL }
              : require("../../assets/suggestionSample.jpeg")
          }
          imageStyle={{ borderRadius: 15 }}
          style={styles.image}
          blurRadius={5}
        >
          <Text style={styles.text}>{!loading && workout.data.name}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default FitBudSuggests;

const styles = StyleSheet.create({
  containter: {
    borderRadius: 15,
    marginBottom: 10,
  },

  image: {
    flex: 1,
    height: 180,
    backgroundColor: "black",
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "stretch",
    borderRadius: 15,

    // alignSelf: "center",
    // justifyContent: "center",
  },

  text: {
    color: "white",
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "#000000a0",
    shadowOpacity: 0.8,
    alignSelf: "center",
    borderRadius: 20,
  },

  map: {
    height: "100%",
    borderRadius: 15,
  },
});
