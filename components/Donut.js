import React, { useEffect, useRef, useState } from "react";
import { View, Text, Easing, Animated, TextInput, StyleSheet } from "react-native";
import Svg, { G, Circle } from "react-native-svg";



const ProgressCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextValue = Animated.createAnimatedComponent(TextInput)

const Donut = (props) => {
  const val = props.val;
  const color = props.color ? props.color : "#0B2A59";
  const max = props.max;
  const units = props.units;

  const RADIUS = 130;
  const STROKEWIDTH = 20;
//   const DURATION = "50"; //seconds to mins
//   const WORKOUT = "Boxing"; //Change to workout object from database
//   //const WORKOUTNAME = "Name";
//   const UNITS = "minuites";
//   const CALORIES = "500Kcal";
//   const DISTANCE = "5KM"

  const animationValue = useRef(new Animated.Value(0)).current;
  const circ = useRef();
  const input = useRef()
  const [textStyle, setTextStyle] = useState({})

  const half = RADIUS + STROKEWIDTH;
  const circumference = 2 * Math.PI * RADIUS;

  const animate = (toValue) => {
    return Animated.timing(animationValue, {
      toValue,
      duration: 500,
      delay: 200,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease)
    }).start();
  };

  useEffect(() => {
    
    animate(val);

    animationValue.addListener((v) => {
      if (circ?.current) {
        const strokeDashoffset = v.value < max 
          ? circumference - (v.value / max) * circumference
          : 0;
        circ.current.setNativeProps({
          strokeDashoffset,
        });
      }
      if (input?.current) {
        if (v.value > max) {
          setTextStyle({color:"#0B2A59", fontWeight:"bold", textShadowColor: "gold", textShadowOffset: {width: -1, height: 1},
          textShadowRadius: 10})
        }
          input.current.setNativeProps({
              text: `${units !== "km" ? (Math.round(v.value)) : (v.value.toFixed(2))} ${units}`,
          })
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Svg
        width={half * 2}
        height={half * 2}
        viewBox={`0 0 ${half * 2} ${half * 2}`}
      >
        <G rotation="-90" origin={`${half}, ${half}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={STROKEWIDTH}
            r={RADIUS}
            strokeOpacity={0.2}
            fill="transparent"
          />

          <ProgressCircle
            ref={circ}
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={STROKEWIDTH}
            r={RADIUS}
            strokeOpacity={0.8}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <AnimatedTextValue
        ref={input}
        underlineColorAndroid='transparent'
        defaultValue='0'
        style={[StyleSheet.absoluteFillObject, {textAlign: 'center', fontSize: 20,}, textStyle]}
      />
    <Text>out of {max}</Text>
    </View>
  );
};

export default Donut;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
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
