"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  Sparkles,
  Check,
  Copy,
  ArrowRight,
  Gift,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const LaunchOfferModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if user previously dismissed offer in this session
    const dismissed = sessionStorage.getItem("zyoris_offer_dismissed");
    if (!dismissed) {
      // Small 900ms delay so page loads smoothly before popup shows
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("zyoris_offer_dismissed", "true");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText("ZyorisNew");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-blue-200/80 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Top Glow Accent Bar */}
        <div className="h-2.5 w-full bg-gradient-to-r from-[#1E70FF] via-[#2979FF] to-[#60A5FA]" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close Announcement"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer z-20"
        >
          <X className="w-5 h-5 stroke-[2.2]" />
        </button>

        <div className="p-6 sm:p-8 pt-7">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-[#0D47A1] text-xs font-bold tracking-wide uppercase mb-4">
            <Gift className="w-3.5 h-3.5 text-[#2979FF]" />
            <span>Limited Launch Celebration Offer</span>
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1E3F] tracking-tight leading-snug mb-3">
            Get <span className="text-[#2979FF]">1 Month 100% FREE</span> for 3 to 5 Team Users!
          </h2>

          <p className="text-[#52667D] text-sm sm:text-base leading-relaxed mb-6">
            We are welcoming our next cohort of ambitious founders. Experience Zyoris Intelligent Business OS with complete platform access, AI leads scoring, and role dashboards at <strong>₹0 cost</strong> for your first month (valid on 3–5 team seats).
          </p>

          {/* Coupon Code Highlight Box */}
          <div className="bg-[#F0F6FF]/90 border-2 border-dashed border-[#2979FF]/40 rounded-2xl p-4 sm:p-5 mb-6 text-center relative group">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#52667D] mb-1.5">
              Use Coupon Code at Checkout
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-2xl sm:text-3xl font-black text-[#0D47A1] tracking-wider selection:bg-blue-200">
                ZyorisNew
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-blue-200 text-xs font-bold text-[#0D47A1] hover:bg-[#2979FF] hover:text-white transition-all shadow-sm cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-2 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              100% OFF for 3 to 5 user seats · Valid for first month
            </div>
          </div>

          {/* Feature Bullets */}
          <div className="grid grid-cols-2 gap-2.5 text-xs text-[#0A1E3F] font-medium mb-6">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#2979FF] flex-shrink-0" />
              <span>Full AI Deal Scoring</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#2979FF] flex-shrink-0" />
              <span>Pipeline & Kanban Suite</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#2979FF] flex-shrink-0" />
              <span>Role-Based Dashboards</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>No Hidden Charges</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/contact?offer=ZyorisNew"
              onClick={handleClose}
              className="w-full sm:flex-1 py-3.5 px-5 rounded-xl bg-[#1E70FF] hover:bg-[#0D47A1] text-white font-bold text-center text-sm sm:text-base transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Claim Free Month</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={handleClose}
              className="w-full sm:w-auto py-3 px-4 rounded-xl text-slate-500 hover:text-slate-800 text-sm font-medium hover:bg-slate-100 transition-all cursor-pointer"
            >
              Explore Website First
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
