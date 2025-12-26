import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { api } from "../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "OTP">;

export default function OTPScreen({ route, navigation }: Props) {
  const { phone } = route.params;
  const [otp, setOtp] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSecondsLeft(30);
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phone]);

  const onVerify = async () => {
    if (!/^\d{6}$/.test(otp)) {
      Alert.alert("त्रुटि", "कृपया 6 अंकों का OTP दर्ज करें।");
      return;
    }
    try {
      setLoading(true);
      const res = await api.verifyOtp(phone, otp);
      if (res.success) {
        // Reset premium state for new user login
        await api.savePremiumState({ isPremium: false });
        navigation.navigate("Purpose", { phone });
      } else {
        Alert.alert("त्रुटि", "OTP मान्य नहीं है।");
      }
    } catch {
      Alert.alert("त्रुटि", "OTP सत्यापित करने में समस्या आई।");
    } finally {
      setLoading(false);
    }
  };

  const onResend = async () => {
    try {
      setSecondsLeft(30);
      await api.sendOtp(phone);
    } catch {
      Alert.alert("त्रुटि", "OTP दोबारा भेजने में समस्या आई।");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP दर्ज करें</Text>
      <Text style={styles.subtitle}>{phone}</Text>

      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
        placeholder="6 अंकों का OTP"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onVerify}
        disabled={loading}
        accessibilityLabel="OTP सत्यापित करें"
      >
        <Text style={styles.buttonText}>
          {loading ? "कृपया प्रतीक्षा करें..." : "सत्यापित करें"}
        </Text>
      </TouchableOpacity>

      <View style={styles.resendRow}>
        <Text style={styles.timerText}>
          {secondsLeft > 0
            ? `दोबारा भेजें: ${secondsLeft} सेकंड`
            : "आप दोबारा OTP भेज सकते हैं"}
        </Text>
        <TouchableOpacity
          onPress={onResend}
          disabled={secondsLeft > 0}
          accessibilityLabel="OTP दोबारा भेजें"
        >
          <Text
            style={[
              styles.resendText,
              secondsLeft > 0 && { opacity: 0.4 }
            ]}
          >
            दोबारा भेजें
          </Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 24,
    fontFamily: "NotoSansDevanagari"
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
    fontSize: 18,
    letterSpacing: 4,
    textAlign: "center",
    fontFamily: "NotoSansDevanagari"
  },
  button: {
    marginTop: 24,
    backgroundColor: "#6a0dad",
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "NotoSansDevanagari"
  },
  resendRow: {
    marginTop: 24,
    alignItems: "center"
  },
  timerText: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "NotoSansDevanagari"
  },
  resendText: {
    fontSize: 16,
    color: "#6a0dad",
    fontFamily: "NotoSansDevanagari"
  }
});



