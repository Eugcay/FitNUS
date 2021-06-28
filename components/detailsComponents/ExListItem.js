import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

const ExListItem = ({ item }) => {
    return (
      <ListItem style={{ marginVertical: 5 }}>
        <ListItem.Content>
          <ListItem.Title>{item.data.name}</ListItem.Title>
          {item.sets.map((set) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <View style={styles.circle}>
                <Text>{set.key}</Text>
              </View>
              <Text>
                {set.weight} kg x {set.reps} reps
              </Text>
            </View>
          ))}
        </ListItem.Content>
      </ListItem>
    );
  };

  export default ExListItem

  const styles = StyleSheet.create({
    circle: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "gray",
        marginHorizontal: 12,
        width: 30,
        height: 30,
        borderRadius: 50,
      },
  })