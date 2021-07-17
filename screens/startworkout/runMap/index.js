import React, { useState, useEffect, useRef } from "react";
import MapView, { Polyline } from "react-native-maps";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import * as Location from "expo-location";
import haversine from "haversine";
import { mapDark, mapStandard } from "../../../mapConfig";
import { Stopwatch } from "react-native-stopwatch-timer";
import { presetLocations, testCords } from "./config";
import { styles, options } from "./styles";
import firebase from "firebase";
import { connect } from "react-redux";
import { addToRuns } from "../../../store/actions/history"; 
import Spinner from "../../../components/Spinner";

const RunMap = (props) => {
  //RunDetails Stuff
  const [oldLocList, setOldLocList] = useState(null);
  const [ran, setRan] = useState(0);
  const [pulls, setPulls] = useState(1);
  const [showhideRoute, setshowhideRoute] = useState(true);
  const [description, setDescription] = useState(null);
  const [jioStatus, setJio] = useState(null);
  const [loading, setLoading] = useState(false)
  const oldRun = props.route.params?.details;
  const startPoint = oldRun?.start;
  const endPoint = oldRun?.end;

  useEffect(() => {
    if (oldRun && pulls === 1) {
      setOldLocList(oldRun.locList);
      setRan(oldRun.ran);
      setPulls(pulls + 1);
    }
  }, [ran]);

  const [mTop, setMargin] = useState(0);
  const [dark, setDark] = useState(false);
  const [title, setTitle] = useState("Workout title");
  const [refer, setRefer] = useState(null);
  //detailsloclist
  //display polyline and markers
  //ran

  const fitAllMarkers = () => {
    refer.fitToCoordinates(locList, {
      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
      animated: true,
    });
  };

  const [workoutStatus, setStatus] = useState("Not Started");
  const [timeNow, setTimeNow] = useState(null);

  //Stopwatch stuff
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);

  const setTime = useRef((someNewValue) => {
    setTimeout(() => {
      setTimeNow(someNewValue);
    }, 0);
  }).current;

  useEffect(() => {
    const template = props.route.params?.template;
    if (template) {
      setTitle(template?.name);
      setJio(template?.jio);
      setDescription(template?.description);
      console.log(template)
    }

    props.navigation.setOptions({
      headerStyle: {
        opacity: 1,
        backgroundColor: dark ? "#191970" : "white",
      },
      headerTitleStyle: {
        color: dark ? "white" : "black",
      },
    });
  }, [props.route.params?.template]);

  //Track location stuff => Calcdistance, Watch poition, Polyline
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setNewDistance] = useState(0);
  const [locList, setLocList] = useState([]);
  const [remove, setRemove] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [screenShot, setScreenshot] = useState(null);
  const [userLoc, setUserLoc] = useState(true);
  const [index, setIndex] = useState(-1);

  //takeSnapshot
  const takeScreenshot = async () => {
    // 'takeSnapshot' takes a config object with the
    // following options
      let screenshot = await refer.takeSnapshot({
        format: "png", // image formats: 'png', 'jpg' (default: 'png')
        quality: 0.8, // image quality: 0..1 (only relevant for jpg, default: 1)
        result: "file", // result types: 'file', 'base64' (default: 'file')
      });

      const res = await fetch(screenshot)
      const blob = await res.blob()
      const path = `runs/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`

      const task = firebase.storage().ref().child(path).put(blob);

      const progress = (snapshot) => {
        console.log(`transferred: ${snapshot.bytesTransferred}`);
      };

      const completed = () => {
        task.snapshot.ref.getDownloadURL().then((snapshot) => {
          finishRun(snapshot);
          console.log(snapshot);
        });
      };

      const error = (snapshot) => {
        console.log(snapshot);
      };

      task.on("state_change", progress, error, completed);
    
  };

  const calcDistance = (prevLatLng, newLatLng) => {
    return haversine(prevLatLng, newLatLng) || 0;
  };

  //Carry on
  useEffect(() => {

    (async () => {
      console.log("Effect Rendered");

      ////////////////////////////////////////////////////////////
      let { currentStatus } = await Location.getForegroundPermissionsAsync();
      if (currentStatus !== "granted") {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          console.log("Permission not granted!");
          return;
        }
      } else {
        console.log("Permission is OK");
      }

      /////////////////////////////////////////////////////////////

      if (currentLocation == null) {
        let loc = await Location.getCurrentPositionAsync({});
        const newLocation = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };
        setCurrentLocation(newLocation);
        setLocList((locList) => [...locList, newLocation]);
        setIndex(index + 1)
        // console.log(
        //   "Initial Current Location Retrieved: " +
        //     "{ lat: " +
        //     newLocation.latitude +
        //     " lon: " +
        //     newLocation.longitude +
        //     " }"
        // );
      } else {
        console.log(locList);
        //set distance by drawing from locList
        if (locList.length >= 2 && locList.length > index + 1) {
          setNewDistance((oldDistance) => oldDistance + calcDistance(locList[index], locList[index + 1]))
          //increase index
          setIndex((oldIndex) => oldIndex + 1);
          //console.log(distance)
        }
      }
      ////////////////////////////////////////////////////////////
    })();
  }, [currentLocation, screenShot]); //only rerender if currentLocation changes

  const start = () => {
    setStatus("Continue");
    console.log(
      "-----------------------------------Start Pressed------------------------------------------"
    );
    ////////////////////////////////////////////////////////////
    async function watchPos(index) {
      let locations = await Location.watchPositionAsync( //Only use this to change state, dont use this to change sideEffects, e.g don calc inside
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 6000,
          distanceInterval: 1,
        },
        (loc) => {
          const latlon = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };
          setCurrentLocation(latlon);
          //Everytime the location changes -> Add location into locList.
          setLocList((locList) => [...locList, latlon]);
          // console.log(
          //   "==========Location Changed: " +
          //     "{ lat: " +
          //     latlon.latitude +
          //     " lon: " +
          //     latlon.longitude +
          //     " }=========="
          // );
        }
      );
      setRemove(locations);
    }

    watchPos(index);
  };

  const stop = () => {
    // console.log(
    //   "-------------------------------Finish Run Pressed-----------------------------------"
    // );
    //console.log(remove)
    remove.remove();
    // console.log(
    //   "---------------------------------Function Removed?-------------------------------------"
    // );
  };

  const finishRun = async (ss) => {
    remove.remove();
    const uid = firebase.auth().currentUser.uid;
    const run = {
      name: title,
      description,
      duration: timeNow / 1000,
      distance,
      locList,
      date: new Date(),
      imageURL: ss,
      ran,
      jioStatus
    };
    if (jioStatus) {
      setLoading(true)
      await finishJio(jioStatus.id, {...run})
    } else {
      setLoading(true)
      await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("runs")
      .add(run)
      // props.finish(run)
    }
    props.navigation.navigate("Main", {name: 'FitBud'});
  };

  const finishJio = async (id, workout) => {
    await firebase.firestore().collection('jios').doc(id).update({completed: true})
    const db = firebase.firestore()
    const batch = db.batch()
    
    jioStatus.people.forEach(user => {
      const docRef = db.collection('users').doc(user.uid).collection('runs').doc()
      batch.set(docRef, workout)
    })

    batch.commit()
  }

  const _onMapReady = () => setMargin(60);

  return (
    <View style={styles.container}>
      <MapView
        ref={(ref) => {
          setRefer(ref);
        }}
        style={[styles.map, { marginTop: mTop }]}
        initialRegion={{
          latitude: 1.3702303096151767,
          longitude: 103.94958799677016,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        provider="google"
        showsUserLocation={userLoc}
        showsMyLocationButton={true}
        showsCompass={true}
        onMapReady={_onMapReady}
        customMapStyle={dark ? mapDark : mapStandard}
        maxZoomLevel={19.9}
        onLongPress={() => setshowhideRoute(!showhideRoute)}
      >
        {showhideRoute && oldRun ? (
          <MapView.Marker
            key={1}
            coordinate={startPoint}
            title={"Start"}
            pinColor={"green"}
          />
        ) : (
          <View />
        )}
        {showhideRoute && oldRun ? (
          <MapView.Marker
            key={2}
            coordinate={endPoint}
            title={"End"}
            pinColor={"#0B2A59"}
          />
        ) : (
          <View />
        )}
        {showhideRoute && oldRun ? (
          <Polyline
            coordinates={oldLocList}
            strokeWidth={1}
            strokeColor={"red"}
          />
        ) : (
          <View />
        )}
        {presetLocations.map((marker) => (
          <MapView.Marker
            key={marker.index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
        <Polyline coordinates={locList} strokeWidth={2} />
      </MapView>
      <View style={styles.overlay}>
        {workoutStatus == "Not Started" ? (
          <View>
            <View style={styles.timeBox}>
              <Text style={styles.time}>Time elapsed:</Text>
            </View>
            <Stopwatch
              start={isStopwatchStart}
              //To start
              reset={false}
              //To reset
              options={options}
              //options for the styling
              getMsecs={(time) => setTime(time)}
            />
            <View style={styles.ranBox}>
              <Text style={styles.ran}>Distance:</Text>
            </View>
            <View style={styles.distanceBox}>
              <Text style={styles.distance}>{distance.toFixed(2)} Km</Text>
            </View>
            <View style={styles.bottombar}>
              <TouchableOpacity //Start
                style={styles.startButtonBox}
                onPress={() => {
                  start();
                  setIsStopwatchStart(true);
                  setStatus("Continue");
                }}
              >
                <Text style={styles.startButton}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : workoutStatus == "Continue" ? ( //Pause and Finish
          <View>
            <View style={styles.timeBox}>
              <Text style={styles.time}>Time elapsed:</Text>
            </View>
            <Stopwatch
              start={isStopwatchStart}
              //To start
              reset={false}
              //To reset
              options={options}
              //options for the styling
              getMsecs={(time) => setTime(time)}
            />
            <View style={styles.ranBox}>
              <Text style={styles.ran}>Distance:</Text>
            </View>
            <View style={styles.distanceBox}>
              <Text style={styles.distance}>{distance.toFixed(2)} Km</Text>
            </View>
            <View style={styles.bottombar}>
              <TouchableOpacity //Paused
                style={styles.pauseButtonBox}
                onPress={() => {
                  setStatus("Paused");
                  setIsStopwatchStart(false);
                  stop();
                }}
              >
                <Text style={styles.pauseButton}>Pause</Text>
              </TouchableOpacity>
              <TouchableOpacity //Finish
                style={styles.finishButtonBox}
                onPress={() => {
                  setStatus("Finished");
                  setIsStopwatchStart(false);
                  stop();
                  fitAllMarkers();
                  setUserLoc(false);
                }}
              >
                <Text style={styles.pauseButton}>Finish</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : workoutStatus == "Paused" ? ( //Finish and Continue
          <View>
            <View style={styles.timeBox}>
              <Text style={styles.time}>Time elapsed:</Text>
            </View>
            <Stopwatch
              start={isStopwatchStart}
              //To start
              reset={false}
              //To reset
              options={options}
              //options for the styling
              getMsecs={(time) => setTime(time)}
            />
            <View style={styles.ranBox}>
              <Text style={styles.ran}>Distance:</Text>
            </View>
            <View style={styles.distanceBox}>
              <Text style={styles.distance}>{distance.toFixed(2)} Km</Text>
            </View>
            <View style={styles.bottombar}>
              <TouchableOpacity //Continue
                style={styles.continueButtonBox}
                onPress={() => {
                  start();
                  setIsStopwatchStart(true);
                  setStatus("Continue");
                }}
              >
                <Text style={styles.startButton}>Continue</Text>
              </TouchableOpacity>
              <TouchableOpacity //Finish
                style={styles.finishButtonBox}
                onPress={() => {
                  setStatus("Finished");
                  setIsStopwatchStart(false);
                  stop();
                  fitAllMarkers();
                  setUserLoc(false);
                }}
              >
                <Text style={styles.pauseButton}>Finish</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.finishRunBorder}
          >
            {loading && <Spinner/>}
            <TextInput
              style={{
                height: 50,
                borderColor: "gray",
                borderWidth: 1,
                marginVertical: 10,
                paddingLeft: 15,
                fontSize: 28,
              }}
              onChangeText={(text) => setTitle(text)}
              value={title}
              maxLength={20}
            />

            <Text style={styles.finishRunDistance}>
              Total Distance: {distance.toFixed(2)} Km
            </Text>
            <Text style={styles.finishRunTime}>
              Total Time: {(timeNow / 1000 / 60).toFixed(2)} minutes
            </Text>
            <Text style={styles.finishRunPace}>
              Average Pace:{" "}
              {(distance.toFixed(2) / (timeNow / 1000 / 60)).toFixed(2)} Km/m
            </Text>
            <TouchableOpacity //Finishfinish
              style={styles.finishRunButton}
              onPress={() => {
                setRan(ran + 1);
                takeScreenshot();
              }}
            >
              <Text style={styles.finishRunButtonText}>Finish</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )}
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => ({
  finish: (workout) => dispatch(addToRuns(workout)),
});

export default connect(null, mapDispatchToProps)(RunMap);
