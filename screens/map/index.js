import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { View, Switch } from "react-native";
import * as Location from "expo-location";
import { mapDark, mapStandard } from "../../mapConfig";
import { styles } from "./config";
import { presetLocations } from "../../mapConfig";

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

  const _onMapReady = () => setMargin(60);

  return (
    <View style={styles.container}>
      <MapView
        style={[styles.map, { marginTop: mTop }]}
        initialRegion={{
          latitude: 1.2985,
          longitude: 103.775,
          latitudeDelta: 0.012,
          longitudeDelta: 0.012,
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
      </MapView>
    </View>
  );
}
