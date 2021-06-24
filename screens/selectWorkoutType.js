import React from "react";
import { View, ImageBackground, TouchableOpacity, Text } from "react-native";

const SelectWorkoutType = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Start Workout")}
        style={{ height: "50%", width: "100%" }}
      >
        <ImageBackground
          source={require("../assets/runworkout1.jpeg")}
          style={{ widht: "100%", height: "100%" }}
        >
          <Text></Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity style={{ height: "50%", width: "100%" }}>
        <ImageBackground
          source={require("../assets/static1.jpeg")}
          style={{ widht: "100%", height: "100%" }}
        >
          <Text></Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default SelectWorkoutType;
