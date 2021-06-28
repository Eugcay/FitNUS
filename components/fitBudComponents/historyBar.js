import React from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { setRandomColor } from "../../helpers";
import { timestampToDate } from "../../helpers";
import Spinner from "../Spinner";

const HistoryBar = ({ navigation, hist }) => {
  const history = hist;

  const images = [
    require("../../assets/bg1.jpeg"),
    require("../../assets/bg2.jpeg"),
    require("../../assets/bg3.jpeg"),
  ];

  if (!history || history.length === 0) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Start Workout")}
        style={[styles.item, {backgroundColor: setRandomColor()}]}
      >
        <Text>Create new workout</Text>
      </TouchableOpacity>
    );
  }

  const renderItem = ({ item }) => {
    const img = images[Math.floor(Math.random() * images.length)];
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Workout Details", {
            workout: item.data, 
            id: item.id
          })
        }
        style={{ borderRadius: 8 }}
      >
        <ImageBackground
          source={item.data?.imageURL ? { uri: item.data.imageURL } : img}
          style={[styles.item]}
          imageStyle={{ borderRadius: 8 }}
          blurRadius={item.data.imageURL ? 6 : 0}
        >
          <Text style={[styles.title, styles.text]}>
            {item.data?.name ? item.data?.name : "Custom Workout"}
          </Text>
          <Text style={styles.text}>{item.data?.date?.seconds && timestampToDate(item.data?.date?.seconds)}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal={true}
      data={history}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  item: {
    flex: 1,
    width: 230,
    height: 120,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },

  title: {
    fontSize: 32,
  },

  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    borderRadius: 20,
    textShadowRadius: 5,
    textShadowColor: "gray",
    shadowOpacity: 0.8,
  },
});

export default HistoryBar;
