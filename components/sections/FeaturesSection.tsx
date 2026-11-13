"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  LayoutDashboard,
  Sparkles,
  ShieldCheck,
  Building2,
  Link2,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

import { Button } from "../buttons/Button";

export const FeaturesSection: React.FC = () => {
  const featureItems = [
    {
      id: "feature-lead-management",
      num: "01",
      category: "GROW REVENUE",
      title: "Lead Management",
      badgeTag: "AI",
      badgeSub: "Lead scoring & pipeline automation",
      desc: "Track every lead with full lifecycle history. AI scores each deal so your team always knows where to focus first.",
      features: [
        "Lead Capture & Assignment",
        "Pipeline Kanban & Stages",
        "Automated Follow-up Reminders",
        "Call & Email Interaction Logs",
      ],
      icon: Clock,
      buttonText: "Explore Lead Management",
    },
    {
      id: "feature-dashboards",
      num: "02",
      category: "EMPOWER YOUR TEAM",
      title: "Role-Based Dashboards",
      badgeTag: "LIVE",
      badgeSub: "Role-specific real-time views",
      desc: "CEO, CFO, Sales Head - everyone gets their own live view. No more chasing people for updates or digging through spreadsheets.",
      features: [
        "Executive & Founder Overviews",
        "Sales Pipeline Analytics",
        "HR & Payroll Status Center",
        "Custom Widget Layouts",
      ],
      icon: LayoutDashboard,
      buttonText: "Explore Dashboards",
    },
    {
      id: "feature-ai-recommends",
      num: "03",
      category: "SEE WHAT MATTERS",
      title: "AI That Recommends",
      badgeTag: "AI",
      badgeSub: "Proactive deal recommendations",
      desc: '"Call this deal now." "This lead is going cold." Zyoris does not just show data. It tells you what action to take, right now.',
      features: [
        "Deal Velocity Warnings",
        "Next-Best-Action Prompts",
        "AI Meeting & Call Summaries",
        "Dynamic Win Probability",
      ],
      icon: Sparkles,
      buttonText: "Explore AI Intelligence",
    },
    {
      id: "feature-security",
      num: "04",
      category: "STAY SECURE",
      title: "Enterprise Security",
      badgeTag: "SECURE",
      badgeSub: "Zero-trust compliant security",
      desc: "Complete data isolation, JWT auth, full audit trail, and role-based permissions. Production-grade security from day one.",
      features: [
        "Role-Based Access Control",
        "End-to-End JWT Auth & SSL",
        "Immutable Audit Trails",
        "SOC-2 & GDPR Readiness",
      ],
      icon: ShieldCheck,
      buttonText: "Explore Enterprise Security",
    },
    {
      id: "feature-multi-tenant",
      num: "05",
      category: "DATA ISOLATION",
      title: "Multi-Tenant Architecture",
      badgeTag: "DATA",
      badgeSub: "100% database boundary",
      desc: "Every company's data is completely isolated. Your data stays yours, private, secure, and always in your control.",
      features: [
        "Dedicated Database Schemas",
        "Zero Cross-Tenant Leakage",
        "Automated Data Backups",
        "India-Compliant Cloud Hosting",
      ],
      icon: Building2,
      buttonText: "Explore Multi-Tenant",
    },
    {
      id: "feature-one-login",
      num: "06",
      category: "ONE PLATFORM",
      title: "One Login, Everything",
      badgeTag: "SYNCED",
      badgeSub: "Single source of truth",
      desc: "CRM, HR, Finance - all in one place, one account. No tool-switching, no copy-pasting data between systems.",
      features: [
        "Unified Single Sign-On",
        "Cross-Module Workflows",
        "Integrated Team Directory",
        "Zero External API Costs",
      ],
      icon: Link2,
      buttonText: "Explore Unified System",
    },
  ];

  const [activeId, setActiveId] = useState(featureItems[0].id);

  // Scrollspy to highlight active heading on the left as right cards are scrolled
  useEffect(() => {
    const handleScroll = () => {
      const viewportTarget = window.innerHeight * 0.42;
      let currentActive = featureItems[0].id;
      let minDistance = Infinity;

      featureItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - viewportTarget);
          if (distance < minDistance) {
            minDistance = distance;
            currentActive = item.id;
          }
        }
      });

      setActiveId(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCard = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -130;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <section
      id="features"
      animate="scroll-section-color"
      data-animate="scroll-section-color"
      className="section_home1_features"
    >
      <div className="padding-global padding-section-medium">
        <div className="container-default">
          <div className="home1_features_wrap">
            {/* Left Nav Sticky Area with 6 headings */}
            <div className="home1_features_left">
              <div className="max-width-small">
                <div
                  animate="fade-up-1"
                  data-animate="fade-up-1"
                  className="text-style-badge is-badge"
                >
                  <div>What&apos;s inside</div>
                </div>
                <div className="spacer-small"></div>
                <h2 animate="title" data-animate="title">
                  Everything your team needs. Nothing they don&apos;t.
                </h2>
                <div className="spacer-tiny"></div>
                <div className="spacer-xxsmall"></div>
                <div
                  animate="fade-up-2"
                  data-animate="fade-up-2"
                  className="text-size-small text-style-muted"
                >
                  Stop paying for 5 to 10 disconnected tools. Zyoris replaces them all, with AI intelligence built in from day one.
                </div>
              </div>

              {/* 6 Left Headings / Nav Items */}
              <div className="home1_features_nav w-full max-w-lg mt-2 space-y-1">
                {featureItems.map((item, index) => {
                  const isActive = activeId === item.id;
                  const isLast = index === featureItems.length - 1;

                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => scrollToCard(item.id, e)}
                      className={`home1_features_link w-inline-block transition-all duration-300 cursor-pointer !opacity-100 flex items-start gap-4 p-4 rounded-2xl ${
                        isActive
                          ? "is-active bg-white border border-[#2979FF]/30 shadow-lg shadow-blue-500/10 scale-[1.02]"
                          : "hover:bg-white/60 border border-transparent opacity-60 hover:opacity-90"
                      }`}
                    >
                      <div className="home1_features_link-decor flex flex-col items-center pt-1.5 flex-shrink-0">
                        <div
                          className={`home1_features_link-dot rounded-full transition-all duration-300 ${
                            isActive
                              ? "bg-[#2979FF] scale-125 ring-4 ring-[#2979FF]/20 shadow-sm"
                              : "bg-[#0A1E3F]/30"
                          }`}
                          style={{ width: "12px", height: "12px" }}
                        ></div>
                        {!isLast && (
                          <div
                            className={`home1_features_link-line transition-colors duration-300 my-1 ${
                              isActive ? "bg-[#2979FF]" : "bg-slate-200"
                            }`}
                            style={{ width: "2px", minHeight: "64px" }}
                          ></div>
                        )}
                      </div>
                      <div className="home1_features_text pb-1 flex-1">
                        <div
                          className={`text-xl md:text-2xl transition-colors duration-200 tracking-tight leading-snug ${
                            isActive
                              ? "font-bold text-[#0D47A1]"
                              : "font-semibold text-[#0A1E3F]/80"
                          }`}
                        >
                          {item.title}
                        </div>
                        <div
                          className={`text-base md:text-[16px] mt-1.5 leading-relaxed transition-colors duration-200 ${
                            isActive ? "text-[#334155] font-normal" : "text-[#64748B]"
                          }`}
                        >
                          {item.desc}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right Features Cards List: 6 module cards matching Image 1 UI */}
            <div className="home1_features_list flex flex-col gap-8">
              {featureItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeId === item.id;

                return (
                  <div
                    key={item.id}
                    id={item.id}
                    className={`w-full rounded-3xl bg-white border p-6 sm:p-8 transition-all duration-300 shadow-sm flex flex-col justify-between ${
                      isActive
                        ? "border-[#2979FF] ring-2 ring-[#2979FF]/15 shadow-md -translate-y-0.5"
                        : "border-[#D5E3F7]/80 hover:border-blue-300 hover:shadow-md"
                    }`}
                  >
                    {/* Top Row: Icon + Category + Title & AI Badge */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-[#EEF4FE] border border-[#D0E2FB] text-[#0D47A1] flex items-center justify-center shrink-0">
                          <IconComponent className="w-6 h-6 stroke-[2]" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-[#1E70FF]">
                            {item.category}
                          </div>
                          <h3
                            className="text-xl sm:text-2xl font-bold text-[#0A1E3F] tracking-tight"
                            style={{ fontFamily: "var(--fonts--heading, 'Didact Gothic', sans-serif)" }}
                          >
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      {/* Right Tag */}
                      <div className="text-right shrink-0">
                        <div className="text-base sm:text-lg font-black text-[#1E70FF] tracking-tight">
                          {item.badgeTag}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono hidden sm:block">
                          {item.badgeSub}
                        </div>
                      </div>
                    </div>

                    {/* Middle: Description */}
                    <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed font-normal mt-5 mb-6">
                      {item.desc}
                    </p>

                    {/* 2x2 Feature Checklist Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {item.features.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border border-slate-200/90 bg-white text-xs sm:text-sm text-[#0A1E3F] font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#1E70FF] shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Row: CTA Button + Module Counter */}
                    <div animate="load-hero-3" data-animate="load-hero-3" className="flex items-center justify-between pt-5 border-t border-slate-100">
                      <Button
                        href="/#contact" variant="primary"
                      >
                        <span >{item.buttonText}</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Button>

                      <span className="text-xs font-mono text-slate-400 font-medium tracking-wider">
                        Module {item.num} of 06
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
