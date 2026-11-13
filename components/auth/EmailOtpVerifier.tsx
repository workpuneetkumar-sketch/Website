"use client";

import React, { useState, useEffect, useRef } from "react";
import { CheckCircle2, Mail, KeyRound, Loader2, RefreshCw } from "lucide-react";

interface EmailOtpVerifierProps {
  email: string;
  name?: string;
  isVerified: boolean;
  onVerified: (verified: boolean) => void;
  className?: string;
  theme?: "light" | "dark";
}

export const EmailOtpVerifier: React.FC<EmailOtpVerifierProps> = ({
  email,
  name,
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

  // Auto-reset when email changes or is cleared
  const lastEmailRef = useRef(email);
  useEffect(() => {
    const norm = email.trim().toLowerCase();
    const lastNorm = lastEmailRef.current.trim().toLowerCase();

    if (norm !== lastNorm) {
      setStep("idle");
      setOtp("");
      setError(null);
      if (isVerified) {
        onVerified(false);
      }
    }
    lastEmailRef.current = email;
  }, [email, isVerified, onVerified]);

  // Sync if isVerified prop changes externally
  useEffect(() => {
    if (isVerified) {
      setStep("verified");
    } else if (step === "verified") {
      setStep("idle");
    }
  }, [isVerified]);

  // Countdown timer for resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const handleSendOtp = async () => {
    setError(null);
    if (!isValidEmail(email)) {
      setError("Please enter a valid work email address first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          name: name ? name.trim() : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send verification code.");
      }

      setStep("otp_sent");
      setTimer(60); // 60s cooldown
    } catch (err: any) {
      console.error("Send OTP error:", err);
      setError(err?.message || "Failed to send OTP. Please check your email.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError(null);
    if (!otp || otp.length < 6) {
      setError("Please enter the complete 6-digit OTP received in your inbox.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          otp: otp.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Verification failed.");
      }

      setStep("verified");
      onVerified(true);
    } catch (err: any) {
      console.error("Verify OTP error:", err);
      setError(err?.message || "Incorrect verification code.");
    } finally {
      setLoading(false);
    }
  };

  if (isVerified || step === "verified") {
    return (
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold ${className}`}>
        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <span>Email Verified</span>
      </div>
    );
  }

  return (
    <div className={`space-y-2 mt-1.5 ${className}`}>
      {step === "idle" && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={loading || !isValidEmail(email)}
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
                <span>Sending Code...</span>
              </>
            ) : (
              <>
                <Mail className="w-3.5 h-3.5" />
                <span>Verify Email via OTP</span>
              </>
            )}
          </button>
          <span className="text-[11px] text-slate-500">
            (Required to submit)
          </span>
        </div>
      )}

      {step === "otp_sent" && (
        <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200/90 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs text-[#0A1E3F]">
            <span className="font-semibold flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-[#2979FF]" />
              Enter 6-digit code sent to {email}:
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
              className="w-32 px-3 py-1.5 text-center font-mono font-bold tracking-widest text-sm bg-white border border-blue-200 rounded-lg outline-none focus:border-[#2979FF] focus:ring-2 focus:ring-blue-100 text-slate-900"
            />
            <button
              type="button"
              disabled={loading || otp.length < 6}
              onClick={handleVerifyOtp}
              className="px-4 py-1.5 bg-[#2979FF] hover:bg-[#0D47A1] text-white text-xs font-bold rounded-lg transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
              <span>Verify</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("idle");
                setOtp("");
                setError(null);
              }}
              className="px-2 py-1 text-[11px] text-slate-500 hover:text-slate-800 underline"
            >
              Change email
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
