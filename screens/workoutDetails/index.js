import React, { useLayoutEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Button,
  Alert,
} from "react-native";
import { timestampToDate } from "../../helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import ExListItem from "../../components/detailsComponents/ExListItem";
import firebase from "firebase";
import { styles } from "./styles";


function WorkoutDetails(props) {
  const duration = props.route.params.workout.duration;
  const workout = props.route.params.workout;
  const date = props.route.params.workout?.date
    ? props.route.params.workout?.date
    : null;
  const achievements = props.route.params.workout.achievements
    ? props.route.params.workout.achievements
    : 0;
  const id = props.route.params?.id ? props.route.params?.id : "";
  const jio = props.route.params?.jio;

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () =>
        date && <Button title="Delete" color="red" onPress={deleteWorkout} />,
    });
  }, []);

  const del = (id) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("history")
      .doc(id)
      .delete();
    props.navigation.goBack();
  };

  const deleteWorkout = () => {
    Alert.alert("Confirm Delete?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          del(id);
        },
      },
    ]);
  };

  const formatExercises = () => {
    return workout?.exercises.map((exercise) => ({
      ...exercise,
      sets: exercise.sets.map((set) => ({
        ...set,
        completed: false,
      })),
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.scroll}>
        {workout.imageURL !== "" && (
          <Image source={{ uri: workout.imageURL }} style={styles.image} />
        )}
        <View style={styles.top}>
          <Text style={styles.title}>
            {workout.name ? workout.name : "Custom Workout"}
          </Text>
          {date && <Text>{timestampToDate(date.seconds)}</Text>}
        </View>
        <View>
          <Text
            style={[
              { paddingTop: 5, marginHorizontal: 10, fontWeight: "bold" },
            ]}
          >
            Description
          </Text>
          <Text style={styles.body}>
            {workout?.description ? workout?.description : ""}
          </Text>
        </View>
        <View style={styles.statbar}>
          <View style={styles.statbox}>
            <MaterialCommunityIcons name="timer" size={17} color="red" />
            <Text>{date ? "" : "Expected"} Duration</Text>
            <Text style={{ fontWeight: "bold" }}>
              {Math.round(duration / 60) + ":" + Math.round(duration % 60)}
            </Text>
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
              {workout.exercises
                ? workout?.exercises
                    .map((exercise) => exercise.sets.length)
                    .reduce((x, y) => x + y, 0)
                : "0"}
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

        {workout.exercises && (
          <View style={{ marginBottom: 60 }}>
            <FlatList
              data={workout?.exercises}
              keyExtractor={(item) => item.key}
              renderItem={ExListItem}
              scrollEnabled={false}
            />
          </View>
        )}
        </View>
      </ScrollView>
      {workout.exercises && (
        <TouchableOpacity
          onPress={() =>
            jio
              ? props.navigation.navigate("Details", {
                  exercises: workout?.exercises,
                })
              : props.navigation.navigate("Start Workout", {
                  screen: "Start Workout",
                  params: {
                    template: {
                      ...workout,
                      exercises: formatExercises(),
                    },
                  },
                })
          }
          style={styles.start}
        >
          <Text>{jio ? "Add to Jio" : "Begin Workout"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default WorkoutDetails;
