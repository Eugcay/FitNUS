import React from "react";
import { View, Text } from "react-native";

const RunDetails = (props) => {
  const run = props.workout;
  const id = props.id;
  return (
    <View>
      <Text>Run Details</Text>
    </View>
  );
};

export default RunDetails;
