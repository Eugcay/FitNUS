import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button,
  FlatList,
  Alert,
  Platform,
} from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { addToHistory } from "../store/actions/user";
import haversine from "haversine";
import HeaderTop from "../components/startWorkoutComponents/headerTop";
import { Stopwatch } from "react-native-stopwatch-timer";
import * as Location from "expo-location";

const StartWorkout = (props) => {
  const [name, setName] = useState("Custom Workout");
  const [description, setDescription] = useState(
    `Custom Workout on ${new Date(Date.now())}`
  );
  const [imageURL, setImageURL] = useState("");
  const [exercises, setExercises] = useState([]);
  const [replaced, setReplaced] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [pulls, setPulls] = useState(1);
  const [workoutStatus, setStatus] = useState("Not Started");
  const achievements = [];

  //Stopwatch stuff
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timeNow, setTimeNow] = useState(0);

  //Track location stuff => Calcdistance, Watch poition, Polyline
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setNewDistance] = useState(0);
  const [LocList, setLocList] = useState(0);

  const calcDistance = (prevLatLng, newLatLng) => {
    return haversine(prevLatLng, newLatLng) || 0;
  };

  //OnPress, start tracking:
  

  useEffect(() => {
    console.log("here");
    if (workoutStatus != "Not Started") {
        console.log("hi");
        async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            console.log("denieeed");
          }
          let locations = await Location.watchPositionAsync(
            {
              accuracy: Location.Accuracy.Highest,
              timeInterval: 100,
              distanceInterval: 1,
            },
            (loc) => {
              setNewDistance(
                distance + calcDistance(currentLocation, loc.coords)
              );
              setCurrentLocation(loc.coords);
            }
          );
          console.log(locations);
          setLocList(locations);
        };
      }
  }, []);

  const clearWorkout = () => {
    setExercises([]);
  };

  const deleteItem = (item) => {
    const index = exercises.indexOf(item);
    const data = [...exercises];
    data.splice(index, 1);
    setExercises(data);
  };

  const replaceItem = (item) => {
    setReplaced(item);
    props.navigation.navigate("Add Exercises", { item: item });
  };

  const editExercise = (item) => {
    setUpdating(true);
    setReplaced(item);
    props.navigation.navigate("Edit", { exercise: item });
  };

  const completedSets = (item) => {
    return item.sets.filter((content) => content.completed).length;
  };

  const updateWorkout = (item) => {
    const index = exercises.indexOf(replaced);
    const data = [...exercises];
    data.splice(index, 1, item);
    setExercises(data);
  };

  const workoutComplete = () => {
    const completed = exercises.reduce(
      (x, y) => x && (y.sets ? completedSets(y) === y.sets.length : false),
      true
    );
    return completed;
  };

  const finishWorkout = () => {
    if (workoutComplete()) {
      const workout = {
        name,
        description,
        duration: 50,
        calories: 100,
        imageURL,
        exercises,
        achievements,
      };
      props.finish(workout);
      props.navigation.navigate("Main");
    } else {
      Alert.alert("Workout incomplete!");
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => editExercise(item)}>
        <ListItem.Swipeable
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          bottomDivider={true}
          rightContent={
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => replaceItem(item)}
                style={{
                  minHeight: "100%",
                  width: "50%",
                  backgroundColor: "royalblue",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 4,
                  marginRight: 1,
                }}
              >
                <MaterialCommunityIcons
                  name="swap-horizontal"
                  size={24}
                  color="white"
                />
                <Text style={{ color: "white", fontSize: 16 }}>Replace</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteItem(item)}
                style={{
                  minHeight: "100%",
                  width: "50%",
                  backgroundColor: "red",
                  alignItems: "center",
                  borderRadius: 4,
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons name="delete" size={24} color="white" />
                <Text style={{ color: "white", fontSize: 16 }}>Delete</Text>
              </TouchableOpacity>
            </View>
          }
        >
          <View style={styles.circle}>
            <Text>{exercises.indexOf(item) + 1}</Text>
          </View>
          <ListItem.Content>
            <ListItem.Title>{item.data.name}</ListItem.Title>
            <ListItem.Subtitle>
              {item.sets
                ? `${completedSets(item)}/${item.sets.length} sets completed`
                : "0/1 sets completed"}
            </ListItem.Subtitle>
          </ListItem.Content>
          <TouchableOpacity>
            <MaterialCommunityIcons name="dots-vertical" size={23} />
          </TouchableOpacity>
        </ListItem.Swipeable>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (props.route.params?.template && pulls === 1) {
      const template = props.route.params?.template.workout;
      setExercises(template.exercises);
      setName(template.name);
      setDescription(template.description);
      setImageURL(template.imageURL);
      setPulls(pulls + 1);
    } else if (props.route.params?.exercise && updating) {
      updateWorkout(props.route.params?.exercise);
    } else if (props.route.params?.replace) {
      updateWorkout(props.route.params.exercises[0]);
    } else if (props.route.params?.exercises) {
      setExercises(
        exercises.concat(
          props.route.params?.exercises.map((content) => ({
            ...content,
            key: (content.key * pulls).toString(),
          }))
        )
      );
      setPulls(pulls + 1);
    }
    setUpdating(false);
  }, [
    props.route.params?.exercises,
    props.route.params?.exercise,
    props.route.params?.replace,
    props.route.params?.template,
  ]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <HeaderTop />
        <View style={{ alignItems: "center" }}>
          {workoutStatus == "Not Started" || workoutStatus == "Paused" ? (
            <View>
              <Stopwatch
                start={isStopwatchStart}
                //To start
                reset={false}
                //To reset
                options={options}
                //options for the styling
                getTime={(time) => {}}
              />
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#00BFFF" }]}
                onPress={() => {
                  setStatus("Continue");
                  setIsStopwatchStart(true);
                }}
              >
                <Text>Start</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Stopwatch
                start={isStopwatchStart}
                //To start
                reset={false}
                //To reset
                options={options}
                //options for the styling
                getTime={(time) => {}}
              />
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#00BFFF" }]}
                onPress={() => {
                  setStatus("Paused");
                  setIsStopwatchStart(false);
                }}
              >
                <Text>Pause</Text>
              </TouchableOpacity>
            </View>
          )}
          <Button
            title="finish"
            color="green"
            onPress={() => finishWorkout()}
          />
          {exercises.length === 0 && (
            <Text style={{ marginVertical: "60%", fontSize: 24 }}>
              Lets get Started!
            </Text>
          )}
          <View>
            <FlatList
              data={exercises}
              keyExtractor={(item) => item.key}
              renderItem={renderItem}
              style={{ marginTop: 15, height: "63%" }}
              extraData={exercises}

              // ItemSeparatorComponent={() => {
              //   return <Divider />;
              // }}
            />
          </View>
        </View>

        <View style={styles.bottombar}>
          <TouchableOpacity
            style={[styles.bottomButton, { backgroundColor: "#00BFFF" }]}
            onPress={() => props.navigation.navigate("Add Exercises")}
          >
            <Text>Add exercises</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomButton, { backgroundColor: "#F08080" }]}
            onPress={clearWorkout}
          >
            <Text>Clear Workout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const maptDispatchToProps = (dispatch) => ({
  finish: (workout) => dispatch(addToHistory(workout)),
});

export default connect(null, maptDispatchToProps)(StartWorkout);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "contain",
    alignItems: "center",
  },

  button: {
    marginHorizontal: 8,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
    borderRadius: 5,
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

  circle: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    marginHorizontal: 12,
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  bottomButton: {
    marginHorizontal: 8,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    borderRadius: 5,
  },

  bottombar: {
    flex: 1,
    position: "absolute",
    bottom: Platform.OS === "ios" ? 36 : 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: "5%",
  },
});

const options = {
  container: {
    backgroundColor: "darkblue",
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    color: "#FFF",
    marginLeft: 7,
  },
};
