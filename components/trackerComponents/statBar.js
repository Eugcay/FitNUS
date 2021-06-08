import React, {useState} from "react";
import { View, Dimensions, StyleSheet, Text} from "react-native";
import { Picker } from "@react-native-picker/picker";

const StatBar = (props) => {
  const location = "MPSH2";
  const mHR = "192BPM";
  const calBurnt = "238kCal";
  const [selectedBuddy, setSelectedBuddy] = useState("Eugene");

  return (
    <View style={styles.containerM}>
      <View style={styles.container1}>
        <View style={styles.textview}>
          <Text style={styles.text}>Location:</Text>
          <Text style={styles.text2}>{location}</Text>
        </View>
        <View style={styles.textview}>
          <Text style={styles.text}>Max Heart Rate:</Text>
          <Text style={styles.text2}>{mHR}</Text>
        </View>
        <View style={styles.textview}>
          <Text style={styles.text}>Calories Burnt:</Text>
          <Text style={styles.text2}>{calBurnt}</Text>
        </View>
      </View>
      <View style={styles.container2}>
        <Text style={styles.pickerhead}>Exercise Buddies:</Text>
        <Picker
          selectedValue={selectedBuddy}
          onValueChange={(buddy) => setSelectedBuddy({ buddy })}
          style={{ width: 140, height: 25, marginTop: 5}}
          mode={"dropdown"}
        >
          <Picker.Item label="Test123" value="Test123" />
          <Picker.Item label="Eugene" value="Eugene" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 0.5,
    backgroundColor: "#f2f2f2",
  },
  container2: {
    flex: 0.5,
    backgroundColor: "#f2f2f2",
    marginVertical: 7
  },
  containerM: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f2f2f2"
  },
  textview: {
    flex: 0.3,
    marginVertical: 7
  },
  text: {
      paddingLeft: 20
  },
  text2: {
    textAlignVertical: 'center',
    textAlign: 'left',
    paddingLeft: 20
    },
  pickerhead: {},
});

export default StatBar;
