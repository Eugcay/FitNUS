import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

const HeaderTop = () => {
  const image = { uri: "https://drive.google.com/drive/u/4/folders/1u8buwpuBMa6TJSn6u145CwoZwDjArn1O" };
  //heartshap icon on press: <Ionicons name="heart-sharp" size={24} color="black" />

  return (
    <ImageBackground source={image} style={styles.imageheader}>
      <TouchableOpacity>
        <Ionicons name="heart-outline" size={24} color="black" />
      </TouchableOpacity>
      <View>
        <TextInput></TextInput>
      </View>
      <View>
        <View>
          <Text>Time</Text>
        </View>
        <View>
          <Text>Location</Text>
        </View>
        <View>
          <Text>Calories</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HeaderTop;

const styles = StyleSheet.create({
  imageheader: {
    width: Dimensions.get("window").width,
    height: "50%",
    borderBottomEndRadius: 20,
  },
});
