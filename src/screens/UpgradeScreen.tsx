import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ToastAndroid,
  Alert,
  ActivityIndicator
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Upgrade">;

function showToast(message: string) {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert("", message);
  }
}

export default function UpgradeScreen({ navigation }: Props) {
  const [upgrading, setUpgrading] = useState(false);

  const onSelectPlan = async (planType: "MONTHLY" | "YEARLY") => {
    try {
      setUpgrading(true);
      // UI-only per requirement: just show a toast
      showToast("Payment flow coming soon");
    } catch (e) {
      Alert.alert("त्रुटि", "अपग्रेड में समस्या आई। कृपया पुनः प्रयास करें।");
    } finally {
      setUpgrading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upgrade to Premium</Text>

      <View style={styles.previewBox}>
        <Text style={styles.previewTitle}>प्रीमियम प्रीव्यू</Text>
        <Text style={styles.previewSubtitle}>
          आपका नाम स्टाइलिश तरीके से हर डिज़ाइन पर
        </Text>
      </View>

      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Monthly</Text>
        <Text style={styles.planPrice}>₹199</Text>
        <Text style={styles.planDesc}>एक महीने के लिए प्रीमियम</Text>
        <TouchableOpacity
          style={styles.planButton}
          onPress={() => onSelectPlan("MONTHLY")}
          disabled={upgrading}
          accessibilityLabel="मंथली प्लान चुनें"
        >
          <Text style={styles.planButtonText}>
            {upgrading ? "प्रोसेस हो रहा है..." : "चुनें"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Yearly</Text>
        <Text style={styles.planPrice}>₹999</Text>
        <Text style={styles.planDesc}>₹83 / महीना (बेस्ट वैल्यू)</Text>
        <TouchableOpacity
          style={styles.planButton}
          onPress={() => onSelectPlan("YEARLY")}
          disabled={upgrading}
          accessibilityLabel="ईयरली प्लान चुनें"
        >
          <Text style={styles.planButtonText}>
            {upgrading ? "प्रोसेस हो रहा है..." : "चुनें"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.freeSection}>
        <Text style={styles.freeTitle}>फ्री वर्शन में:</Text>
        <Text style={styles.freeItem}>- सीमित टेम्पलेट्स</Text>
        <Text style={styles.freeItem}>- बेसिक नाम और फोटो</Text>
        <Text style={styles.freeItem}>- प्रीमियम फ़ील्ड्स लॉक्ड</Text>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>वापस जाएँ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 48,
    backgroundColor: "#f9f5ff"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "NotoSansDevanagari"
  },
  previewBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0d1ff"
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    fontFamily: "NotoSansDevanagari"
  },
  previewSubtitle: {
    fontSize: 14,
    fontFamily: "NotoSansDevanagari"
  },
  planCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#6a0dad"
  },
  planTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    fontFamily: "NotoSansDevanagari"
  },
  planPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    fontFamily: "NotoSansDevanagari"
  },
  planDesc: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "NotoSansDevanagari"
  },
  planButton: {
    alignSelf: "flex-start",
    backgroundColor: "#6a0dad",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20
  },
  planButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "NotoSansDevanagari"
  },
  freeSection: {
    marginTop: 16
  },
  freeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    fontFamily: "NotoSansDevanagari"
  },
  freeItem: {
    fontSize: 14,
    fontFamily: "NotoSansDevanagari"
  },
  backButton: {
    marginTop: 24,
    alignItems: "center"
  },
  backText: {
    fontSize: 16,
    color: "#6a0dad",
    fontFamily: "NotoSansDevanagari"
  }
});


