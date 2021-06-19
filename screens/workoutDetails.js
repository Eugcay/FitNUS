import React, { useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  touchableOpacity,
  FlatList,
} from "react-native";
import { timestampToDate } from "../helpers";
import { ListItem } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { set } from "react-native-reanimated";

export default function WorkoutDetails({ route, navigation }) {
  const duration = route.params.duration;
  const workout = route.params.workout;
  const date = route.params.date;
  const achievements = route.params.achievements
    ? route.params.achievements
    : 0;


  const renderItem = ({ item }) => {
    return (
      <ListItem style={{ marginVertical: 5 }}>
        <ListItem.Content>
          <ListItem.Title>{item.data.name}</ListItem.Title>
          {item.sets.map((set) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <View style={styles.circle}>
                <Text>{set.key}</Text>
              </View>
              <Text>
                {set.weight} kg x {set.reps} reps
              </Text>
            </View>
          ))}
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <View style={styles.container}>
      {workout?.imageURL && (
        <Image source={{ uri: workout.imageURL }} style={styles.image} />
      )}
      <View style={styles.top}>
        <Text style={styles.title}>
          {workout.name ? workout.name : "Custom Workout"}
        </Text>
        <Text>{date ? timestampToDate(date.seconds) : ""}</Text>
      </View>
      <Text style={{paddingBottom: 10, fontWeight: 'bold'}}>Description</Text>
      <Text style={styles.body}>
        {workout?.description ? workout?.description : ""}
      </Text>
      <View style={styles.statbar}>
        <View style={styles.statbox}>
          <MaterialCommunityIcons name="timer" size={17} color="red" />
          <Text>{date ? "" : "Expected"} Duration</Text>
          <Text style={{ fontWeight: "bold" }}>{duration}</Text>
        </View>
        <Divider orientation="vertical" />
        <View style={styles.statbox}>
          <MaterialCommunityIcons
            name="format-list-bulleted-square"
            size={20}
            color="blue"
          />
          <Text>Sets</Text>
          <Text>
            {workout.exercises ? workout?.exercises
              .map((exercise) => exercise.sets.length)
              .reduce((x, y) => x + y, 0) : '0'}
          </Text>
        </View>
        <Divider orientation="vertical" />
        <View style={styles.statbox}>
          <MaterialCommunityIcons
            name="emoticon-happy-outline"
            size={20}
            color="green"
          />
          <Text>Achievements</Text>
          <Text>{achievements}</Text>
        </View>
      </View>
      {workout.exercises && <FlatList
        data={workout?.exercises}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />}
      {workout.exercises && <TouchableOpacity
        onPress={() =>
          navigation.navigate("Start Workout", {
            exercises: workout?.exercises.map((exercise) => ({
              ...exercise,
              sets: exercise.sets.map((set) => ({ ...set, completed: false })),
            })),
          })
        }
        style={styles.start}
      >
        <Text>Begin Workout</Text>
      </TouchableOpacity>}
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

  circle: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    marginHorizontal: 12,
    width: 30,
    height: 30,
    borderRadius: 50,
  },

  statbar: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    borderTopColor: "#C0C0C0",
    borderBottomColor: "#C0C0C0",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  statbox: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },

  start: {
    backgroundColor: "lightgreen",
    marginBottom: 10,
    width: "94%",
    alignSelf: "center",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
