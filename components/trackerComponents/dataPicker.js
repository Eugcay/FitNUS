import React from "react";
import {
  Text,
  View,
  StyleSheet,
  fontFamily,
  TouchableOpacity,
} from "react-native";

const DataPicker = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Calories</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Time</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Distance</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#0B2A59",
    width: "30%",
    height: 45,
    borderRadius: 15,
  },
  text: {
    textAlign: "center",
    paddingTop: 13,
    color: 'white',
    fontWeight: 'bold'
  },
});

export default DataPicker;
