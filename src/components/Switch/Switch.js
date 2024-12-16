import React, { useState, useRef } from "react";
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Svg, { Path, Circle, Defs, RadialGradient, Stop } from "react-native-svg";

const DayNightToggle = () => {
  const [isNight, setIsNight] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleSwitch = () => {
    setIsNight(!isNight);
    Animated.timing(animation, {
      toValue: isNight ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFECB3", "#2C3E50"], // Daylight yellow to Night dark blue
  });

  const sliderPosition = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 32], // Move the slider circle
  });

  return (
    <TouchableWithoutFeedback onPress={toggleSwitch}>
      <Animated.View style={[styles.container, { backgroundColor }]}>
        {/* SVG for Mountains and Sun */}
        <Svg
          height="30"
          width="60"
          viewBox="0 0 60 30"
          style={{ position: "absolute" }}
        >
          <Defs>
            <RadialGradient
              id="sunGradient"
              cx="15"
              cy="10"
              r="10"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0" stopColor="white" stopOpacity="1" />
              <Stop offset="1" stopColor="#FFD54F" stopOpacity="0.6" />
            </RadialGradient>
          </Defs>

          {/* Mountains */}
          <Path
            d="M0 30 L15 20 L30 30 L45 25 L60 30 Z"
            fill={isNight ? "#35495E" : "#FFC107"}
          />
          <Path
            d="M0 30 L10 25 L20 30 L35 22 L50 30 Z"
            fill={isNight ? "#607D8B" : "#FFB74D"}
          />

          {/* Sun */}
          {!isNight && (
            <Circle cx="15" cy="10" r="8" fill="url(#sunGradient)" />
          )}

          {/* Moon and Crescent */}
          {isNight && (
            <>
              <Circle cx="45" cy="10" r="6" fill="white" />
              <Circle cx="47" cy="10" r="5" fill="#2C3E50" />
            </>
          )}
        </Svg>

        {/* Slider */}
        <Animated.View
          style={[
            styles.slider,
            {
              left: sliderPosition,
            },
          ]}
        >
          <View style={styles.circle} />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    padding: 2,
    overflow: "hidden",
  },
  slider: {
    position: "absolute",
    top: 2,
    height: 26,
    width: 26,
    backgroundColor: "white",
    borderRadius: 13,
  },
  circle: {
    flex: 1,
    borderRadius: 13,
    backgroundColor: "white",
  },
});

export default DayNightToggle;
