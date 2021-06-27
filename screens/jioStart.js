import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const JioStart = (props) => {
  const [img, setImg] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addImage}>
        <Text>Add Image</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, width: "90%", marginVertical: 10 }}>
        <View style={styles.formItem}>
          <Text>Workout Name</Text>
          <TextInput
            onChangeText={(text) => setName(text)}
            placeholder="Title"
          />
        </View>
        <View style={styles.formItem}>
          <Text>Location</Text>
          <TextInput
            onChangeText={(text) => setLocation(text)}
            placeholder="Location"
          />
        </View>
        <View style={styles.formItem}>
          <Text>Estimated Time</Text>
          <TextInput
            onChangeText={(text) => setTime(text)}
            placeholder="Duration"
          />
        </View>
        <View style={styles.formItem}>
          <Text>Description</Text>
          <TextInput
            onChangeText={(text) => setDescription(text)}
            placeholder="Description"
          />
        </View>
      </View>
    </View>
  );
};

export default JioStart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  addImage: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
    marginVertical: 15,
    height: 25,
    borderRadius: 5,
  },

  formItem: {
      marginVertical: 5
  }
});
