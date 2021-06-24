import React from "react";
import { View, StyleSheet, Text } from "react-native";

export const Favourites = (props) => {
  const favs = props.favs;
  return (
    <View style={styles.containter}>
      <Text>Favourite Wokouts</Text>
      {favs.map((fav, index) => {
        const { count, imgURL, name } = fav;
        return (
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
            <View style={styles.circle}>
              <Text>{index + 1}</Text>
            </View>
            <Text>{name}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    marginVertical: 15,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  circle: {
    height: 25,
    width: 25,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5
  },
});
