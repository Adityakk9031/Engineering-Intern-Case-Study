export type AuthToken = {
  token: string;
  phone: string;
};

const otpStore = new Map<string, string>();

export async function sendOtp(phone: string): Promise<{ success: boolean }> {
  // In-memory fake OTP, always "123456"
  otpStore.set(phone, "123456");
  return { success: true };
}

export async function verifyOtp(
  phone: string,
  otp: string
): Promise<{ success: boolean; authToken?: AuthToken }> {
  const isSixDigits = /^\d{6}$/.test(otp);
  if (!isSixDigits) {
    return { success: false };
  }
  const stored = otpStore.get(phone);
  if (!stored) {
    // Accept any 6 digits even if not sent before, for simplicity
    return {
      success: true,
      authToken: {
        token: `token-${phone}-${Date.now()}`,
        phone
      }
    };
  }

  return {
    success: true,
    authToken: {
      token: `token-${phone}-${Date.now()}`,
      phone
    }
  };
}






