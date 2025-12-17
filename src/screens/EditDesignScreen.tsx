import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Alert
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { RootStackParamList } from "../App";
import { api } from "../services/api";
import { UserProfile } from "../backend/user";

type Props = NativeStackScreenProps<RootStackParamList, "EditDesign">;

export default function EditDesignScreen({ navigation }: Props) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);
  const [showDate, setShowDate] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tab, setTab] = useState<"PERSONAL" | "BUSINESS">("PERSONAL");
  const [upgradeVisible, setUpgradeVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [aboutYourself, setAboutYourself] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [organizationDetails, setOrganizationDetails] = useState("");

  useEffect(() => {
    // Load profile
    api
      .loadProfile()
      .then((p) => {
        if (p) {
          setProfile(p);
          setName(p.name);
          setPhotoUri(p.photoUri);
          setShowDate(p.showDate);
          setTab(p.purpose);
          if (p.dateOverride) {
            setSelectedDate(new Date(p.dateOverride));
          }
        }
      })
      .catch(() => {
        Alert.alert("त्रुटि", "प्रोफ़ाइल लोड नहीं हो सकी।");
      });

    // Load premium state
    api
      .getPremiumState()
      .then((state) => {
        setIsPremium(state.isPremium);
      })
      .catch(() => {
        setIsPremium(false);
      });
  }, []);

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "अनुमति आवश्यक",
          "गैलरी का उपयोग करने के लिए अनुमति दें।"
        );
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        // Use Images only; this API is stable across Expo SDKs
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8
      });
      if (!result.canceled) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch (error) {
      console.warn("Image picker error:", error);
      Alert.alert("त्रुटि", "फोटो चुनने में समस्या आई।");
    }
  };

  const onSave = async () => {
    if (!profile) return;
    try {
      setSaving(true);
      const updated: UserProfile = {
        ...profile,
        name,
        photoUri,
        showDate,
        dateOverride: selectedDate.toISOString()
      };
      await api.saveProfile(updated);
      navigation.goBack();
    } catch {
      Alert.alert("त्रुटि", "परिवर्तन सहेजने में समस्या आई।");
    } finally {
      setSaving(false);
    }
  };

  const lockedField = (label: string) => (
    <TouchableOpacity
      key={label}
      style={styles.lockedField}
      onPress={() => setUpgradeVisible(true)}
      accessibilityLabel={`${label} प्रीमियम के लिए लॉक्ड`}
    >
      <Text style={styles.lockLabel}>{label}</Text>
      <Text style={styles.lockIcon}>🔒</Text>
    </TouchableOpacity>
  );

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>लोड हो रहा है...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>डिज़ाइन एडिट करें</Text>

      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[
            styles.tab,
            tab === "PERSONAL" && styles.tabActive
          ]}
          onPress={() => setTab("PERSONAL")}
        >
          <Text
            style={[
              styles.tabText,
              tab === "PERSONAL" && styles.tabTextActive
            ]}
          >
            PERSONAL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            tab === "BUSINESS" && styles.tabActive
          ]}
          onPress={() => setTab("BUSINESS")}
        >
          <Text
            style={[
              styles.tabText,
              tab === "BUSINESS" && styles.tabTextActive
            ]}
          >
            BUSINESS
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.photoRow}
        onPress={pickImage}
        accessibilityLabel="फोटो बदलें"
      >
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.photo} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoPlaceholderText}>
              {tab === "PERSONAL" ? "फोटो जोड़ें" : "लोगो जोड़ें"}
            </Text>
          </View>
        )}
        <Text style={styles.changeText}>बदलें</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder={
          tab === "PERSONAL" ? "नाम लिखें" : "बिज़नेस नाम लिखें"
        }
      />

      <TouchableOpacity
        style={styles.toggleRow}
        onPress={() => setShowDate((s) => !s)}
      >
        <View
          style={[
            styles.toggleSwitch,
            showDate && styles.toggleSwitchOn
          ]}
        >
          <View
            style={[
              styles.toggleThumb,
              showDate && styles.toggleThumbOn
            ]}
          />
        </View>
        <Text style={styles.toggleLabel}>डेट दिखाएँ</Text>
      </TouchableOpacity>

      {/* Simple date picker controls for manual date selection */}
      <View style={styles.dateRow}>
        <Text style={styles.dateLabel}>तारीख़:</Text>
        <Text style={styles.dateValue}>
          {selectedDate.getDate()}{" "}
          {["जनवरी","फ़रवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितंबर","अक्टूबर","नवंबर","दिसंबर"][
            selectedDate.getMonth()
          ]}
        </Text>
        <View style={styles.dateButtons}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() =>
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth(),
                  selectedDate.getDate() - 1
                )
              )
            }
          >
            <Text style={styles.dateButtonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() =>
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth(),
                  selectedDate.getDate() + 1
                )
              )
            }
          >
            <Text style={styles.dateButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isPremium ? (
        <View style={styles.premiumSection}>
          <Text style={styles.premiumTitle}>प्रीमियम विवरण</Text>
          <TextInput
            style={styles.premiumInput}
            value={aboutYourself}
            onChangeText={setAboutYourself}
            placeholder="आप अपने बारे में लिखें"
            maxLength={100}
          />
          <TextInput
            style={styles.premiumInput}
            value={contactDetails}
            onChangeText={setContactDetails}
            placeholder="संपर्क जानकारी"
            maxLength={50}
          />
          <TextInput
            style={styles.premiumInput}
            value={organizationDetails}
            onChangeText={setOrganizationDetails}
            placeholder="संगठन विवरण"
            maxLength={100}
          />
        </View>
      ) : (
        <View style={styles.lockedSection}>
          {lockedField("About Yourself")}
          {lockedField("Contact Details")}
          {lockedField("Organization Details")}
        </View>
      )}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={onSave}
        disabled={saving}
        accessibilityLabel="परिवर्तन सहेजें"
      >
        <Text style={styles.saveText}>
          {saving ? "सहेजा जा रहा है..." : "सेव करें"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={upgradeVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setUpgradeVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              Upgrade to Premium
            </Text>
            <Text style={styles.modalBody}>
              यह फ़ील्ड केवल प्रीमियम प्लान में अनलॉक होगी।
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButtonSecondary}
                onPress={() => setUpgradeVisible(false)}
              >
                <Text style={styles.modalButtonTextSecondary}>
                  बाद में
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonPrimary}
                onPress={() => {
                  setUpgradeVisible(false);
                  navigation.navigate("Upgrade");
                }}
              >
                <Text style={styles.modalButtonTextPrimary}>
                  Upgrade
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  tabRow: {
    flexDirection: "row",
    marginBottom: 16,
    borderRadius: 24,
    backgroundColor: "#e9ddff",
    padding: 4
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center"
  },
  tabActive: {
    backgroundColor: "#6a0dad"
  },
  tabText: {
    fontSize: 14,
    color: "#6a0dad",
    fontFamily: "NotoSansDevanagari"
  },
  tabTextActive: {
    color: "#fff"
  },
  photoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  photo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12
  },
  photoPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  photoPlaceholderText: {
    fontSize: 10,
    textAlign: "center",
    fontFamily: "NotoSansDevanagari"
  },
  changeText: {
    fontSize: 14,
    color: "#6a0dad",
    fontFamily: "NotoSansDevanagari"
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
    fontSize: 16,
    fontFamily: "NotoSansDevanagari",
    marginBottom: 16
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  toggleSwitch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ccc",
    padding: 3,
    marginRight: 12
  },
  toggleSwitchOn: {
    backgroundColor: "#6a0dad"
  },
  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#fff"
  },
  toggleThumbOn: {
    alignSelf: "flex-end"
  },
  toggleLabel: {
    fontSize: 14,
    fontFamily: "NotoSansDevanagari"
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  dateLabel: {
    fontSize: 14,
    fontFamily: "NotoSansDevanagari",
    marginRight: 8
  },
  dateValue: {
    fontSize: 14,
    fontFamily: "NotoSansDevanagari",
    marginRight: 8
  },
  dateButtons: {
    flexDirection: "row"
  },
  dateButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#6a0dad",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2
  },
  dateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  lockedSection: {
    marginTop: 8,
    marginBottom: 24
  },
  premiumSection: {
    marginTop: 8,
    marginBottom: 24,
    backgroundColor: "#f0e6ff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#6a0dad"
  },
  premiumTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#6a0dad",
    fontFamily: "NotoSansDevanagari"
  },
  premiumInput: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: "#6a0dad",
    borderWidth: 1,
    backgroundColor: "#fff",
    fontSize: 14,
    fontFamily: "NotoSansDevanagari",
    marginBottom: 8,
    color: "#333"
  },
  lockedField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#efe7ff",
    marginBottom: 8
  },
  lockLabel: {
    fontSize: 14,
    color: "#555",
    fontFamily: "NotoSansDevanagari"
  },
  lockIcon: {
    fontSize: 16
  },
  saveButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
    marginBottom: 16
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "NotoSansDevanagari"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "NotoSansDevanagari"
  },
  modalBody: {
    fontSize: 14,
    marginBottom: 16,
    fontFamily: "NotoSansDevanagari"
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  modalButtonSecondary: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8
  },
  modalButtonPrimary: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#6a0dad",
    borderRadius: 8
  },
  modalButtonTextSecondary: {
    fontSize: 14,
    color: "#555",
    fontFamily: "NotoSansDevanagari"
  },
  modalButtonTextPrimary: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "NotoSansDevanagari"
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  loadingText: {
    fontSize: 16,
    fontFamily: "NotoSansDevanagari"
  }
});


