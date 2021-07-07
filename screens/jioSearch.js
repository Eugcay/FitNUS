import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Searchbar } from "react-native-paper";
import firebase from "firebase";

const JioSearch = (props) => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  console.log(props.route.params?.addToJio ? 'yes' : 'no')

  const fetchResults = (text) => {
    setQuery(text);
    if (text === "") {
      setResults([]);
    } else {
      firebase
        .firestore()
        .collection("users")
        .where("name", ">=", text)
        .get()
        .then((snapshot) => {
          const users = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          setResults(users);
        });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.route.params?.addToJio
            ? props.navigation.navigate({
                name: "Likes",
                params: { user: item },
                merge: "true",
              })
            : props.navigation.navigate("Profile", { user: item })
        }
        style={styles.searchItem}
      >
        <Image
          source={
            item.data?.photoURL
              ? { uri: item.data.photoURL }
              : require("../assets/user.png")
          }
          style={styles.image}
        />
        <Text style={{ fontSize: 17 }}>{item.data.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Find a Friend!"
        theme={{ roundness: 10 }}
        style={styles.searchBar}
        value={query}
        onChangeText={(text) => fetchResults(text)}
        clearTextOnFocus={true}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default JioSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },

  searchBar: {
    marginVertical: 10,
    color: "#C0C0C0",
  },

  searchItem: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: "#D3D3D3",
  },
});
