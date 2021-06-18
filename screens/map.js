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
    props.navigation.setParams({headerTitleStyle: {
        color: dark ? "black" : "white",
    }})
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
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        onMapReady={_onMapReady}
        customMapStyle={dark ? mapDark : mapStandard}
      >
        <Switch
          onChange={() => toggleMode()}
          style={{ position: "absolute", top: 20, right: 10 }}
          value={dark}
        />
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
