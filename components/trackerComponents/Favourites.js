import React from "react";
import { View, StyleSheet, Text } from "react-native";

const colors = ['gold', 'silver', 'firebrick']

export const Favourites = (props) => {
  const favs = props.favs;
  return (
    <View style={styles.containter}>
      <Text>Favourite Wokouts</Text>
      {favs.map((fav, index) => {
        const { count, imgURL, name } = fav;
        return (
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
            <View style={{width: '15%', alignItems: 'center'}}>
            <View style={[styles.circle, {borderColor: colors[index], width: 40  - index * 5, height: 40  - index * 5, borderRadius: 20 - index * 2.5}]}>
              <Text>{index + 1}</Text>
            </View>
            </View>
            <Text style={{width: '80%'}}>{name}</Text>
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
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5
  },
});
