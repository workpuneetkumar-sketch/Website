// Simple in-memory OTP cache with 10 min TTL
// In production serverless, this handles OTP verification per process,
// or fallback to secure HMAC if needed.
type OtpRecord = {
  otp: string;
  expiresAt: number;
};

const otpStore = new Map<string, OtpRecord>();

export function storeOtp(email: string, otp: string) {
  const normalized = email.trim().toLowerCase();
  otpStore.set(normalized, {
    otp,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
  });
}

export function verifyStoredOtp(email: string, inputOtp: string): boolean {
  const normalized = email.trim().toLowerCase();
  const record = otpStore.get(normalized);
  if (!record) return false;

  if (Date.now() > record.expiresAt) {
    otpStore.delete(normalized);
    return false;
  }

  if (record.otp === inputOtp.trim()) {
    otpStore.delete(normalized);
    return true;
  }

  return false;
}
