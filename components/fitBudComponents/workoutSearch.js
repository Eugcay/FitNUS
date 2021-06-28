import { filter } from "async";
import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, FlatList, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { set } from "react-native-reanimated";

const WorkoutSearch = ({ navigation, workouts, jio }) => {
  const complete = workouts;
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (text) => {
    if (text) {
      const results = complete.filter((item) => {
        const check = item.data.name.toUpperCase();
        return check.indexOf(text.toUpperCase()) > -1;
      });
      setFiltered(results);
      setSearchQuery(text);
    } else {
      setFiltered([]);
      setSearchQuery(text);
    }
  };

  const renderItem = ({ item }) => {
    return (
      // Flat List Item
      <View style={styles.result}>
        <Text
          style={styles.searchItem}
          onPress={() =>
            navigation.navigate("Workout Details", {
              workout: item.data,
              jio: jio ? jio : null
            })
          }
        >
          {item.data.name}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Find a Workout"
        theme={{ roundness: 10 }}
        style={{ color: "#C0C0C0" }}
        onChangeText={(text) => onChangeSearch(text)}
        value={searchQuery}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />
    </View>
  );
};

export default WorkoutSearch;

const styles = StyleSheet.create({
  searchItem: {
    padding: 15,
    fontSize: 15,
  },

  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 15,
  },

  result: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#C0C0C0",
  },
});
