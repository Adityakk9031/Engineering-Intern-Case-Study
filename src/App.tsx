import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import WelcomeScreen from "./screens/WelcomeScreen";
import OTPScreen from "./screens/OTPScreen";
import PurposeScreen from "./screens/PurposeScreen";
import ProfileSetupScreen from "./screens/ProfileSetupScreen";
import MainScreen from "./screens/MainScreen";
import EditDesignScreen from "./screens/EditDesignScreen";
import UpgradeScreen from "./screens/UpgradeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import useFontsLoad from "./hooks/useFontsLoad";

export type RootStackParamList = {
  Welcome: undefined;
  OTP: { phone: string };
  Purpose: { phone: string };
  ProfileSetup: { phone: string; purpose: "PERSONAL" | "BUSINESS" };
  Main: undefined;
  EditDesign: undefined;
  Upgrade: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const fontsLoaded = useFontsLoad();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="Purpose" component={PurposeScreen} />
          <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="EditDesign" component={EditDesignScreen} />
          <Stack.Screen name="Upgrade" component={UpgradeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}


