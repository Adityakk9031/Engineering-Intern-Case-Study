import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Platform,
  ToastAndroid,
  ActivityIndicator
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../App";
import { api } from "../services/api";
import { QuoteTemplate } from "../backend/quotes";
import {QuoteTemplate2} from "../backend/quotes";
import { UserProfile } from "../backend/user";
import CategoryPills from "../components/CategoryPills";
import QuoteCard from "../components/QuoteCard";
import EmptyState from "../components/EmptyState";

type Props = NativeStackScreenProps<RootStackParamList, "Main">;

const DOWNLOADS_KEY = "suvichar_downloaded_quotes";

export default function MainScreen({ navigation }: Props) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [templates, setTemplates] = useState<(QuoteTemplate | QuoteTemplate2)[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    "ALL" | QuoteTemplate["categories"][number]
  >("ALL");
  const [index, setIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const cardRef = useRef<View | null>(null);
  const [isPremium, setisPremium] = useState<boolean>(false);

  // Load profile and templates whenever this screen comes into focus,
  // so edits to the profile photo/name are immediately reflected.
  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      setLoadError(null);

      Promise.all([api.loadProfile(), api.listTemplates(), api.listTemplates2(), api.isPremium()])
        .then(([p, tmpl1, tmpl2, isPremium]) => {
          if (!p) {
            navigation.reset({
              index: 0,
              routes: [{ name: "Welcome" }]
            });
            return;
          }
          setProfile(p);
          setisPremium(isPremium);
          // Show template1 for premium, template2 for free
          if (isPremium) {
            setTemplates(tmpl1); // All premium templates
          } else {
            setTemplates(tmpl2); // All free templates (template2)
          }
          setIsLoading(false);
        })
        .catch((err) => {
          setLoadError(err.message || "डेटा लोड करने में विफल");
          setIsLoading(false);
        });
    }, [navigation])
  );

  const filteredTemplates =
    selectedCategory === "ALL"
      ? templates
      : templates.filter((t) =>
          t.categories.includes(selectedCategory)
        );

  const currentTemplate =
    filteredTemplates.length > 0
      ? filteredTemplates[index % filteredTemplates.length]
      : undefined;

  const onNext = () => {
    if (!filteredTemplates.length) return;
    setIndex((i) => (i + 1) % filteredTemplates.length);
  };

  const ensureMediaPermission = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "अनुमति आवश्यक",
          "सेव करने के लिए मीडिया लाइब्रेरी की अनुमति दें।"
        );
        return false;
      }
      return true;
    } catch (error) {
      console.warn("MediaLibrary permission error:", error);
      return true; // Allow app to continue anyway
    }
  };

  const showToast = (message: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert("", message);
    }
  };

  const captureImage = async (): Promise<string | null> => {
    if (!cardRef.current) return null;
    try {
      const uri = await captureRef(cardRef, {
        format: "png",
        quality: 0.9
      } as any);
      return uri as string;
    } catch (e) {
      Alert.alert("त्रुटि", "इमेज कैप्चर नहीं हो सकी।");
      return null;
    }
  };

  const onShare = async () => {
    const uri = await captureImage();
    if (!uri) return;
    try {
      const available = await Sharing.isAvailableAsync();
      if (!available) {
        Alert.alert(
          "शेयर उपलब्ध नहीं",
          "डिवाइस पर शेयरिंग उपलब्ध नहीं है।"
        );
        return;
      }
      await Sharing.shareAsync(uri);
    } catch {
      Alert.alert("त्रुटि", "शेयर करने में समस्या आई।");
    }
  };

  const onDownload = async () => {
    if (!(await ensureMediaPermission())) return;
    const uri = await captureImage();
    if (!uri) return;
    try {
      setSaving(true);
      try {
        const asset = await MediaLibrary.createAssetAsync(uri);
        const existing = await AsyncStorage.getItem(DOWNLOADS_KEY);
        const list: string[] = existing ? JSON.parse(existing) : [];
        list.unshift(asset.uri);
        await AsyncStorage.setItem(DOWNLOADS_KEY, JSON.stringify(list));
      } catch (error) {
        console.warn("MediaLibrary error:", error);
        // Fallback: just store the URI
        const existing = await AsyncStorage.getItem(DOWNLOADS_KEY);
        const list: string[] = existing ? JSON.parse(existing) : [];
        list.unshift(uri);
        await AsyncStorage.setItem(DOWNLOADS_KEY, JSON.stringify(list));
      }
      showToast("इमेज सेव हो गई है");
    } catch {
      Alert.alert("त्रुटि", "इमेज सेव नहीं हो सकी।");
    } finally {
      setSaving(false);
    }
  };

  const onRetry = () => {
    setIsLoading(true);
    setLoadError(null);
    Promise.all([api.loadProfile(), api.listTemplates(), api.listTemplates2(), api.isPremium()])
      .then(([p, tmpl1, tmpl2, isPremium]) => {
        if (!p) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Welcome" }]
          });
          return;
        }
        setProfile(p);
        setisPremium(isPremium);
        if (isPremium) {
          setTemplates(tmpl1);
        } else {
          setTemplates(tmpl2);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setLoadError(err.message || "डेटा लोड करने में विफल");
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6a0dad" />
        <Text style={styles.loadingText}>लोड हो रहा है...</Text>
      </View>
    );
  }

  if (loadError || !profile || templates.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.appTitle}>Suvichar</Text>
        </View>
        <EmptyState
          title="डेटा लोड नहीं हो सका"
          message={loadError || "टेम्पलेट उपलब्ध नहीं हैं।"}
          icon="⚠️"
        />
        <TouchableOpacity
          style={[styles.nextButton, { marginHorizontal: 32 }]}
          onPress={onRetry}
        >
          <Text style={styles.nextButtonText}>पुनः प्रयास करें</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!currentTemplate) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.appTitle}>Suvichar</Text>
        </View>
        <CategoryPills
          selected={selectedCategory}
          onSelect={(c) => {
            setSelectedCategory(c);
            setIndex(0);
          }}
        />
        <EmptyState
          title="कोई टेम्पलेट नहीं मिला"
          message="इस श्रेणी में कोई टेम्पलेट उपलब्ध नहीं है।"
          icon="📭"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>Suvichar</Text>
          {isPremium && (
            <Text style={styles.premiumBadge}>👑 Premium</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          accessibilityLabel="प्रोफ़ाइल"
        >
          <View style={styles.profileIcon}>
            {profile.photoUri ? (
              <Image
                source={{ uri: profile.photoUri }}
                style={styles.profilePhoto}
              />
            ) : (
              <Text style={styles.profileInitial}>
                {profile.name.charAt(0)}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <CategoryPills
        selected={selectedCategory}
        onSelect={(c) => {
          setSelectedCategory(c);
          setIndex(0);
        }}
      />

      <View style={styles.cardWrapper}>
        <QuoteCard template={currentTemplate} profile={profile} ref={cardRef} />
        {!isPremium && (
          <View style={styles.freeOverlay}>
            <Text style={styles.upgradeText}>Upgrade to Premium</Text>
            <Text style={styles.upgradeSubtext}>for more templates</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={onNext}
        accessibilityLabel="अगला डिज़ाइन"
      >
        <Text style={styles.nextButtonText}>अगला</Text>
      </TouchableOpacity>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onShare}
          accessibilityLabel="शेयर करें"
        >
          <Text style={styles.actionText}>शेयर</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onDownload}
          disabled={saving}
          accessibilityLabel="डाउनलोड करें"
        >
          <Text style={styles.actionText}>
            {saving ? "सेव हो रहा है..." : "डाउनलोड"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("EditDesign")}
          accessibilityLabel="डिज़ाइन एडिट करें"
        >
          <Text style={styles.actionText}>एडिट</Text>
        </TouchableOpacity>
        {!isPremium && (
          <TouchableOpacity
            style={[styles.actionButton, styles.upgradeButton]}
            onPress={() => navigation.navigate("Upgrade")}
            accessibilityLabel="प्रीमियम अपग्रेड करें"
          >
            <Text style={styles.upgradeButtonText}>Upgrade</Text>
          </TouchableOpacity>
        )}
      </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },
  appTitle: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "NotoSansDevanagari"
  },
  premiumBadge: {
    fontSize: 12,
    color: "#6a0bad",
    fontWeight: "bold",
    marginTop: 2,
    fontFamily: "NotoSansDevanagari"
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e0d1ff",
    alignItems: "center",
    justifyContent: "center"
  },
  profilePhoto: {
    width: "100%",
    height: "100%",
    borderRadius: 18
  },
  profileInitial: {
    fontSize: 18,
    fontFamily: "NotoSansDevanagari"
  },
  cardWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  freeOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(106, 10, 173, 0.9)",
    paddingVertical: 12,
    alignItems: "center"
  },
  upgradeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "NotoSansDevanagari"
  },
  upgradeSubtext: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "NotoSansDevanagari"
  },
  nextButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 10,
    borderRadius: 24,
    alignItems: "center",
    marginBottom: 12,
    marginHorizontal: 32
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "NotoSansDevanagari"
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingHorizontal: 8
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#6a0dad",
    alignItems: "center"
  },
  actionText: {
    fontSize: 14,
    color: "#6a0dad",
    fontFamily: "NotoSansDevanagari"
  },  upgradeButton: {
    backgroundColor: "#6a0bad"
  },
  upgradeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "NotoSansDevanagari"
  },  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText: {
    fontSize: 16,
    fontFamily: "NotoSansDevanagari"
  }
});


