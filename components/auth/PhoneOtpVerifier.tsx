"use client";

import React, { useState, useEffect, useRef } from "react";
import { auth } from "@/lib/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { ShieldCheck, CheckCircle2, Phone, KeyRound, Loader2, RefreshCw } from "lucide-react";

interface PhoneOtpVerifierProps {
  phoneNumber: string; // 10-digit or with +91
  isVerified: boolean;
  onVerified: (verified: boolean, userUid?: string) => void;
  className?: string;
  theme?: "light" | "dark";
}

export const PhoneOtpVerifier: React.FC<PhoneOtpVerifierProps> = ({
  phoneNumber,
  isVerified,
  onVerified,
  className = "",
  theme = "light",
}) => {
  const [step, setStep] = useState<"idle" | "otp_sent" | "verified">(
    isVerified ? "verified" : "idle"
  );
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);

  const confirmationResultRef = useRef<ConfirmationResult | null>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const recaptchaAnchorRef = useRef<HTMLDivElement>(null);

  // Clean 10-digit phone number to international E.164 (+91XXXXXXXXXX)
  const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10) return `+91${cleaned}`;
    if (cleaned.length > 10 && !phone.startsWith("+")) return `+${cleaned}`;
    return phone;
  };

  // Auto-reset whenever phone number changes or drops below 10 digits
  const lastPhoneRef = useRef(phoneNumber);
  useEffect(() => {
    const digits = phoneNumber.replace(/\D/g, "").slice(-10);
    const lastDigits = lastPhoneRef.current.replace(/\D/g, "").slice(-10);

    if (digits !== lastDigits || digits.length < 10) {
      setStep("idle");
      setOtp("");
      setError(null);
      confirmationResultRef.current = null;
      if (isVerified) {
        onVerified(false);
      }
    }
    lastPhoneRef.current = phoneNumber;
  }, [phoneNumber, isVerified, onVerified]);

  // Sync if isVerified prop changes externally
  useEffect(() => {
    if (isVerified) {
      setStep("verified");
    } else if (step === "verified") {
      setStep("idle");
    }
  }, [isVerified]);

  // Timer countdown for resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Clean up reCAPTCHA on unmount
  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  const initRecaptcha = () => {
    if (typeof window === "undefined") return null;

    const anchor = recaptchaAnchorRef.current;
    if (!anchor) return null;

    // Clear old verifier to avoid auth/invalid-app-credential token mismatch
    if (recaptchaVerifierRef.current) {
      try {
        recaptchaVerifierRef.current.clear();
      } catch (e) {
        // ignore
      }
      recaptchaVerifierRef.current = null;
    }

    anchor.innerHTML = "";

    try {
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        auth,
        anchor,
        {
          size: "invisible",
          callback: () => {
            // reCAPTCHA solved
          },
          "expired-callback": () => {
            setError("Security check expired. Please try sending OTP again.");
          },
        }
      );
      return recaptchaVerifierRef.current;
    } catch (e: any) {
      console.error("RecaptchaVerifier init error:", e);
      return null;
    }
  };

  const handleSendOtp = async () => {
    setError(null);
    const formatted = formatPhoneNumber(phoneNumber);

    const digitsOnly = phoneNumber.replace(/\D/g, "");
    if (!phoneNumber || digitsOnly.length < 10) {
      setError("Please enter a valid 10-digit Indian mobile number first.");
      return;
    }

    setLoading(true);

    try {
      const appVerifier = initRecaptcha();
      if (!appVerifier) {
        throw new Error("Security verification container not ready. Please try again.");
      }

      const confirmation = await signInWithPhoneNumber(
        auth,
        formatted,
        appVerifier
      );

      confirmationResultRef.current = confirmation;
      setStep("otp_sent");
      setTimer(45); // 45s cooldown
    } catch (err: any) {
      console.error("Firebase SMS error:", err);
      // Reset reCAPTCHA if failed so user can immediately retry
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
        } catch (e) {
          // ignore
        }
        recaptchaVerifierRef.current = null;
      }

      if (err?.code === "auth/invalid-phone-number") {
        setError("Invalid mobile number format. Please check and try again.");
      } else if (err?.code === "auth/too-many-requests") {
        setError("SMS quota reached for today or too many attempts. Please try later.");
      } else if (
        err?.code === "auth/operation-not-allowed" ||
        err?.message?.includes("SMS unable to be sent until this region enabled")
      ) {
        setError(
          "SMS Region Restriction: India (+91) needs to be enabled in Firebase Console > Authentication > Settings > SMS Region Policy."
        );
      } else if (
        err?.code === "auth/invalid-app-credential" ||
        err?.message?.includes("invalid-app-credential")
      ) {
        setError(
          "Firebase Security Check: Please try opening http://127.0.0.1:3000 instead of localhost, OR use a test phone number added in Firebase Console."
        );
      } else if (
        err?.code === "auth/billing-not-enabled" ||
        err?.message?.includes("billing-not-enabled")
      ) {
        setError(
          `Firebase Error: ${err?.code || "auth/billing-not-enabled"} - ${err?.message || "Billing is still synchronizing or Cloud Identity Toolkit API is pending. Please wait 1-2 mins and retry."}`
        );
      } else {
        setError(err?.message || "Failed to send SMS OTP. Please check your number.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError(null);
    if (!otp || otp.length < 6) {
      setError("Please enter the complete 6-digit OTP received on your phone.");
      return;
    }

    if (!confirmationResultRef.current) {
      setError("Session expired. Please request a new OTP.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await confirmationResultRef.current.confirm(otp);
      setStep("verified");
      onVerified(true, userCredential.user.uid);
    } catch (err: any) {
      console.error("OTP verification error:", err);
      if (err?.code === "auth/invalid-verification-code") {
        setError("Incorrect OTP code. Please enter the valid code.");
      } else if (err?.code === "auth/code-expired") {
        setError("OTP has expired. Please request a fresh OTP.");
      } else {
        setError(err?.message || "Failed to verify OTP.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isVerified || step === "verified") {
    return (
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold ${className}`}>
        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <span>Phone Verified via Firebase SMS</span>
      </div>
    );
  }

  return (
    <div className={`space-y-2 mt-1.5 ${className}`}>
      {/* Standalone 100% empty anchor for Firebase reCAPTCHA */}
      <div ref={recaptchaAnchorRef} />

      {step === "idle" && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={loading || phoneNumber.replace(/\D/g, "").length < 10}
            onClick={handleSendOtp}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              theme === "dark"
                ? "bg-[#2979FF] hover:bg-[#1E70FF] text-white"
                : "bg-[#0D47A1] hover:bg-[#2979FF] text-white shadow-sm"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Sending SMS...</span>
              </>
            ) : (
              <>
                <Phone className="w-3.5 h-3.5" />
                <span>Verify via OTP</span>
              </>
            )}
          </button>
          <span className="text-[11px] text-slate-500">
            (Required before submission)
          </span>
        </div>
      )}

      {step === "otp_sent" && (
        <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200/90 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs text-[#0A1E3F]">
            <span className="font-semibold flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-[#2979FF]" />
              Enter 6-digit OTP sent to {formatPhoneNumber(phoneNumber)}:
            </span>
            {timer > 0 ? (
              <span className="text-slate-500 text-[11px]">Resend in {timer}s</span>
            ) : (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="text-[#2979FF] hover:underline font-bold text-[11px] flex items-center gap-0.5"
              >
                <RefreshCw className="w-3 h-3" /> Resend
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className="w-32 px-3 py-1.5 text-center font-mono font-bold tracking-widest text-sm bg-white border border-blue-200 rounded-lg outline-none focus:border-[#2979FF] focus:ring-2 focus:ring-blue-100"
            />
            <button
              type="button"
              disabled={loading || otp.length < 6}
              onClick={handleVerifyOtp}
              className="px-4 py-1.5 bg-[#2979FF] hover:bg-[#0D47A1] text-white text-xs font-bold rounded-lg transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
              <span>Verify</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("idle");
                setOtp("");
                setError(null);
                confirmationResultRef.current = null;
              }}
              className="px-2.5 py-1.5 text-[11px] text-slate-500 hover:text-slate-800 underline transition-colors"
            >
              Change number
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="text-[11px] text-red-600 font-medium">
          {error}
        </div>
      )}
    </div>
  );
};
