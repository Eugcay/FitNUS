import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
  Alert,
  FlatList,
  Image,
  Animated
} from "react-native";
import firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Polyline } from "react-native-maps";
import { Divider } from "react-native-elements";
import { timestampToDate } from "../../helpers";

const RunDetails = (props) => {
  const run = props.route.params.workout;
  const name = props.route.params.workout.name;
  const id = props.route.params?.id ? props.route.params?.id : "";
  const locList = props.route.params.workout.locList;
  const date = props.route.params.workout.date;
  const distance = props.route.params.workout.distance;
  const duration = props.route.params.workout.duration;
  const description = props.route.params.workout.description;
  const ran = props.route.params.workout.ran;
  const jioState = props.route.params?.workout?.jioStatus
  const startPoint = locList[1]
  const endPoint = locList[locList.length - 1]

  const [refer, setRefer] = useState(null);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () =>
        date && (
          <TouchableOpacity style={{marginHorizontal: 5}} onPress={deleteRun}>
            <Text style={{ color: "red" }}>Delete</Text>
          </TouchableOpacity>
        ),
    });
  }, []);

  const del = (id) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("runs")
      .doc(id)
      .delete();
    props.navigation.goBack();
  };

  const deleteRun = () => {
    Alert.alert("Confirm Delete?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          del(id);
        },
      },
    ]);
  };

  const fit = () => {
    refer.fitToCoordinates(locList, {
      edgePadding: { top: 200, right: 200, bottom: 200, left: 200 },
      animated: false,
    });
  };

  return (
    <View  style={styles.container}>
    <ScrollView>
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
        maxZoomLevel={19.9}
        showsMyLocationButton={true}
      >
        <MapView.Marker
            key={1}
            coordinate={startPoint}
            title={"Start"}
            pinColor={"green"}
        />
        <MapView.Marker
            key={2}
            coordinate={endPoint}
            title={"End"}
            pinColor={"#0B2A59"}
        />
        <Polyline
          coordinates={locList}
          strokeWidth={2}
          lineJoin="bevel"
          strokeColour="rgba(0,0,0,0.1)"
        />

      </MapView>
      <Divider orientation="horizontal" width={1} />
      <View style={styles.top}>
        <Text style={{ fontSize: 22, paddingTop: 5, marginHorizontal: 10 }}>
          {name ? name : "Custom Run"}
        </Text>
        {date && (
          <Text style={styles.body}>{timestampToDate(date.seconds * 1000)}</Text>
        )}
      </View>
      <Divider orientation="horizontal" width={1} />
      <View>
        <Text style={styles.title}>Description</Text>
        <Text style={styles.body}>{description ? description : ""}</Text>
      </View>
      <Divider orientation="horizontal" width={1} />
      {jioState && (
            <View style={{marginHorizontal: 10, marginVertical: 15}}>
            
            <Text style={{ paddingTop: 5, marginHorizontal: 10, fontWeight: "bold", marginBottom: 5 }}>Workout Buddies</Text>
            <FlatList
              data={jioState.people}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      justifyContent: "center",
                      flex: 1,
                      alignItems: "center",
                      marginHorizontal: 15
                    }}
                  >
                    <Image
                      source={
                        item?.photoURL
                          ? { uri: item?.photoURL }
                          : require("../../assets/user.png")
                      }
                      style={{width: 36, height: 36, borderRadius: 18}}
                    />
                    <Text style={{ marginTop: 3 }}>{item.name}</Text>
                  </View>
                );
              }}
              horizontal={true}
            />
            
            </View>
          )}
      <View style={styles.statbar}>
      <Divider width={1}/>
        <View style={styles.statbox}>
          <Text style={{fontWeight: "bold"}}>Distance: </Text>
          <Text>{distance.toFixed(2)} Km</Text>
        </View>
        <Divider orientation="vertical" />
        <View style={styles.statbox}>
          <Text style={{fontWeight: "bold"}}>Time: </Text>
          <Text>
            {Math.floor(duration / 60)} mins{" "}
            {((duration / 60 - Math.floor(duration / 60)) * 60).toFixed(0)} secs
          </Text>
        </View>
      </View>
      <Divider orientation="horizontal" width={1} />
      <View style={styles.statbar}>
        <View style={styles.statbox}>
          <Text style={{fontWeight: "bold"}}>Average Pace:</Text>
          <Text>{((duration / 60) / distance).toFixed(2)} min/Km</Text>
        </View>
        <Divider orientation="vertical" />
        <View style={styles.statbox}>
          <Text style={{fontWeight: "bold"}}>Ran: </Text>
          {ran === 1 ? <Text>1 time</Text> : <Text>{ran} times</Text>}
        </View>
      </View>
      
    </ScrollView>
    <Divider orientation="horizontal" width={1} />

    <TouchableOpacity
    onPress={() =>
      props.navigation.navigate("Start Workout", {
        screen: "Run Map",
        params: {
          details: {
            ...run,
            start: startPoint,
            end: endPoint
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
    height: Dimensions.get("window").height * 0.45,
    top: 2
  },
  statbar: {
    flexDirection: "row",
    marginHorizontal: 10,
    borderTopColor: "#C0C0C0",
    borderBottomColor: "#C0C0C0",
    alignContent: "center",
    justifyContent: "center",
  },
  statbox: {
    flex: 0.5,
    height: 50,
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
    marginVertical: 6,
  },
  title: {
    paddingTop: 5,
    marginHorizontal: 10,
    fontWeight: "bold",
  },
  body: {
    marginTop: 5,
    marginBottom: 8,
    marginHorizontal: 10,
    textAlign: "justify",
  },
});

export default RunDetails;
