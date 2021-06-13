import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import HTML from "react-native-render-html";


export const ExerciseDetails = (props) => {
  
  const { exercise } = props.route.params;
  console.log(exercise)
  const img = exercise.data.photo;
  return (
    <View>
      {img ? (
        <Image source={{ uri: img }} style={styles.image} />
      ) : (
        <Image
          source={require("../assets/National_University_of_Singapore_logo_NUS.png")}
          style={styles.image}
        />
      )}

      <Text>{exercise.data.name}</Text>
      <HTML html={exercise.data.description} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "50%",
    minHeight: 250,
  },
});
