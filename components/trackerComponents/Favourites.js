import React from "react";
import { View, StyleSheet, Text } from "react-native";

const colors = ['gold', 'silver', 'firebrick']

export const Favourites = (props) => {
  const pb = props.pb
  const favs = props.favs.map(fav => ({...fav, best: pb.find(record => fav.name === record.exercise).best}));
  
  return (
    <View style={styles.containter}>
      <Text>Favourite Wokouts</Text>
      {favs.map((fav, index) => {
        const { count, imgURL, name, best} = fav;
        return (
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
            <View style={{width: '13%', marginRight: 8, alignItems: 'center'}}>
            <View style={[styles.circle, {borderColor: colors[index], width: 45  - index * 5, height: 45  - index * 5, borderRadius: 22.5 - index * 2.5}]}>
              <Text>{index + 1}</Text>
            </View>
            </View>
            <View style={{width: '80%'}}>
            <Text style={{fontSize: 16, fontWeight:'bold'}}>{name}</Text>
            <Text>PB: {best} kg</Text>
            </View>
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
    borderWidth: 1.3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5
  },
});
