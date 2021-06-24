import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  StyleSheet,
} from "react-native";
import MapView from "react-native-maps";


import { getWorkouts } from "../../Api/workoutApi";

const FitBudSuggests = ({ navigation }) => {
  const [workout, setWorkout] = useState({});
  const [loading, setLoading] = useState(true);
  var presetLocations = [
    {
      latlng: {
        latitude: 1.3050038005230384,
        longitude: 103.77226573268865,
      },
      title: "UTown Gym",
      description:
        "Monday to Friday 0700hr to 2200hr. Weekends and Public Holidays 0700hr to 2200hr",
      index: 0,
    },
    {
      latlng: {
        latitude: 1.3007140063983416,
        longitude: 103.77576209191275,
      },
      title: "MPSH3 Gym",
      description:
        "Monday to Friday 1100hr to 2000hr. Weekends and Public Holidays CLOSED",
      index: 1,
    },
    {
      latlng: {
        latitude: 1.2998962556887896,
        longitude: 103.77541237391264,
      },
      title: "USC Gym",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 2,
    },
    {
      latlng: {
        latitude: 1.3188077583479827,
        longitude: 103.8172019198111,
      },
      title: "Bukit Timah Gym",
      description:
        "Monday to Friday 0730hr to 2100hr. Saturday 0730hr to 1700hr. Sunday and Public Holidays CLOSED (For BTC students and staff only)",
      index: 3,
    },
    {
      latlng: {
        latitude: 1.3051644416156996,
        longitude: 103.7723855448247,
      },
      title: "Stephen Riady Centre Swimming Pool",
      description:
        "Monday to Friday 0730hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 4,
    },
    {
      latlng: {
        latitude: 1.2998052316015167,
        longitude: 103.7755360652127,
      },
      title: "USC Swimming Pool",
      description:
        "Monday to Friday 0730hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 5,
    },
    {
      latlng: {
        latitude: 1.298764029536889,
        longitude: 103.77723916069229,
      },
      title: "USC Tennis Courts",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 6,
    },
    {
      latlng: {
        latitude: 1.2996399288887228,
        longitude: 103.77724379907713,
      },
      title: "USC Handball Courts",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 7,
    },
    {
      latlng: {
        latitude: 1.3000892337791696,
        longitude: 103.77703316792304,
      },
      title: "USC Basketball Courts",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 8,
    },
    {
      latlng: {
        latitude: 1.3003979554453948,
        longitude: 103.77699207744575,
      },
      title: "USC Archery/volleyball Courts",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 9,
    },
    {
      latlng: {
        latitude: 1.300582887527544,
        longitude: 103.77598976447635,
      },
      title: "USC Table Tennis Tables",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 10,
    },
    {
      latlng: {
        latitude: 1.2999029382834928,
        longitude: 103.77525532694317,
      },
      title: "USC Squash Courts",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 11,
    },
    {
      latlng: {
        latitude: 1.300432226076777,
        longitude: 103.77610168353331,
      },
      title: "USC Badminton Courts",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 12,
    },
    {
      latlng: {
        latitude: 1.3051974804152258,
        longitude: 103.77192223464816,
      },
      title: "UTown MPH",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 13,
    },
    {
      latlng: {
        latitude: 1.3049399787896439,
        longitude: 103.77313671368337,
      },
      title: "UTown Green",
      description: "24/7 ig .-.",
      index: 14,
    },
    {
      latlng: {
        latitude: 1.298684969725457,
        longitude: 103.77834249029279,
      },
      title: "USC Track and Field",
      description: "Requires booking",
      index: 15,
    },
  ];

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
          onPress={() => navigation.navigate("Map")}
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
            mapType="hybrid"
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
