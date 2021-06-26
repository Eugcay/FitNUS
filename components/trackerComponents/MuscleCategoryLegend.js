import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function PieLegend(props) {
  const data = props.data.map(cat => ({...cat, key: cat.id}))
  return <View style={styles.legend}>
      {data.map(cat => {
          return (
              <View key={cat.key} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 3}}>
                  <View style={[styles.circle, {backgroundColor: cat.color}]}></View>
                  <Text style={{fontSize: 13}}>{cat.key}</Text>
              </View>
          )
      })}
  </View>;
}

const styles = StyleSheet.create({
  legend: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  circle: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginHorizontal: 2
  }
});
