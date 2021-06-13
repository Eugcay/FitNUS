import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { Searchbar } from "react-native-paper";
import firebase from "firebase";

export default function AddExercises(props) {
  const [exercises, setExercises] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [imageURL, setURL] = useState(null);

  const onChangeSearch = (text) => {
    if (text) {
      const results = exercises.filter((item) => {
        const reference = item.data.name.toUpperCase();
        return reference.indexOf(text.toUpperCase()) > -1;
      });
      setFiltered(results);
      setSearchQuery(text);
    } else {
      setFiltered(exercises);
      setSearchQuery("");
    }
  };

  const selectExercise = (exercise) => {
    let data = [...selected];
    if (selected.includes(exercise)) {
      const index = data.indexOf(exercise);
      data.splice(index, 1);
    } else {
      data = data.concat(exercise);
    }
    setSelected(data);
    console.log(data);
    console.log(selected);
  };

  const addToWorkout = () => {
    props.navigation.navigate({
      name: "Start Workout",
      params: { exercises: selected },
      merge: true,
    });
  };


  const renderItem = ({ item }) => {
    const check = selected.includes(item.key);

    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() =>
            props.navigation.navigate("Exercise Details", { exercise: item })
          }
        >
          <Image
            source={
              item.data.photo
                ? { uri: item.data.photo }
                : require("../assets/boxing.jpeg")
            }
            style={styles.image}
          />
          <Text style={styles.searchResult}>{item.data.name}</Text>
        </TouchableOpacity>
        <CheckBox
          center
          checked={check}
          onPress={() => selectExercise(item.key)}
        />
      </View>
    );
  };

  useEffect(() => {
    const fetchExercises = firebase
      .firestore()
      .collection("exercise")
      
      .onSnapshot((querySnapshot) => {
        const complete = [];
        querySnapshot.forEach((documentSnapshot) => {
          complete.push({
            key: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setExercises(complete);
        setFiltered(complete);
      });

    return fetchExercises;
  }, []);

  return (
    <SafeAreaView style={{ marginHorizontal: 10, marginBottom: 130 }}>
      <View>
        <Searchbar
          placeholder="Choose exercises"
          theme={{ roundness: 10 }}
          style={styles.searchBar}
          onChangeText={(text) => onChangeSearch(text)}
          value={searchQuery}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        extraData={selected}
      />
      <TouchableOpacity style={styles.addAll} onPress={() => addToWorkout()}>
        <Text>Add to workout ({selected.length})</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginVertical: 10,
    color: "#C0C0C0",
  },

  searchResult: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    fontSize: 16,
    borderBottomWidth: 1,
    width: "77%",
  },

  image: {
    height: "99%",
    width: 40,
    alignSelf: "center",
    marginRight: 5,
  },

  checkbox: {
    alignSelf: "center",
    height: "36%",
    width: 18,
    borderWidth: 1,
    borderColor: "black",
  },

  addAll: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10,
    width: "90%",
    height: 40,
    backgroundColor: "lightskyblue",
    justifyContent: "center",
    opacity: 0.6,
    borderRadius: 7,
  },
});
