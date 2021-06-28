import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ListItem } from "react-native-elements";

const ExercisesLogged = (props) => {
  const { item, editExercise, replaceItem, deleteItem, key } = props;

  const completedSets = (item) => {
    return item.sets.filter((content) => content.completed).length;
  };

  return (
    <TouchableOpacity onPress={() => editExercise(item)}>
      <ListItem.Swipeable
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        bottomDivider={true}
        rightContent={
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => replaceItem(item)}
              style={{
                minHeight: "100%",
                width: "50%",
                backgroundColor: "royalblue",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
                marginRight: 1,
              }}
            >
              <MaterialCommunityIcons
                name="swap-horizontal"
                size={24}
                color="white"
              />
              <Text style={{ color: "white", fontSize: 16 }}>Replace</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteItem(item)}
              style={{
                minHeight: "100%",
                width: "50%",
                backgroundColor: "red",
                alignItems: "center",
                borderRadius: 4,
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons name="delete" size={24} color="white" />
              <Text style={{ color: "white", fontSize: 16 }}>Delete</Text>
            </TouchableOpacity>
          </View>
        }
      >
        <View style={styles.circle}>
          <Text>{key}</Text>
        </View>
        <ListItem.Content>
          <ListItem.Title>{item.data.name}</ListItem.Title>
          <ListItem.Subtitle>
            {item.sets
              ? `${completedSets(item)}/${item.sets.length} sets completed`
              : "0/1 sets completed"}
          </ListItem.Subtitle>
        </ListItem.Content>
        <TouchableOpacity>
          <MaterialCommunityIcons name="dots-vertical" size={23} />
        </TouchableOpacity>
      </ListItem.Swipeable>
    </TouchableOpacity>
  );
};


export default ExercisesLogged;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "contain",
    alignItems: "center",
  },
  
  circle: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    marginHorizontal: 12,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
