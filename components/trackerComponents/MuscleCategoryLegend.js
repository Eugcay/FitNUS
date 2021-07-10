import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function PieLegend(props) {
  const data = props.data.map(cat => ({...cat, key: cat.id}))
  return <View style={styles.legend}>
      {data.map(cat => {
          return (
              <View key={cat.key} style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 5}}>
                  <View style={[styles.circle, {backgroundColor: cat.color}]}></View>
                  <Text style={{fontSize: 13}}>{cat.key}</Text>
              </View>
          )
      })}
  </View>;
}

const styles = StyleSheet.create({
  legend: {
    
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  circle: {
      width: 7,
      height: 7,
      borderRadius: 4,
      marginHorizontal: 2
  }
});
