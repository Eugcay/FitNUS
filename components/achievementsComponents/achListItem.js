import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const achListItem = ({ item }) => {
  console.log(item.data);
  return (
    <View style={styles.container}>
      {/* Icon */}
      {item.data.category === "run" ? (
        <View style={styles.icons}>
          <MaterialCommunityIcons
            name="run-fast"
            size={24}
            color="black"
          />
        </View>
      ) : item.data.category === "workout" ? (
        <View style={styles.icons}>
          <MaterialCommunityIcons
            name="weight-lifter"
            size={24}
            color="black"
          />
        </View>
      ) : (
        <View style={styles.icons}>
          <MaterialCommunityIcons
            name="account-group"
            size={24}
            color="black"
          />
        </View>
      )}
      <View style={styles.words}>
        <Text style={styles.title}>{item.data.title}</Text>
        <Text style={styles.description}>{item.data.description}</Text>
      </View>
    </View>
  );
};

export default achListItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    backgroundColor: 'white',
    marginVertical: 5,
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: "row",
    height: 100,
    flex: 1,
    paddingVertical: 10
  },
  icons: {
    paddingLeft: 10,
    alignSelf: "center",
  },
  words: {
    paddingTop: 12,
    paddingLeft: 10
  },
  description: {
    paddingTop: 2,
    paddingRight: 50
  },
  title: {
    fontWeight: "bold"
  }
});
