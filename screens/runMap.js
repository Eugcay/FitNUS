import React, { useState, useEffect, useRef } from "react";
import MapView, { Polyline } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import haversine from "haversine";
import { mapDark, mapStandard } from "../mapConfig";
import { Stopwatch } from "react-native-stopwatch-timer";

export default function RunMap(props) {
  const [mTop, setMargin] = useState(0);
  const [text, setText] = useState(null);
  const [dark, setDark] = useState(false);

  var presetLocations = [
    {
      latlng: {
        latitude: 1.3050038005230384,
        longitude: 103.77226573268865,
      },
      title: "UTown Gym",
      description:
        "Monday to Friday 0700hr to 2200hr. Weekends and Public Holidays 0700hr to 2200hr",
      index: 0,
    },
    {
      latlng: {
        latitude: 1.3007140063983416,
        longitude: 103.77576209191275,
      },
      title: "MPSH3 Gym",
      description:
        "Monday to Friday 1100hr to 2000hr. Weekends and Public Holidays CLOSED",
      index: 1,
    },
    {
      latlng: {
        latitude: 1.2998962556887896,
        longitude: 103.77541237391264,
      },
      title: "USC Gym",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 2,
    },
    {
      latlng: {
        latitude: 1.3188077583479827,
        longitude: 103.8172019198111,
      },
      title: "Bukit Timah Gym",
      description:
        "Monday to Friday 0730hr to 2100hr. Saturday 0730hr to 1700hr. Sunday and Public Holidays CLOSED (For BTC students and staff only)",
      index: 3,
    },
    {
      latlng: {
        latitude: 1.3051644416156996,
        longitude: 103.7723855448247,
      },
      title: "Stephen Riady Centre Swimming Pool",
      description:
        "Monday to Friday 0730hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 4,
    },
    {
      latlng: {
        latitude: 1.2998052316015167,
        longitude: 103.7755360652127,
      },
      title: "USC Swimming Pool",
      description:
        "Monday to Friday 0730hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 5,
    },
    {
      latlng: {
        latitude: 1.298764029536889,
        longitude: 103.77723916069229,
      },
      title: "USC Tennis Courts",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 6,
    },
    {
      latlng: {
        latitude: 1.2996399288887228,
        longitude: 103.77724379907713,
      },
      title: "USC Handball Courts",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 7,
    },
    {
      latlng: {
        latitude: 1.3000892337791696,
        longitude: 103.77703316792304,
      },
      title: "USC Basketball Courts",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 8,
    },
    {
      latlng: {
        latitude: 1.3003979554453948,
        longitude: 103.77699207744575,
      },
      title: "USC Archery/volleyball Courts",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 9,
    },
    {
      latlng: {
        latitude: 1.300582887527544,
        longitude: 103.77598976447635,
      },
      title: "USC Table Tennis Tables",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 10,
    },
    {
      latlng: {
        latitude: 1.2999029382834928,
        longitude: 103.77525532694317,
      },
      title: "USC Squash Courts",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 11,
    },
    {
      latlng: {
        latitude: 1.300432226076777,
        longitude: 103.77610168353331,
      },
      title: "USC Badminton Courts",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 12,
    },
    {
      latlng: {
        latitude: 1.3051974804152258,
        longitude: 103.77192223464816,
      },
      title: "UTown MPH",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 13,
    },
    {
      latlng: {
        latitude: 1.3049399787896439,
        longitude: 103.77313671368337,
      },
      title: "UTown Green",
      description: "24/7 ig .-.",
      index: 14,
    },
    {
      latlng: {
        latitude: 1.298684969725457,
        longitude: 103.77834249029279,
      },
      title: "USC Track and Field",
      description: "Requires booking",
      index: 15,
    },
  ];

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

  const polylinearray = [
    {
      latitude: 1.3050038005230384,
      longitude: 103.77226573268865,
    },
    {
      latitude: 1.3049399787896439,
      longitude: 103.77313671368337,
    },
    {
      latitude: 1.300432226076777,
      longitude: 103.77610168353331,
    },
    {
      latitude: 1.3695049662681242,
      longitude: 103.95023556819342,
    },
  ];

  const calcDistance = (prevLatLng, newLatLng) => {
    return haversine(prevLatLng, newLatLng) || 0;
  };

  // const onPostionChange = (loc) => {
  //   //currentLocation could be null for the first one
  //   console.log("changed");
  //   const latlon = {
  //     latitude: loc.coords.latitude,
  //     longitude: loc.coords.longitude,
  //   };
  //   setNewDistance(distance + calcDistance(currentLocation, latlon));
  //   setCurrentLocation(latlon);
  //   setLocList(locList.push(latlon));
  // };

  //Carry on
  useEffect(() => {
    (async () => {
      console.log("rendered");
      ////////////////////////////////////////////////////////////
      let { currentStatus } = await Location.getForegroundPermissionsAsync();
      if (currentStatus !== "granted") {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          console.log("Permission not granted!");
          return;
        } else {
        }
      }
      /////////////////////////////////////////////////////////////

      if (currentLocation == null) {
          let loc = await Location.getCurrentPositionAsync({});
          console.log("Current Position got")
          const newLocation = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };
          setCurrentLocation(newLocation);
          setLocList(locList.concat([newLocation]));
      }

      ////////////////////////////////////////////////////////////
      //wacthasync eturns a promise resolving to a subscription object, remove (function) -- Call this function with no arguments to remove this subscription.
      let locations = await Location.watchPositionAsync(
        {
          enableHighAccuracy: true,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (loc) => {
          console.log("changed");
          const latlon = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };
          setNewDistance(distance + calcDistance(currentLocation, latlon));
          setCurrentLocation(latlon);
          setLocList(locList.concat([latlon]));
        }
      );
      setRemove(locations);
    })();
  }, [locList]); //only rerender if loclist changes

  const start = () => {
    setStatus("Continue");
    console.log("Start Pressed")
  };

  const stop = () => {
    remove;
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
        {workoutStatus == "Not Started" || workoutStatus == "Paused" ? (
          <View>
            <View style={styles.timeBox}>
              <Text style={styles.time}>
                Time elapsed:
              </Text>
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
              <Text style={styles.ran}>
                Distance:
              </Text>
            </View>
            <View style={styles.distanceBox}>
              <Text style={styles.distance}>{distance.toFixed(2)} Km</Text>
            </View>
            <TouchableOpacity
              style={styles.startButtonBox}
              onPress={() => {
                start();
                setIsStopwatchStart(true);
              }}
            >
              <Text style={styles.startButton}>Start</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View style={styles.timeBox}>
              <Text style={styles.time}>
                Time elapsed:
              </Text>
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
              <Text style={styles.ran}>
                Distance:
              </Text>
            </View>
            <View style={styles.distanceBox}>
              <Text style={styles.distance}>{distance.toFixed(2)} Km</Text>
            </View>
            <TouchableOpacity
              style={styles.pauseButtonBox}
              onPress={() => {
                setStatus("Paused");
                setIsStopwatchStart(false);
              }}
            >
              <Text style={styles.pauseButton}>Pause</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  overlay: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
  },
  distanceBox: {
    alignSelf: 'center',
    bottom: 360
  },
  distance: {
    fontSize: 30,
    color: "#0B2A59",
    textShadowColor: "black",
    textShadowOffset: {
      width: 50,
      height: -10
    }
  },
  timeBox: {
    bottom: 335,
    left: 64
  },
  time: {
    color: "#0B2A59",
    fontSize: 15
  },
  ranBox: {
    bottom: 354,
    left: 125
  },
  ran: {
    color: "#0B2A59",
    fontSize: 15
  },
  startButtonBox: {
    alignSelf: "center",
    backgroundColor: "#0B2A59",
    padding: 10,
    borderRadius: 16,
    width: 150,
    bottom:  -20
  },
  startButton: {
    alignSelf: 'center',
    color: "white",
    fontSize: 18
  },
  pauseButtonBox: {
    alignSelf: "center",
    backgroundColor: "#F08080",
    padding: 10,
    borderRadius: 16,
    width: 150,
    bottom:  -20
  },
  pauseButton: {
    alignSelf: 'center',
    color: "white",
    fontSize: 18
  }
});

const options = {
  container: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    bottom: 350
  },
  text: {
    fontSize: 62,
    color: "#0B2A59",
    margin: 0,
  },
};
