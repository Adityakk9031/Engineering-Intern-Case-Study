import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { RootStackParamList } from "../App";
import { api } from "../services/api";
import { PurposeType } from "../backend/user";

type Props = NativeStackScreenProps<RootStackParamList, "ProfileSetup">;

export default function ProfileSetupScreen({ route, navigation }: Props) {
  const { phone, purpose } = route.params;
  const [name, setName] = useState(
    purpose === "PERSONAL" ? "आपका नाम" : "आपका व्यवसाय"
  );
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

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

  const persistAndGoMain = async (skip: boolean) => {
    try {
      setLoading(true);
      const profile = await api.getOrCreateProfile(
        phone,
        purpose as PurposeType
      );
      const updated = skip
        ? profile
        : {
            ...profile,
            name,
            photoUri
          };
      await api.saveProfile(updated);
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }]
      });
    } catch {
      Alert.alert("त्रुटि", "प्रोफ़ाइल सहेजने में समस्या आई।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {purpose === "PERSONAL"
          ? "पर्सनल प्रोफ़ाइल सेट करें"
          : "बिज़नेस प्रोफ़ाइल सेट करें"}
      </Text>

      <TouchableOpacity
        style={styles.photoBox}
        onPress={pickImage}
        accessibilityLabel="फोटो चुनें"
      >
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.photo} />
        ) : (
          <Text style={styles.photoPlaceholder}>
            {purpose === "PERSONAL"
              ? "फोटो अपलोड करें"
              : "लोगो अपलोड करें"}
          </Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder={
          purpose === "PERSONAL" ? "अपना नाम लिखें" : "व्यवसाय नाम लिखें"
        }
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => persistAndGoMain(false)}
        disabled={loading}
        accessibilityLabel="जारी रखें"
      >
        <Text style={styles.buttonText}>
          {loading ? "कृपया प्रतीक्षा करें..." : "जारी रखें"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => persistAndGoMain(true)}
        accessibilityLabel="स्किप करके आगे बढ़ें"
      >
        <Text style={styles.skipText}>स्किप करें</Text>
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
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    fontFamily: "NotoSansDevanagari"
  },
  photoBox: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#ccc",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    backgroundColor: "#fff"
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 60
  },
  photoPlaceholder: {
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 10,
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
    marginBottom: 24
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
  },
  skipButton: {
    marginTop: 16,
    alignItems: "center"
  },
  skipText: {
    fontSize: 16,
    color: "#6a0dad",
    fontFamily: "NotoSansDevanagari"
  }
});


