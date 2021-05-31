import React from "react";
import {
  Text,
  View,
  StyleSheet,
  fontFamily,
  TouchableOpacity,
  Image,
} from "react-native";

const DayPicker = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.text}>m</Text>
        <Image source={require("../../assets/dayButton.jpg")} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.text}>t</Text>
        <Image source={require("../../assets/dayButton.jpg")} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.text}>w</Text>
        <Image source={require("../../assets/dayButton.jpg")} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.text}>t</Text>
        <Image source={require("../../assets/dayButton.jpg")} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.text}>f</Text>
        <Image source={require("../../assets/dayButton.jpg")} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.text}>s</Text>
        <Image source={require("../../assets/dayButton.jpg")} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.text}>s</Text>
        <Image source={require("../../assets/dayButton.jpg")} style={styles.image} />
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
    backgroundColor: "grey",
    width: "30%",
    height: 45,
    borderRadius: 100,
  },
  text: {
    textAlign: "center",
  },
  image: {
    marginVertical: 5,
    margin: 5,
    height: 30,
    width: 30,
    alignSelf: "center",
    borderRadius: 120,
    backgroundColor: "#D3D3D3",
  },
});

export default DayPicker;
