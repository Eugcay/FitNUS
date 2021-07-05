import React, { useState, useEffect, useRef } from "react";
import MapView, { Polyline } from "react-native-maps";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import haversine from "haversine";
import { mapDark, mapStandard } from "../../mapConfig";
import { Stopwatch } from "react-native-stopwatch-timer";
import { presetLocations, testCords } from "../../config";
import { styles, options } from "./styles";
import firebase from "firebase";

export default function RunMap(props) {
  const [mTop, setMargin] = useState(0);
  const [dark, setDark] = useState(false);

  const [refer, setRefer] = useState(null);

  const fitAllMarkers = () => {
    refer.fitToCoordinates(locList, {
      edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
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
    props.navigation.setOptions({
      headerStyle: {
        opacity: 1,
        backgroundColor: dark ? "#191970" : "white",
      },
      headerTitleStyle: {
        color: dark ? "white" : "black",
      },
    });
  }, []);

  //Track location stuff => Calcdistance, Watch poition, Polyline
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setNewDistance] = useState(0);
  const [locList, setLocList] = useState([]);
  const [remove, setRemove] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
        setLocList((oldList) => [...oldList, newLocation]);
        console.log(
          "Initial Current Location Retrieved: " +
            "{ lat: " +
            newLocation.latitude +
            " lon: " +
            newLocation.longitude +
            " }"
        );
      } else {
        console.log("Initial Current Location is not null");
        console.log("Total Distance Travelled: " + distance + " Km")
        console.log("Pace: " + (distance * 1000) / (timeNow / 1000))
      }
      ////////////////////////////////////////////////////////////
    })();
  }, [currentLocation]); //only rerender if loclist changes

  const start = () => {
    setStatus("Continue");
    console.log(
      "-----------------------------------Start Pressed------------------------------------------"
    );
    ////////////////////////////////////////////////////////////
    (async () => {
      let locations = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 60000,
          distanceInterval: 1
        },
        (loc) => {
          const latlon = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };
          const newDistance = calcDistance(currentLocation, latlon);
          setNewDistance((distance) => distance + newDistance);
          setCurrentLocation(latlon);
          setLocList((oldList) => [...oldList, latlon]);

          console.log(
            "==========Location Changed: " +
              "{ lat: " +
              latlon.latitude +
              " lon: " +
              latlon.longitude +
              " }=========="
          );
          console.log("Distance Travelled in Recent Change: " + newDistance + " Km");
          
        }
      );
      if (remove == null) {
        setRemove(locations);
      } else {
        console.log("Remove function is no longer undefined");
      }
    })();
  };

  const stop = () => {
    console.log(
      "-------------------------------Finish Run Pressed-----------------------------------"
    );
    remove.remove();
    console.log(
      "---------------------------------Function Removed?-------------------------------------"
    );
  };

  const finishRun = async () => {
    remove.remove();
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("runs")
      .add({
        name: 'Quick Run',
        description: `Run on ${new Date(Date.now())}`,
        duration: timeNow / 1000,
        distance,
        locList,
        date: firebase.firestore.FieldValue.serverTimestamp(),
      });

    props.navigation.navigate("Main");
  };

  const _onMapReady = () => setMargin(60);

  const toggleMode = () => {
    props.navigation.setParams({
      headerTitleStyle: {
        color: dark ? "black" : "white",
      },
    });
    setDark(!dark);
  };

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
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        onMapReady={_onMapReady}
        customMapStyle={dark ? mapDark : mapStandard}
      >
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
                }}
              >
                <Text style={styles.pauseButton}>Finish</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.finishRunBorder}>
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
              </View> 
              <TouchableOpacity //Finish
                style={styles.finishRunButton}
                onPress={() => {
                  stop();
                  finishRun();
                }}
              >
                <Text style={styles.finishRunButtonText}>Finish</Text>
              </TouchableOpacity>          
          </View>
        )}
      </View>
    </View>
  );
}