import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const achListItem = ({ item }) => {
  const stack = item.data?.periodList
    ? ` x${item.data.periodList.length}`
    : null;
  const freq = item.data?.periodList
  const iconColor = freq > 50 ? "#FF0000" : freq > 10 ? "#FFFF00" : 'black'

  return (
    <View>
      <TouchableOpacity style={styles.container}>
        {/* Icon */}
        {item.data.cat === "run" ? (
          <View style={styles.icons}>
            <MaterialCommunityIcons
              name="run-fast"
              size={24}
              color={iconColor}
            />
          </View>
        ) : item.data.cat === "workout" ? (
          <View style={styles.icons}>
            <MaterialCommunityIcons
              name="weight-lifter"
              size={24}
              color={iconColor}
            />
          </View>
        ) : (
          <View style={styles.icons}>
            <MaterialCommunityIcons
              name="account-group"
              size={24}
              color={iconColor}
            />
          </View>
        )}
        <View style={styles.words}>
          <Text style={styles.title}>
            {item.data.title} {stack}
          </Text>
          <Text style={styles.description}>{item.data.description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default achListItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: "white",
    marginVertical: 5,
    borderColor: "gray",
    borderWidth: 1,
    flexDirection: "row",
    height: 100,
    flex: 1,
    paddingVertical: 10,
  },
  icons: {
    paddingLeft: 10,
    alignSelf: "center",
  },
  words: {
    paddingTop: 12,
    paddingLeft: 10,
  },
  description: {
    paddingTop: 2,
    paddingRight: 50,
  },
  title: {
    fontWeight: "bold",
  },
});
