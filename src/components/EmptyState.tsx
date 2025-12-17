import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  title: string;
  message: string;
  icon?: string;
};

export default function EmptyState({ title, message, icon = "📭" }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24
  },
  icon: {
    fontSize: 48,
    marginBottom: 16
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "NotoSansDevanagari"
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    color: "#777",
    fontFamily: "NotoSansDevanagari"
  }
});
