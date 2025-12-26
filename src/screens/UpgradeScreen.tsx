import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  Modal
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { api } from "../services/api";

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
  const [paymentStep, setPaymentStep] = useState<"idle" | "processing" | "success">("idle");
  const [selectedPlan, setSelectedPlan] = useState<"MONTHLY" | "YEARLY" | null>(null);

  // Fake payment and upgrade logic
  const onSelectPlan = async (planType: "MONTHLY" | "YEARLY") => {
    try {
      setSelectedPlan(planType);
      setUpgrading(true);
      setPaymentStep("processing");

      // Simulate payment processing delay (2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Upgrade to premium
      await api.upgradeToPremium(planType);

      // Show success state
      setPaymentStep("success");

      // Close modal and go back after 2 seconds
      setTimeout(() => {
        setPaymentStep("idle");
        setSelectedPlan(null);
        setUpgrading(false);
        navigation.goBack();
      }, 2000);
    } catch (e) {
      setPaymentStep("idle");
      setUpgrading(false);
      Alert.alert("त्रुटि", "अपग्रेड में समस्या आई। कृपया पुनः प्रयास करें।");
    }
  };

  return (
    <View style={styles.container}>
      {/* Payment Modal */}
      <Modal
        visible={upgrading}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {paymentStep === "processing" && (
              <>
                <ActivityIndicator size="large" color="#6a0dad" />
                <Text style={styles.modalTitle}>Payment Processing</Text>
                <Text style={styles.modalText}>
                  Fake Payment for {selectedPlan === "MONTHLY" ? "₹199/Month" : "₹999/Year"}
                </Text>
              </>
            )}

            {paymentStep === "success" && (
              <>
                <Text style={styles.successIcon}>✓</Text>
                <Text style={styles.successTitle}>Payment Successful!</Text>
                <Text style={styles.successText}>
                  You are now a Premium User
                </Text>
                <Text style={styles.successSubText}>
                  Premium features unlocked!
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>

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
            {upgrading && selectedPlan === "MONTHLY" ? "Processing..." : "Pay Now"}
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
            {upgrading && selectedPlan === "YEARLY" ? "Processing..." : "Pay Now"}
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
        disabled={upgrading}
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    width: "80%"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    fontFamily: "NotoSansDevanagari"
  },
  modalText: {
    fontSize: 14,
    marginTop: 8,
    color: "#666",
    fontFamily: "NotoSansDevanagari"
  },
  successIcon: {
    fontSize: 60,
    color: "#4caf50",
    fontWeight: "bold"
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    color: "#4caf50",
    fontFamily: "NotoSansDevanagari"
  },
  successText: {
    fontSize: 16,
    marginTop: 8,
    fontFamily: "NotoSansDevanagari"
  },
  successSubText: {
    fontSize: 14,
    marginTop: 4,
    color: "#666",
    fontFamily: "NotoSansDevanagari"
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
    backgroundColor: "#6a0bad",
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
    color: "#6a0bad",
    fontFamily: "NotoSansDevanagari"
  }
});


