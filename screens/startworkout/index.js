import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView
} from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { addToHistory } from "../../store/actions/history";
import HeaderTop from "../../components/startWorkoutComponents/headerTop";
import { Stopwatch } from "react-native-stopwatch-timer";
import { Divider } from "react-native-elements";
import { updateUser } from "../../store/actions/user";
import { styles, options } from "./styles";
import firebase from "firebase";
import { isEmpty } from "react-redux-firebase";
// import { finishJio } from "../../helpers/startWorkout";

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
  const [jioStatus, setJio] = useState(null);
  const [PBs, setPBs] = useState(0);
  const achievements = [];

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{
              marginRight: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => saveTemplate()}
          >
            <Text style={{ fontSize: 13, color: "darkgreen" }}>Save </Text>
            <Text style={{ fontSize: 13, color: "darkgreen" }}>Template </Text>
          </TouchableOpacity>
        );
      },
    });
  }, [exercises, name, description]);

  //Stopwatch stuff
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timeNow, setTimeNow] = useState(0);

  const setTime = useRef((someNewValue) => {
    setTimeout(() => {
      setTimeNow(someNewValue);
    }, 1000);
  }).current;

  const clearWorkout = () => {
    setExercises([]);
  };

  const headerTopUpdate = (newName, desc) => {
    setName(newName);
    setDescription(desc);
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

  const saveTemplate = async () => {
    const exs = formatExercises()
    if (exercises.length === 0) {
      Alert.alert('Add exercises before saving a template.')
    } else if (!exs) {
      Alert.alert('Add sets to exercises.')
    } else {
      await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("templates")
      .add({
        name,
        description,
        duration: timeNow / 1000,
        distance: 0,
        calories: 100,
        imageURL,
        exercises: formatExercises(),
        template: true,
      });
      Alert.alert('Saved to Templates!')
    }
    
  };

  const formatExercises = () => {
    if (!exercises.reduce((x, y) => x && y?.sets , true)) {
      return null
    } else {
      return exercises.map((exercise) => ({
        ...exercise,
        sets: exercise.sets.map((set) => ({
          ...set,
          completed: false,
        })),
      }));
    }
    
  };

  const workoutComplete = () => {
    const completed = exercises.reduce(
      (x, y) => x && (y.sets ? completedSets(y) === y.sets.length : false),
      true
    );
    return completed && exercises.length > 0;
  };

  const finishWorkout = async () => {
    if (workoutComplete()) {
      setStatus("Paused");
      setIsStopwatchStart(false);
      console.log(timeNow);
      checkPb();
      console.log(PBs)

      const workout = {
        name,
        description,
        duration: timeNow / 1000,
        distance: 0,
        calories: 100,
        imageURL,
        exercises,
        achievements,
        jioStatus,
        PBs,
      };
      if (jioStatus) {
        finishJio(jioStatus.id, { ...workout, date: new Date() });
      } else {
        await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("history")
          .add({
            ...workout,
            date: new Date(),
          });
      }
      clearWorkout();
      props.navigation.navigate("Main", { screen: 'FitBud' });
    } else {
      Alert.alert("Workout incomplete!");
     }
  };

  const finishJio = async (id, workout) => {
    await firebase
      .firestore()
      .collection("jios")
      .doc(id)
      .update({ completed: true });
    const db = firebase.firestore();
    const batch = db.batch();

    jioStatus.people.forEach((user) => {
      const docRef = db
        .collection("users")
        .doc(user.uid)
        .collection("history")
        .doc();
      batch.set(docRef, workout);
    });

    batch.commit();
  };

  const checkPb = () => {
    let currPBs = [...props.currentUser?.pb] || []
    exercises.forEach((exe) => {
      const exName = exe.data.name;
      const max = exe.sets
        .map((set) => set.weight)
        .reduce((x, y) => Math.max(x, y), 0);
      
      const doneBefore = props.currentUser?.pb
        ? currPBs.find((ex) => ex.exercise === exName)
        : null;
      
      const currPb = doneBefore ? doneBefore.best : 0;
      console.log(max, currPb)
      if (max > currPb) {
        setPBs(PBs + 1);
        if (doneBefore) {
          const data = [...currPBs];
          const index = data.findIndex((ex) => ex.exercise === exName);
          data.splice(index, 1, { exercise: exName, best: max });
          currPBs = data;
        } else {
           currPBs = currPBs.concat({ exercise: exName, best: max })
        }
      }
    });

    props.updatePB({...props.currentUser, pb: currPBs})
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
                style={styles.itemReplace}
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
                style={styles.itemDelete}
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
          <TouchableOpacity style={{width: '10%'}}>
            <MaterialCommunityIcons name="dots-vertical" size={23} />
          </TouchableOpacity>
        </ListItem.Swipeable>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (props.route.params?.template && pulls === 1) {
      const template = props.route.params?.template;
      template?.jio && setJio(template?.jio);
      console.log(template?.description);
      setExercises(template?.exercises);
      setName(template?.name); //name
      setDescription(template?.description); //desc
      setImageURL(template?.imageURL || ""); //ImageUrl
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
    props.currentUser,
  ]);

  return (
    <View style={{ flexGrow: 1, justifyContent: "space-evenly" }}>
      <ScrollView style={{height: '88%'}}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={{ paddingBottom: 10 }}>
            <HeaderTop
              name={name}
              image={imageURL}
              desc={description}
              updater={headerTopUpdate}
            />
          </View>
          {workoutStatus == "Not Started" || workoutStatus == "Paused" ? (
            <View style={styles.statbar}>
              <TouchableOpacity
                style={styles.startstop}
                onPress={() => {
                  setIsStopwatchStart(true);
                  setStatus("Continue");
                }}
              >
                <Text style={{ color: "#FFFFFF" }}>Start</Text>
              </TouchableOpacity>
              <Divider orientation="vertical" />
              <Stopwatch
                start={isStopwatchStart}
                //To start
                reset={false}
                //To reset
                options={options}
                //options for the styling
                getMsecs={(time) => setTime(time)}
              />
            </View>
          ) : (
            <View style={styles.statbar}>
              <TouchableOpacity
                style={styles.startstop}
                onPress={() => {
                  setStatus("Paused");
                  setIsStopwatchStart(false);
                }}
              >
                <Text style={{ color: "#FFFFFF" }}>Pause</Text>
              </TouchableOpacity>
              <Divider orientation="vertical" />
              <Stopwatch
                start={isStopwatchStart}
                //To start
                reset={false}
                //To reset
                options={options}
                //options for the styling
                getMsecs={(time) => setTime(time)}
              />
            </View>
          )}
        </View>
        <View>
          <View>
            {exercises.length === 0 && (
              <Text
                style={{ fontSize: 24, alignSelf: "center", marginTop: 200 }}
              >
                Lets get Started!
              </Text>
            )}
          </View>
          {exercises && (
            <View style={{ marginBottom: 60 }}>
              <FlatList
                data={exercises}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
                scrollEnabled={false}
                editExercise={exercises}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <View style={{ height: 30 }}></View>
      <View style={styles.bottombar}>
        <TouchableOpacity
          style={[styles.bottomButton, { backgroundColor: "#0B2A59" }]}
          onPress={() => props.navigation.navigate("Add Exercises")}
        >
          <Text style={{ color: "#FFFFFF" }}>Add exercises</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bottomButton, { backgroundColor: "#F08080" }]}
          onPress={() => finishWorkout()}
        >
          <Text>Finish Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  finish: (workout) => dispatch(addToHistory(workout)),
  updatePB: (user) => dispatch(updateUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartWorkout);
