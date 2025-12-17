import AsyncStorage from "@react-native-async-storage/async-storage";

const PREMIUM_KEY = "suvichar_premium_state";

export interface PremiumState {
  isPremium: boolean;
  planType?: "MONTHLY" | "YEARLY";
  expiryDate?: number; // timestamp
}

let inMemoryPremium: PremiumState | null = null;

/**
 * Load premium state from storage
 * @returns PremiumState or null if never upgraded
 */
export async function loadPremiumState(): Promise<PremiumState | null> {
  if (inMemoryPremium) return inMemoryPremium;
  try {
    const json = await AsyncStorage.getItem(PREMIUM_KEY);
    if (!json) return null;
    const state = JSON.parse(json) as PremiumState;
    inMemoryPremium = state;
    return state;
  } catch {
    return null;
  }
}

/**
 * Save premium state to storage
 * @param state Premium state to save
 */
export async function savePremiumState(
  state: PremiumState
): Promise<PremiumState> {
  inMemoryPremium = state;
  await AsyncStorage.setItem(PREMIUM_KEY, JSON.stringify(state));
  return state;
}

/**
 * Check if user is currently premium
 * Validates expiry date if set
 * @returns true if premium and not expired
 */
export async function isPremiumUser(): Promise<boolean> {
  const state = await loadPremiumState();
  if (!state || !state.isPremium) return false;

  // Check if expired
  if (state.expiryDate) {
    if (Date.now() > state.expiryDate) {
      // Expired, downgrade user
      await savePremiumState({ isPremium: false });
      return false;
    }
  }
  return true;
}

/**
 * Get current premium state with defaults
 * @returns Premium state with isPremium guaranteed
 */
export async function getPremiumState(): Promise<PremiumState> {
  const state = await loadPremiumState();
  if (!state) {
    return { isPremium: false };
  }
  return state;
}

/**
 * Clear premium state (logout/reset)
 */
export async function clearPremiumState(): Promise<void> {
  inMemoryPremium = null;
  await AsyncStorage.removeItem(PREMIUM_KEY);
}

/**
 * Simulate premium upgrade
 * Sets premium to true and stores plan type
 * For MONTHLY: expires in 30 days
 * For YEARLY: expires in 365 days
 * 
 * @param planType MONTHLY or YEARLY
 * @returns Updated premium state
 */
export async function upgradeToPremium(
  planType: "MONTHLY" | "YEARLY"
): Promise<PremiumState> {
  const daysToAdd = planType === "MONTHLY" ? 30 : 365;
  const expiryDate = Date.now() + daysToAdd * 24 * 60 * 60 * 1000;

  const newState: PremiumState = {
    isPremium: true,
    planType,
    expiryDate
  };

  return savePremiumState(newState);
}
