import React from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const SelectWorkoutType = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Start Workout")}
        style={{ height: "50%", width: "100%" }}
      >
        <ImageBackground
          source={require("../assets/runworkout1.jpeg")}
          style={styles.image}
        >
          <Text style={styles.title}>Static Workout</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity style={{ height: "50%", width: "100%" }}>
        <ImageBackground
          source={require("../assets/static1.jpeg")}
          style={styles.image}
        >
          <Text style={styles.title}>Run</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default SelectWorkoutType;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
      fontSize: 40,
      color: 'whitesmoke',
      fontFamily: ''
  }
});
