import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import { QuoteCategory } from "../backend/quotes";

const LABELS: { key: QuoteCategory | "ALL"; label: string }[] = [
  { key: "ALL", label: "सब" },
  { key: "GOOD_MORNING", label: "गुड मॉर्निंग" },
  { key: "MOTIVATIONAL", label: "प्रेरक" },
  { key: "SHAYARI", label: "शायरी" },
  { key: "RELIGIOUS", label: "धार्मिक" },
  { key: "LOVE", label: "प्रेम" },
  { key: "FESTIVAL", label: "त्योहार" }
];

type Props = {
  selected: QuoteCategory | "ALL";
  onSelect: (cat: QuoteCategory | "ALL") => void;
};

export default function CategoryPills({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {LABELS.map((item) => {
          const isActive = selected === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.pill,
                isActive && styles.pillActive
              ]}
              onPress={() => onSelect(item.key)}
              accessibilityLabel={item.label}
            >
              <Text
                style={[
                  styles.pillText,
                  isActive && styles.pillTextActive
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
    backgroundColor: "#fff"
  },
  pillActive: {
    backgroundColor: "#6a0dad",
    borderColor: "#6a0dad"
  },
  pillText: {
    fontSize: 14,
    fontFamily: "NotoSansDevanagari",
    color: "#444"
  },
  pillTextActive: {
    color: "#fff"
  }
});




