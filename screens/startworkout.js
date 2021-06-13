import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";

import HeaderTop from "../components/startWorkoutComponents/headerTop";

const StartWorkout = ({ navigation, route }) => {
  const [exercises, setExercises] = useState([]);

  const clearWorkout = () => {
    setExercises([]);
    console.log(exercises)
  };

  const renderItem = ({ item }) => {
    return (
    <View>
     <Text>{item.data.name}</Text> 
    </View>
    )
  }

  useEffect(() => {
    if (route.params?.exercises) {
      setExercises(exercises.concat(route.params?.exercises));
    }
    console.log(exercises);
  }, [route.params?.exercises]);

  return (
    <ScrollView scrollEnabled={true}>
      <HeaderTop />
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Map")}>
          <Text>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Add Exercises")}>
          <Text>Add exercises</Text>
        </TouchableOpacity>
        <FlatList />
        <TouchableOpacity onPress={clearWorkout}>
          <Text>Clear Workout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default StartWorkout;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "contain",
    alignItems: "center",
  },

  bottom: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
  },

  caption: {
    color: "white",
    fontSize: 40,
    backgroundColor: "#000000a0",
  },

  content: {
    color: "white",
    fontSize: 20,
    backgroundColor: "#000000a0",
    marginBottom: 20,
  },

  join: {
    marginBottom: 40,
    width: "80%",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },

  buttonSurrounding: {
    width: "100%",
    backgroundColor: "#000000a0",
    alignItems: "center",
  },
});
