import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export type PurposeType = "PERSONAL" | "BUSINESS";

export type UserProfile = {
  phone: string;
  purpose: PurposeType;
  name: string;
  photoUri?: string;
  showDate: boolean;
  /** Optional ISO date string to override the auto date on the template */
  dateOverride?: string;
};
const STORAGE_KEY = "suvichar_user_profile";

let inMemoryProfile: UserProfile | null = null;

export async function loadProfile(): Promise<UserProfile | null> {
  if (inMemoryProfile) return inMemoryProfile;
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (!json) return null;
    const parsed = JSON.parse(json) as UserProfile;
    inMemoryProfile = parsed;
    return parsed;
  } catch {
    return null;
  }
}

export async function saveProfile(
  profile: UserProfile
): Promise<UserProfile> {
  inMemoryProfile = profile;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  return profile;
}

export async function getOrCreateProfile(
  phone: string,
  purpose: PurposeType
): Promise<UserProfile> {
  const existing = await loadProfile();
  if (existing) return existing;
  const profile: UserProfile = {
    phone,
    purpose,
    name: purpose === "PERSONAL" ? "आपका नाम" : "आपका व्यवसाय",
    showDate: true,
    dateOverride: undefined
  };
  return saveProfile(profile);
}



