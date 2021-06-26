import React from "react";
import { View, Text } from "react-native";

export const NoData = () => {
  return (
    <View
      style={{
        flex: 1,
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        alignSelf: "center",
      }}
    >
      <Text>{"No Muscles Used :("}</Text>
    </View>
  );
};
