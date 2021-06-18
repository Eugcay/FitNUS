import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Button,
  FlatList,
  Alert,
} from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { addToHistory } from "../store/actions/user";
import haversine from "haversine";
import HeaderTop from "../components/startWorkoutComponents/headerTop";
import { Stopwatch } from "react-native-stopwatch-timer";
import * as Location from 'expo-location'

const StartWorkout = (props) => {
  const [exercises, setExercises] = useState([]);
  const [replaced, setReplaced] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [pulls, setPulls] = useState(1);
  const [workoutStatus, setStatus] = useState("Not Started");

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

  useEffect(() => {
    console.log("here")
    if (workoutStatus != "Not Started") {
      console.log("Started")
      if (workoutStatus != "Stopped") {
      } else {
        console.log("hi");
        _getLocationAsync = async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            console.log("debieeed");
          }
          let locations = await Location.watchPositionAsync(
            {
              accuracy: Location.Accuracy.Highest,
              timeInterval: 100,
              distanceInterval: 1,
            },
            (loc) => {
              setNewDistance(distance + calcDistance(currentLocation, loc.coords));
              setCurrentLocation(loc.coords);
            }
          );
          console.log(locations);
          setLocList(locations);
        };
      }
    }
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => console.log(exercises)}
          title="FINISH"
          color="green"
        />
      ),
    });
  }, []);

  const clearWorkout = () => {
    setExercises([]);
    console.log(exercises);
  };

  const deleteItem = (item) => {
    const index = exercises.indexOf(item);
    const data = [...exercises];
    data.splice(index, 1);
    setExercises(data);
    console.log(exercises);
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
    console.log(exercises[index]);
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
      props.finish("", 100, 30, exercises);
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
    if (props.route.params?.exercise && updating) {
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
  ]);

  return (
    <View style={{ flex: 1 }}>
      <HeaderTop />
      <View>
        <TouchableOpacity onPress={() => props.navigation.navigate("Map")}>
          <Text>Map</Text>
        </TouchableOpacity>
        {workoutStatus == "Not Started" ? (
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
              onPress={() => {
                setStatus("Continue");
                setIsStopwatchStart(true);
              }}
            >
              <AntDesign name="play" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ) : workoutStatus == "Continue" ? (
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
              onPress={() => {
                setStatus("Paused");
                setIsStopwatchStart(false);
              }}
            >
              <AntDesign name="pausecircle" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setStatus("Stopped");
                setIsStopwatchStart(false);
              }}
            >
              <MaterialCommunityIcons
                name="stop-circle"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        ) : workoutStatus == "Paused" ? (
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
              onPress={() => {
                setStatus("Continue");
                setIsStopwatchStart(true);
              }}
            >
              <AntDesign name="play" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setStatus("Stopped");
                setIsStopwatchStart(false);
              }}
            >
              <MaterialCommunityIcons
                name="stop-circle"
                size={24}
                color="black"
              />
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
          </View>
        )}
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
      <View
        style={{
          flex: 1,
          position: "absolute",
          bottom: 40,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          height: "5%",
        }}
      >
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
    </View>
  );
};

const maptDispatchToProps = (dispatch) => ({
  finish: (id, calories, duration, workoutData) =>
    dispatch(addToHistory(id, calories, duration, workoutData)),
});

export default connect(null, maptDispatchToProps)(StartWorkout);

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
  contianer: {
    display: "flex",
    flexDirection: "row",
  },
});

const options = {
  container: {
    backgroundColor: "#FF0000",
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
