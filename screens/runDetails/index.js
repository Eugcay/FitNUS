import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Polyline } from "react-native-maps";
import { Divider } from "react-native-elements";

const RunDetails = (props) => {
  const run = props.route.params.workout;
  const image = props.route.params.workout.ImageURL;
  const name = props.route.params.workout.name;
  const id = props.route.params?.id ? props.route.params?.id : "";
  const locList = props.route.params.workout.locList;
  const date = props.route.params.workout.date;
  const distance = props.route.params.workout.distance;
  const duration = props.route.params.workout.duration;
  const description = props.route.params.workout.description;

  const [refer, setRefer] = useState(null);

  const fit = () => {
    refer.fitToCoordinates(locList, {
      edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
      animated: false,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={(ref) => {
          setRefer(ref);
        }}
        style={styles.map}
        provider="google"
        showsUserLocation={true}
        onMapReady={fit}
        scrollEnabled={true}
        showsTraffic={true}
      >
        <Polyline
          coordinates={locList}
          strokeWidth={2}
          lineJoin="bevel"
          strokeColour="rgba(0,0,0,0.1)"
        />
      </MapView>
      <Divider orientation="vertical" />
      <View style={styles.top}>
          <Text style={styles.title}>
            {name ? name : "Custom Run"}
          </Text>
          {date && <Text>{timestampToDate(date.seconds)}</Text>}
        </View>
        <View>
          <Text
            style={[
              { paddingTop: 5, marginHorizontal: 10, fontWeight: "bold" },
            ]}
          >
            Description
          </Text>
          <Text style={styles.body}>
            {description ? description : ""}
          </Text>
        </View>
      <View style={styles.statbar1}>
        <View style={styles.statbox}>
          <Text>Distance: </Text>
          <Text>{distance}</Text>
        </View>
        <Divider orientation="vertical" />
        <View style={styles.statbox}>
          <Text>Time: </Text>
          <Text>{duration}</Text>
        </View>
      </View>
      <View style={styles.statbar2}>
        <View style={styles.statbox}>
          <Text>Sets</Text>
          <Text></Text>
        </View>
        <Divider orientation="vertical" />
        <View style={styles.statbox}>
          <Text>Achievements</Text>
          <Text></Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("Run Map", {
            screen: "Run Map",
            params: {
              details: {
                ...run,
              },
            },
          })
        }
        style={styles.start}
      >
        <Text>Begin Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.5,
  },
  statbar1: {
    flexDirection: "row",
    marginHorizontal: 10,
    borderTopColor: "#C0C0C0",
    borderTopWidth: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  statbar2: {
    flexDirection: "row",
    marginHorizontal: 10,
    borderTopColor: "#C0C0C0",
    borderBottomColor: "#C0C0C0",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  statbox: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  start: {
    backgroundColor: "lightgreen",
    width: "95%",
    alignSelf: "center",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});

export default RunDetails;
