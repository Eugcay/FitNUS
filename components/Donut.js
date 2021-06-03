// import * as React from 'react';
// import {
//   Easing,
//   TextInput,
//   Animated,
//   Text,
//   View,
//   StyleSheet,
// } from 'react-native';
// import Constants from 'expo-constants';
// import Svg, { G, Circle, Rect } from 'react-native-svg';

// const AnimatedCircle = Animated.createAnimatedComponent(Circle);
// const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

// export default function Donut({
//   percentage = 75,
//   radius = 40,
//   strokeWidth = 10,
//   duration = 500,
//   color = "tomato",
//   delay = 0,
//   textColor,
//   max = 100
// }) {
//   const animated = React.useRef(new Animated.Value(0)).current;
//   const circleRef = React.useRef();
//   const inputRef = React.useRef();
//   const circumference = 2 * Math.PI * radius;
//   const halfCircle = radius + strokeWidth;

//   const animation = (toValue) => {
//     return Animated.timing(animated, {
//       delay: 1000,
//       toValue,
//       duration,
//       useNativeDriver: true,
//     }).start()
//   };

//   React.useEffect(() => {
//     animation(percentage);
//     animated.addListener((v) => {
//       const maxPerc = 100 * v.value / max;
//       const strokeDashoffset = circumference - (circumference * v.value / max);
//     //   if (inputRef?.current) {
//     //     inputRef.current.setNativeProps({
//     //       text: `${Math.round(v.value)}`,
//     //     });
//     //   }
//       if (circleRef?.current) {
//         circleRef.current.setNativeProps({
//           strokeDashoffset,
//         });
//       }
//     }, [max, percentage]);

    
//   });

//   return (
//     <View style={{ width: radius * 2, height: radius * 2 }}>
//       <Svg
//         height={radius * 2}
//         width={radius * 2}
//         viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
//         <G
//           rotation="-90"
//           origin={`${halfCircle}, ${halfCircle}`}>
//           <AnimatedCircle
//             ref={circleRef}
//             cx="50%"
//             cy="50%"
//             r={radius}
//             fill="transparent"
//             stroke={color}
//             strokeWidth={strokeWidth}
//             strokeLinecap="round"
//             strokeDashoffset={circumference}
//             strokeDasharray={circumference}
//           />
//           <Circle
//             cx="50%"
//             cy="50%"
//             r={radius}
//             fill="transparent"
//             stroke={color}
//             strokeWidth={strokeWidth}
//             strokeLinejoin="round"
//             strokeOpacity=".1"
//           />
//         </G>
//       </Svg>
//       <AnimatedTextInput
//         ref={inputRef}
//         underlineColorAndroid="transparent"
//         editable={false}
//         defaultValue="0"
//         style={[
//           StyleSheet.absoluteFillObject,
//           { fontSize: radius / 2, color: textColor ?? color },
//           styles.text,
//         ]}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   text: { fontWeight: '900', textAlign: 'center' },
// });

import React, { useEffect, useRef } from "react";
import { View, Easing, Animated, TextInput, StyleSheet } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const ProgressCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextValue = Animated.createAnimatedComponent(TextInput)

const Donut = (props) => {
  const val = props.val;
  const color = props.color ? props.color : "tomato";
  const max = props.max;
  const units = props.units;

  const RADIUS = 100;
  const STROKEWIDTH = 15;

  const animationValue = useRef(new Animated.Value(0)).current;
  const circ = useRef();
  const input = useRef()

  const half = RADIUS + STROKEWIDTH;
  const circumference = 2 * Math.PI * RADIUS;

  const animate = (toValue) => {
    return Animated.timing(animationValue, {
      toValue,
      duration: 1000,
      delay: 1000,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease)
    }).start();
  };

  useEffect(() => {
    animate(val);

    animationValue.addListener((v) => {
      if (circ?.current) {
        const strokeDashoffset =
          circumference - (v.value / max) * circumference;
        circ.current.setNativeProps({
          strokeDashoffset,
        });
      }
      if (input?.current) {
          input.current.setNativeProps({
              text: `${Math.floor(v.value)} ${units}`
          })
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Svg
        width={RADIUS * 2}
        height={RADIUS * 2}
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
        value='0'
        style={[StyleSheet.absoluteFillObject, {textAlign: 'center', fontSize: 20}]}
      />

    </View>
  );
};

export default Donut;

const styles = StyleSheet.create({
  container: {
    
    alignItems: "center",
    marginVertical: 10,
  },
});
