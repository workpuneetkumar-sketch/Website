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
  const recaptchaContainerId = useRef(
    `recaptcha-container-${Math.random().toString(36).substring(2, 9)}`
  );

  // Clean 10-digit phone number to international E.164 (+91XXXXXXXXXX)
  const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10) return `+91${cleaned}`;
    if (cleaned.length > 10 && !phone.startsWith("+")) return `+${cleaned}`;
    return phone;
  };

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

    if (!recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        auth,
        recaptchaContainerId.current,
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
    }
    return recaptchaVerifierRef.current;
  };

  const handleSendOtp = async () => {
    setError(null);
    const formatted = formatPhoneNumber(phoneNumber);

    if (!phoneNumber || phoneNumber.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10-digit Indian mobile number first.");
      return;
    }

    setLoading(true);

    try {
      const appVerifier = initRecaptcha();
      if (!appVerifier) throw new Error("reCAPTCHA initialization failed");

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
      // Reset reCAPTCHA if failed
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
          recaptchaVerifierRef.current = null;
        } catch (e) {
          // ignore
        }
      }

      if (err?.code === "auth/invalid-phone-number") {
        setError("Invalid mobile number format. Please check and try again.");
      } else if (err?.code === "auth/too-many-requests") {
        setError("SMS quota reached for today or too many attempts. Please try later.");
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
      {/* Invisible reCAPTCHA Anchor */}
      <div id={recaptchaContainerId.current} />

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
