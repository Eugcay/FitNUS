import React from "react";
import { View, Easing, Animated, Text, StyleSheet } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const ProgressCircle = Animated.createAnimatedComponent(Circle)

const Donut = (props) => {
  const percentage = props.percentage
  const color = props.color ? props.color : 'tomato'
  
   
  const RADIUS = 100;
  const STROKEWIDTH = 15;
  const COLOR = "tomato";
  const DURATION = 500;

  const half = RADIUS + STROKEWIDTH;
  const circumference = 2 * Math.PI * RADIUS;

  return (
    <View style={styles.container}>
      <Svg
        width={RADIUS * 2}
        height={RADIUS * 2}
        viewBox={`0 0 ${half * 2} ${half * 2}`}
      >
        <G rotation='-90' origin={`${half}, ${half}`}>
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
            strokeDashoffset={0.4 * circumference}
            strokeLinecap='round'
          />
        </G>
      </Svg>
    </View>
  );
};

export default Donut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: 10,
  },
});
