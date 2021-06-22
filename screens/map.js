import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Switch } from "react-native";
import * as Location from "expo-location";
import { mapDark, mapStandard } from "../mapConfig";



export default function Map(props) {
  const [mTop, setMargin] = useState(0);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == "granted") {
        let { status2 } = await Location.requestBackgroundPermissionsAsync();
        if (status2 !== "granted") {
          setErrorMsg("Permission to access background location was denied");
          return;
        }
      } else {
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      if (errorMsg) {
        setText(errorMsg);
      } else if (location) {
        setText(JSON.stringify(location));
      }
    })();
  }, []);

  console.log(JSON.stringify(location));

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
          latitudeDelta: 0.09,
          longitudeDelta: 0.05,
        }}
        provider="google"
        mapType="hybrid"
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        onMapReady={_onMapReady}
        customMapStyle={dark ? mapDark : mapStandard}
      >{presetLocations.map((marker) => (
        <MapView.Marker
          key={marker.index}
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
        />
      ))}
        
        {/* <Switch //causes probs to above
          onChange={() => toggleMode()}
          style={{ position: "absolute", top: 20, right: 10 }}
          value={dark}
        /> */}
      </MapView>
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
});
