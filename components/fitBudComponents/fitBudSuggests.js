import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  StyleSheet,
} from "react-native";
import MapView from "react-native-maps";
import { presetLocations } from "../../mapConfig";


import { getWorkouts } from "../../helpers";

const FitBudSuggests = ({ navigation }) => {
  const [workout, setWorkout] = useState({});
  const [loading, setLoading] = useState(true);
  

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


  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <TouchableOpacity
        onPress={() =>
          !loading &&
          navigation.navigate("Workout Details", {
            workout: workout.data,
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
          blurRadius={6}
        >
          <Text style={styles.text}>{!loading && workout.data.name}</Text>
        </ImageBackground>
      </TouchableOpacity>
      <View style={styles.headers}>
        <Text style={{ width: "52%", marginLeft: 5 }}>Find a Spot</Text>
        <Text>Quick Start</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={[styles.image, { width: "48%" }]}
          onPress={() => navigation.navigate("Front Map")}
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
            onPress={() => navigation.navigate("Front Map")}
          >
            {presetLocations.map((marker) => (
              <MapView.Marker
                key={marker.index}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
              />
            ))}
          </MapView>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Start Workout", { screen: 'Select Workout Type' })}
          style={[styles.image, {}]}
        >
          <Text style={styles.text}>Create Custom Workout</Text>
        </TouchableOpacity>
      </View>
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

  headers: {
    flexDirection: "row",
    marginHorizontal: 15,
  },
});