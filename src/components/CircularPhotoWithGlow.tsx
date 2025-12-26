import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, View } from "react-native";

type Props = {
  uri?: string;
};

export default function CircularPhotoWithGlow({ uri }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1.1,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          }),
          Animated.timing(opacity, {
            toValue: 0.2,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          })
        ]),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          }),
          Animated.timing(opacity, {
            toValue: 0.6,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          })
        ])
      ])
    ).start();
  }, [opacity, scale]);

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[
          styles.glow,
          {
            opacity,
            transform: [{ scale }]
          }
        ]}
      />
      <View style={styles.circle}>
        {uri ? (
          <Image source={{ uri }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.placeholder]} />
        )}
      </View>
    </View>
  );
}

const SIZE = 64;

const styles = StyleSheet.create({
  wrapper: {
    width: SIZE,
    height: SIZE,
    alignItems: "center",
    justifyContent: "center"
  },
  glow: {
    position: "absolute",
    width: SIZE + 20,
    height: SIZE + 20,
    borderRadius: (SIZE + 20) / 2,
    backgroundColor: "rgba(138, 43, 226, 0.7)"
  },
  circle: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ffffff"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  placeholder: {
    backgroundColor: "#ccc"
  }
});






