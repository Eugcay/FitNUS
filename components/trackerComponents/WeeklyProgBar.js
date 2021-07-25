import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import * as Progress from "react-native-progress";

const WeeklyProgBar = ({ freq, goal, type }) => {
  return (
    <View style={{ marginHorizontal: 5, alignItems: "center" }}>
      <View style={styles.container}>
        <Text style={{fontSize: 18, color: type === "Run" ? "forestgreen" : "blue"}}>{type === 'Run' ? freq.toFixed(2): freq}</Text>
        <Text>
          {" out of " + (goal)}{" "}
          {type === "Run" ? "km completed!" : "workouts completed!"}
        </Text>
      </View>

      <Progress.Bar
        animated
        progress={(freq) / (goal)}
        width={Dimensions.get("screen").width * 0.85}
        borderColor={
          freq > (goal)
            ? "gold"
            : type === "Run" ? "darkgreen" :"blue"
        }
        color= {type === 'Run' ? "forestgreen" : 'blue'}
        borderWidth={(freq > goal) ? 2 : 1.5}
        height={15}
      />
    </View>
  );
};

export default WeeklyProgBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },

});
