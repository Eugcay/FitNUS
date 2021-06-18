import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  touchableOpacity,
} from "react-native";
import { timestampToDate } from "../helpers";
import firebase from "firebase";

export default function WorkoutDetails({ route, navigation }) {
  const { workout, date } = route.params;

  const images = [
    require("../assets/bg1.jpeg"),
    require("../assets/bg2.jpeg"),
    require("../assets/bg3.jpeg"),
  ];

  const img = images[Math.floor(Math.random() * images.length )]
  

  return (
    <View style={styles.container}>
      <Image
        source={workout.imageURL ? { uri: workout.imageURL } : img}
        style={styles.image}
      />
      <View style={styles.top}>
        <Text style={styles.title}>{workout.name ? workout.name : 'Custom Workout'}</Text>
        <Text>{date ? timestampToDate(date.seconds) : ""}</Text>
      </View>
      <Text style={styles.body}>{workout.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    width: "100%",
    height: "45%",
    minHeight: 250,
  },

  title: {
    fontSize: 22,
  },

  top: {
    marginVertical: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#C0C0C0",
  },

  body: {
    marginTop: 10,
    marginHorizontal: 10,
    textAlign: "justify",
  },
});
