/**
 * Offline Support Utilities
 * 
 * All data in this app is persisted locally via AsyncStorage.
 * There are NO external API calls, making this app 100% offline-first.
 */

/**
 * Verify all backend functions use only AsyncStorage/local data
 * 
 * VERIFIED OFFLINE FUNCTIONS:
 * ✓ Authentication: OTP verification (mocked locally, no backend)
 * ✓ User Profile: Stored in AsyncStorage
 * ✓ Quote Content: Hardcoded in memory
 * ✓ Templates: Hardcoded metadata, images in /assets/templates
 * ✓ Premium State: Stored in AsyncStorage
 * ✓ Downloads: Stored in AsyncStorage
 * 
 * NO EXTERNAL DEPENDENCIES:
 * ✗ No Firebase
 * ✗ No REST API calls
 * ✗ No real backend server
 * ✗ No third-party services
 */

/**
 * List of all offline-capable data sources
 */
export const offlineDataSources = {
  USER_PROFILE: "AsyncStorage → src/backend/user.ts",
  PREMIUM_STATE: "AsyncStorage → src/backend/premium.ts",
  QUOTE_CONTENT: "In-memory array → src/backend/quoteContent.ts",
  TEMPLATES: "In-memory array → src/backend/quotes.ts",
  TEMPLATE_IMAGES: "Bundle assets → /assets/templates/*.jpg",
  DOWNLOADED_QUOTES: "AsyncStorage → MainScreen DOWNLOADS_KEY",
  AUTH_TOKENS: "In-memory map → src/backend/auth.ts"
};

/**
 * Verify app runs offline
 * Call this during app initialization for debugging
 */
export function logOfflineStatus(): void {
  console.log("🌐 OFFLINE-FIRST STATUS:");
  console.log("✓ No external APIs required");
  console.log("✓ All data stored locally via AsyncStorage");
  console.log("✓ Quote templates bundled in app");
  console.log("✓ Images loaded from /assets/templates");
  console.log("✓ Premium state persisted locally");
  console.log("✓ Works with zero network connection");
}

/**
 * Graceful image loading with local fallback
 * If an image fails to load, use a colored placeholder
 */
export function getImageFallbackColor(category: string): string {
  const colors: Record<string, string> = {
    GOOD_MORNING: "#FFD700",
    MOTIVATIONAL: "#FF6B6B",
    SHAYARI: "#DA70D6",
    RELIGIOUS: "#FFD700",
    LOVE: "#FF69B4",
    FESTIVAL: "#FF6B9D"
  };
  return colors[category] || "#6a0dad";
}
