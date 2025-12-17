import * as authBackend from "../backend/auth";
import * as userBackend from "../backend/user";
import * as quotesBackend from "../backend/quotes";
import * as premiumBackend from "../backend/premium";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withLatency<T>(fn: () => Promise<T>): Promise<T> {
  await delay(300 + Math.random() * 300);
  return fn();
}

export const api = {
  sendOtp(phone: string) {
    return withLatency(() => authBackend.sendOtp(phone));
  },
  verifyOtp(phone: string, otp: string) {
    return withLatency(() => authBackend.verifyOtp(phone, otp));
  },
  loadProfile() {
    return withLatency(() => userBackend.loadProfile());
  },
  saveProfile(profile: userBackend.UserProfile) {
    return withLatency(() => userBackend.saveProfile(profile));
  },
  getOrCreateProfile(phone: string, purpose: userBackend.PurposeType) {
    return withLatency(() =>
      userBackend.getOrCreateProfile(phone, purpose)
    );
  },
  listTemplates() {
    return withLatency(() => quotesBackend.listTemplates());
  },
  // Premium functions
  isPremium() {
    return withLatency(() => premiumBackend.isPremiumUser());
  },
  getPremiumState() {
    return withLatency(() => premiumBackend.getPremiumState());
  },
  savePremiumState(state: premiumBackend.PremiumState) {
    return withLatency(() => premiumBackend.savePremiumState(state));
  },
  upgradeToPremium(planType: "MONTHLY" | "YEARLY") {
    return withLatency(() => premiumBackend.upgradeToPremium(planType));
  },
  clearPremiumState() {
    return withLatency(() => premiumBackend.clearPremiumState());
  }
};





