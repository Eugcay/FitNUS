import React from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Platform
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const SelectWorkoutType = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      
      <View style={{ height: "50%", width: "100%" }}>
        <TouchableOpacity onPress={() => navigation.navigate('Run Map')}>
          <ImageBackground
            source={require("../assets/runworkout1.jpeg")}
            style={styles.image}
            blurRadius={5}
          >
            <View style={styles.darken}>
              <Text style={styles.title}>Distance-based</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={{ height: "50%", width: "100%" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Start Workout")}>
          <ImageBackground
            source={require("../assets/static1.jpeg")}
            style={styles.image}
            blurRadius={8}
          >
            <View style={styles.darken}>
              <Text style={styles.title}>Static</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={22} color="whitesmoke" />
        <Text style={{ color: "whitesmoke", fontSize: 15, marginLeft: 7 }}>
          Back
        </Text>
      </TouchableOpacity>
      <View style={styles.label}>
        <Text style={{fontSize: 17, color: 'darkblue'}}>Select Workout Type</Text>
      </View>
    </View>
  );
};

export default SelectWorkoutType;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },

  title: {
    fontSize: 40,
    color: "whitesmoke",
    shadowRadius: 1,
    shadowColor: "black",
  },

  darken: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    width: "50%",
    borderRadius: 130,
    height: "5%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: Platform.OS === 'ios' ? Dimensions.get("screen").height * 47/100 : Dimensions.get("screen").height * 45/100 ,
    backgroundColor: "powderblue",
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
