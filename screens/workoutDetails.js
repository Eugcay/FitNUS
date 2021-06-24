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
import { timestampToDate } from "../helpers";
import { ListItem } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { removeWorkout } from "../store/actions/user";

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

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () =>
        date && <Button title="Delete" color="red" onPress={deleteWorkout} />,
    });
  }, []);

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
          props.delete(id);
          props.navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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
              renderItem={renderItem}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
      {workout.exercises && (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("Start Workout", {
              screen: "Start Workout",
              params: {
                template: {
                  ...workout,
                  exercises: workout?.exercises.map((exercise) => ({
                    ...exercise,
                    sets: exercise.sets.map((set) => ({
                      ...set,
                      completed: false,
                    })),
                  })),
                },
              },
            })
          }
          style={styles.start}
        >
          <Text>Begin Workout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const mapDispatchToProps = (dispatch) => ({
  delete: (id) => dispatch(removeWorkout(id)),
});

export default connect(null, mapDispatchToProps)(WorkoutDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    width: "100%",
    height: "20%",
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
    marginVertical: 5,
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
    marginVertical: 10,
    width: "95%",
    alignSelf: "center",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
