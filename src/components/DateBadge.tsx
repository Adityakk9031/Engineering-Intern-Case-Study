import React from "react";
import { Text, View, StyleSheet } from "react-native";

const hindiMonths = [
  "जनवरी",
  "फ़रवरी",
  "मार्च",
  "अप्रैल",
  "मई",
  "जून",
  "जुलाई",
  "अगस्त",
  "सितंबर",
  "अक्टूबर",
  "नवंबर",
  "दिसंबर"
];

type Props = {
  date?: Date;
};

export default function DateBadge({ date = new Date() }: Props) {
  const day = date.getDate();
  const month = hindiMonths[date.getMonth()];

  return (
    <View style={styles.container} accessibilityLabel="तारीख़ बैज">
      <Text style={styles.text}>{`${day} ${month}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6a0dad",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start"
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "NotoSansDevanagari"
  }
});




