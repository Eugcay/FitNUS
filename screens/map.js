import React, { useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions} from "react-native";

export default function Map() {
  const [marginBot, setMargin] = useState(1)

  return (
    <View style={styles.container}>
      <MapView
        style={[styles.map, {marginBottom: marginBot}]}
        initialRegion={{
          latitude: 1.3702303096151767,
          longitude: 103.94958799677016,
          latitudeDelta: 0.09,
          longitudeDelta: 0.05,
        }}
        provider="google"
        mapType="hybrid"
        onMapReady={() => setMargin(0)}
        showsUserLocation={true}
        showsMyLocationButton={true}
      />
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
