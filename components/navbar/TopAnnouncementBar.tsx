"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Tag, Gift, Flame } from "lucide-react";

const ANNOUNCEMENTS = [
  {
    icon: Flame,
    badge: "LAUNCH OFFER",
    text: "Get 1 Month 100% FREE for starting 3 to 5 team seats!",
    code: "ZyorisNew",
    href: "/checkout?plan=starter&coupon=ZyorisNew&users=3",
  },
  {
    icon: Gift,
    badge: "STARTUP DISCOUNT",
    text: "Flat 10% instant off on all plans (Min. 3 users)",
    code: "ZYORIS10",
    href: "/checkout?plan=growth&coupon=ZYORIS10&users=3",
  },
  {
    icon: Tag,
    badge: "ANNUAL SAVER",
    text: "Flat 8% Instant Discount automatically applied on Annual Billing",
    code: null,
    href: "/checkout?plan=starter&cycle=annual",
  },
];

export const TopAnnouncementBar: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Repeating array to ensure seamless infinite scroll
  const items = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS];

  return (
    <div className="relative z-50 bg-[#0A1E3F] text-white text-xs border-b border-blue-900/60 overflow-hidden select-none">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/15 to-blue-500/10 pointer-events-none" />

      {/* Marquee Track Container */}
      <div className="flex w-max items-center py-2 animate-marquee-running hover:[animation-play-state:paused]">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2.5 px-6 shrink-0 font-medium"
            >
              {/* Badge */}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1E70FF]/30 border border-[#2979FF]/40 text-[#60A5FA] text-[10px] font-bold tracking-wider uppercase">
                <Icon className="w-3 h-3 text-[#60A5FA]" />
                {item.badge}
              </span>

              {/* Message */}
              <span className="text-slate-200">{item.text}</span>

              {/* Copyable Coupon Code if available */}
              {item.code && (
                <button
                  type="button"
                  onClick={(e) => handleCopy(item.code!, e)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 border border-white/20 font-mono text-[11px] font-bold text-amber-300 transition-all cursor-pointer"
                  title="Click to copy coupon code"
                >
                  <span>{item.code}</span>
                  <span className="text-[9px] text-slate-300 font-sans uppercase">
                    {copiedCode === item.code ? "✓ Copied" : "Copy"}
                  </span>
                </button>
              )}

              {/* Direct Action Link */}
              <Link
                href={item.href}
                className="inline-flex items-center gap-0.5 text-[#60A5FA] hover:text-white underline underline-offset-2 transition-colors ml-1"
              >
                <span>Claim</span>
                <ArrowRight className="w-3 h-3" />
              </Link>

              {/* Divider bullet */}
              <span className="text-slate-600 ml-4 font-bold">·</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
