import React from "react";
import PropTypes from "prop-types";

import { StyleSheet, Text, Animated } from "react-native";

class AnimatedPriceMarker extends React.Component {
  render() {
    const { title, selected, style } = this.props;

    const background = selected.interpolate({
      inputRange: [0, 1],
      outputRange: ["transparent", "#0B2A59"],
    });

    const border = selected.interpolate({
      inputRange: [0, 1],
      outputRange: ["transparent", "#FFF01A"],
    });

    const text = selected.interpolate({
      inputRange: [0, 1],
      outputRange: ["transparent", "#FFFFFF"],
    });

    return (
      <Animated.View style={[styles.container]}>
        <Animated.View
          style={[
            styles.bubble,
            {
              backgroundColor: background,
              borderColor: border,
            },
          ]}
        >
          <Animated.Text style={[styles.title, { color: text }]}>{title}</Animated.Text>
        </Animated.View>
        <Animated.View
          style={[styles.arrowBorder, { borderTopColor: border }]}
        />
        <Animated.View style={[styles.arrow, { borderTopColor: background }]} />
      </Animated.View>
    );
  }
}

AnimatedPriceMarker.propTypes = {
  title: PropTypes.string.isRequired,
  selected: PropTypes.object.isRequired,
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignSelf: "flex-start",
  },
  bubble: {
    flex: 0,
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "#FF5A5F",
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 5,
    borderColor: "blue",
    borderWidth: 0.5,
  },
  title: {
    fontSize: 10,
    margin: 5,
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 4,
    borderTopColor: "#FF5A5F",
    alignSelf: "center",
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 4,
    borderTopColor: "#D23F44",
    alignSelf: "center",
    marginTop: -0.5,
  },
  selectedBubble: {
    backgroundColor: "blue",
    borderColor: "blue",
  },
  selectedArrow: {
    borderTopColor: "blue",
  },
  selectedArrowBorder: {
    borderTopColor: "blue",
  },
});

export default AnimatedPriceMarker;
