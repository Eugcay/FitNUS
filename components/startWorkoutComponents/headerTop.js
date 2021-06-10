import React, { useState } from "react";
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
const image = "../../assets/logan-weaver-9D_rUDe7xvA-unsplash.jpg";

const HeaderTop = () => {
  const [title, onChangeTitle] = useState(null);
  const [heart, onLike] = useState(false);
  const onLikePress = () => onLike(!heart);
  // heartshap icon on press: <Ionicons name="heart-sharp" size={24} color="black" />

  return (
    <ImageBackground source={require(image)} style={styles.imageheader}>
      <View>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1}}
          onChangeTitle={(text) => onChangeTitle(text)}
          title={title}
          maxLength={40}
          defaultValue={"Custom Workout"}
        />
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
      <TouchableOpacity style={styles.heart} onPress={onLikePress}>
        <Ionicons
          name={heart ? "heart-sharp" : "heart-outline"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default HeaderTop;

const styles = StyleSheet.create({
  imageheader: {
    width: Dimensions.get("window").width,
    height: 180,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },
  heart: {
    position: "absolute",
    top: 20,
    left: 100,
  },
});
