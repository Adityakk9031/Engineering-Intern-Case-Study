import React, { useState } from "react";
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

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

export default function WelcomeScreen({ navigation }: Props) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const onContinue = async () => {
    const trimmed = phone.replace(/\D/g, "");
    if (trimmed.length !== 10) {
      Alert.alert("त्रुटि", "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें।");
      return;
    }
    const fullPhone = `+91${trimmed}`;
    try {
      setLoading(true);
      await api.sendOtp(fullPhone);
      navigation.navigate("OTP", { phone: fullPhone });
    } catch (e) {
      Alert.alert("त्रुटि", "OTP भेजने में समस्या आई।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PsyTech Suvichar</Text>
      <Text style={styles.subtitle}>अपना मोबाइल नंबर दर्ज करें</Text>

      <View style={styles.phoneRow}>
        <View style={styles.countryCodeBox}>
          <Text style={styles.countryCodeText}>+91</Text>
        </View>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          maxLength={10}
          value={phone}
          onChangeText={setPhone}
          placeholder="मोबाइल नंबर"
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={onContinue}
        disabled={loading}
        accessibilityLabel="जारी रखें"
      >
        <Text style={styles.buttonText}>
          {loading ? "कृपया प्रतीक्षा करें..." : "जारी रखें"}
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
    fontSize: 28,
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
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24
  },
  countryCodeBox: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginRight: 8,
    backgroundColor: "#fff"
  },
  countryCodeText: {
    fontSize: 16,
    fontFamily: "NotoSansDevanagari"
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
    fontSize: 16,
    fontFamily: "NotoSansDevanagari"
  },
  button: {
    backgroundColor: "#6a0dad",
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "NotoSansDevanagari"
  }
});


