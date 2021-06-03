import React from "react";
import {
  View,
  Easing,
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const ProgressCircle = Animated.createAnimatedComponent(Circle);

const Donut = (props) => {
  const percentage = props.percentage;
  const color = props.color ? props.color : "#0B2A59";

  const RADIUS = 200;
  const STROKEWIDTH = 30;
  const COLOR = "#0B2A59";

  const DURATION = "50"; //seconds to mins
  const WORKOUT = "Boxing"; //Change to workout object from database
  //const WORKOUTNAME = "Name";
  const UNITS = "minuites";
  const CALORIES = "500Kcal";
  const DISTANCE = "5KM";

  const half = RADIUS + STROKEWIDTH;
  const circumference = 2 * Math.PI * RADIUS;

  return (
    <View style={styles.container}>
      <Svg
        width={Dimensions.get("window").width}
        height={Dimensions.get("window").width}
        viewBox={`0 0 ${half * 2} ${half * 2}`}
        style={(position = "absolute")}
      >
        <G rotation="-90" origin={`${half}, ${half}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={COLOR}
            strokeWidth={STROKEWIDTH}
            r={RADIUS}
            strokeOpacity={0.2}
          />

          <ProgressCircle
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={STROKEWIDTH}
            r={RADIUS}
            strokeOpacity={0.8}
            strokeDasharray={circumference}
            strokeDashoffset={0.1 * circumference}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <View style={styles.innercircle}>
        <Text style={styles.bigwords}>{DURATION}</Text>
        <Text style={styles.smallwords}>{UNITS}</Text>
        <Text style={styles.smallwords}>of</Text>
        <TouchableOpacity style={styles.specialbox}>
          <Text style={styles.specialwords}>{WORKOUT}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Donut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  innercircle: {
    position: "absolute",
    alignItems: "center",
    left: "0.5"
  },
  bigwords: {
    textAlign: "center"
  },
  smallwords: {
    textAlign: "center"
  },
  specialwords:{
    textAlign: "center"
  },
  specialbox: {
    alignSelf: "center"
  }
});
