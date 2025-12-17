import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../App";
import { api } from "../services/api";
import { UserProfile } from "../backend/user";
import EmptyState from "../components/EmptyState";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const DOWNLOADS_KEY = "suvichar_downloaded_quotes";

export default function ProfileScreen({ navigation }: Props) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [downloads, setDownloads] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.loadProfile(),
      AsyncStorage.getItem(DOWNLOADS_KEY)
    ])
      .then(([p, json]) => {
        if (p) setProfile(p);
        if (json) setDownloads(JSON.parse(json));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>प्रोफ़ाइल</Text>
        <EmptyState title="लोड हो रहा है" message="कृपया प्रतीक्षा करें..." icon="⏳" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>प्रोफ़ाइल</Text>

      {profile && (
        <View style={styles.headerRow}>
          <View style={styles.photoBox}>
            {profile.photoUri ? (
              <Image
                source={{ uri: profile.photoUri }}
                style={styles.photo}
              />
            ) : (
              <Text style={styles.initial}>
                {profile.name.charAt(0)}
              </Text>
            )}
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.phone}>{profile.phone}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("EditDesign")}
        accessibilityLabel="प्रोफ़ाइल एडिट करें"
      >
        <Text style={styles.editText}>EDIT PROFILE</Text>
      </TouchableOpacity>

      <Text style={styles.gridTitle}>डाउनलोड किए गए सुविचार</Text>

      {downloads.length === 0 ? (
        <EmptyState
          title="कोई डाउनलोड नहीं"
          message="अभी तक कोई इमेज डाउनलोड नहीं की गई। मुख्य स्क्रीन से डाउनलोड करें।"
          icon="📸"
        />
      ) : (
        <FlatList
          data={downloads}
          keyExtractor={(item, idx) => `${item}-${idx}`}
          numColumns={3}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.gridImage} />
          )}
        />
      )}
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  photoBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#e0d1ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 32
  },
  initial: {
    fontSize: 24,
    fontFamily: "NotoSansDevanagari"
  },
  info: {
    flex: 1
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "NotoSansDevanagari"
  },
  phone: {
    fontSize: 14,
    fontFamily: "NotoSansDevanagari"
  },
  editButton: {
    alignSelf: "flex-start",
    backgroundColor: "#6a0dad",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16
  },
  editText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "NotoSansDevanagari"
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "NotoSansDevanagari"
  },
  grid: {
    paddingBottom: 24
  },
  gridImage: {
    width: 90,
    height: 160,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
    backgroundColor: "#ddd"
  },
  emptyText: {
    fontSize: 14,
    marginTop: 12,
    fontFamily: "NotoSansDevanagari"
  }
});


