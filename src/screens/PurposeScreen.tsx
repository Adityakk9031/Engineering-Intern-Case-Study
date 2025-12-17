import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Purpose">;

export default function PurposeScreen({ route, navigation }: Props) {
  const { phone } = route.params;

  const goNext = (purpose: "PERSONAL" | "BUSINESS") => {
    navigation.navigate("ProfileSetup", { phone, purpose });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>आपका उद्देश्य क्या है?</Text>
      <Text style={styles.subtitle}>
        व्यक्तिगत ब्रांडिंग या व्यवसाय के लिए सु-विचार डिज़ाइन करें
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => goNext("PERSONAL")}
        accessibilityLabel="व्यक्तिगत"
      >
        <Text style={styles.buttonText}>पर्सनल</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonOutline]}
        onPress={() => goNext("BUSINESS")}
        accessibilityLabel="व्यवसाय"
      >
        <Text style={[styles.buttonText, styles.buttonOutlineText]}>
          बिज़नेस
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    backgroundColor: "#f9f5ff"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "NotoSansDevanagari"
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    fontFamily: "NotoSansDevanagari"
  },
  button: {
    backgroundColor: "#6a0dad",
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
    marginBottom: 16
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "NotoSansDevanagari"
  },
  buttonOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#6a0dad"
  },
  buttonOutlineText: {
    color: "#6a0dad"
  }
});


