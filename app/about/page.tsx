"use client";

import React, { useEffect, useRef } from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Button } from "@/components/buttons/Button";
import { initAllAnimations } from "@/animations";
import {
  Layers,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Linkedin,
  Instagram,
  Mail,
  Quote,
} from "lucide-react";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cleanup = initAllAnimations(containerRef.current);
    return () => cleanup();
  }, []);

  return (
    <div ref={containerRef} className="page-wrapper">
      <Navbar />
      <main className="main-wrapper">
        {/* HERO SECTION */}
        <section className="section_home1_hero pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="padding-global">
            <div className="container-default">
              <div
                animate="load-hero-stagger"
                data-animate="load-hero-stagger"
                className="max-width-large align-center text-align-center"
              >
                <div
                  animate="load-hero-1"
                  data-animate="load-hero-1"
                  className="text-style-badge is-badge mb-4 inline-block"
                >
                  <div>Our Story</div>
                </div>
                <div className="spacer-tiny"></div>
                <h1
                  animate="load-hero-title"
                  data-animate="load-hero-title"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A1E3F]"
                >
                  Building India&apos;s <span className="text-[#2979FF]">Intelligent</span>
                  <br className="hidden sm:inline" /> Business OS
                </h1>
                <div className="spacer-small"></div>
                <p
                  animate="load-hero-2"
                  data-animate="load-hero-2"
                  className="text-size-large text-[#52667D] max-w-2xl mx-auto leading-relaxed"
                >
                  We started from a bedroom in Faridabad with a laptop, unstable WiFi, and a belief that Indian businesses deserve better software — built for them, not adapted from elsewhere.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VISION / THE PROBLEM WE'RE SOLVING */}
        <section className="py-16 md:py-24 border-t border-[#D5E3F7]/60 bg-[#F8FAFC]/50">
          <div className="padding-global">
            <div className="container-default">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <div className="text-style-badge is-badge mb-3 inline-block">
                  <div>Why We Exist</div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0A1E3F] tracking-tight mb-4">
                  The Problem We&apos;re Solving
                </h2>
                <p className="text-[#52667D] text-base md:text-lg leading-relaxed">
                  63 million SMBs in India are running on spreadsheets, WhatsApp, and 5–8 disconnected tools. They&apos;re not lacking effort — they&apos;re lacking clarity. That&apos;s what Zyoris fixes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Card 1: One Platform */}
                <div className="deploya-card p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#2979FF] border border-[#D5E3F7]/80 rounded-2xl bg-white group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#F0F5FF] border border-[#D4E2F5] flex items-center justify-center text-[#2979FF] mb-5 group-hover:bg-[#2979FF] group-hover:text-white transition-colors duration-200">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0A1E3F] mb-2.5 tracking-tight">
                      One Platform
                    </h3>
                    <p className="text-sm md:text-base text-[#52667D] leading-relaxed font-normal">
                      CRM, HR, Finance, AI Insights — everything in one place. No tool-switching, no copy-pasting data between systems.
                    </p>
                  </div>
                </div>

                {/* Card 2: Real AI, Not a Gimmick */}
                <div className="deploya-card p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#2979FF] border border-[#D5E3F7]/80 rounded-2xl bg-white group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#F0F5FF] border border-[#D4E2F5] flex items-center justify-center text-[#2979FF] mb-5 group-hover:bg-[#2979FF] group-hover:text-white transition-colors duration-200">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0A1E3F] mb-2.5 tracking-tight">
                      Real AI, Not a Gimmick
                    </h3>
                    <p className="text-sm md:text-base text-[#52667D] leading-relaxed font-normal">
                      Zyoris doesn&apos;t just show data — it tells you what to do next. Revenue forecasting, lead scoring, smart alerts. Included free.
                    </p>
                  </div>
                </div>

                {/* Card 3: Grows With You */}
                <div className="deploya-card p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#2979FF] border border-[#D5E3F7]/80 rounded-2xl bg-white group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#F0F5FF] border border-[#D4E2F5] flex items-center justify-center text-[#2979FF] mb-5 group-hover:bg-[#2979FF] group-hover:text-white transition-colors duration-200">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0A1E3F] mb-2.5 tracking-tight">
                      Grows With You
                    </h3>
                    <p className="text-sm md:text-base text-[#52667D] leading-relaxed font-normal">
                      Start with CRM. Add HR. Add Finance. One platform that expands with your company — no migrations, no data loss.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOUNDER SECTION */}
        <section className="py-16 md:py-24 border-t border-[#D5E3F7]/60 bg-white">
          <div className="padding-global">
            <div className="container-default max-w-4xl mx-auto">
              {/* Founder Header */}
              <div className="mb-8">
                <div className="text-style-badge is-badge mb-2 inline-block">
                  <div>Founder &amp; CEO</div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0A1E3F] tracking-tight">
                  Puneet Kumar
                </h2>
                <div className="flex items-center gap-1.5 text-sm font-medium text-[#52667D] mt-2">
                  <MapPin className="w-4 h-4 text-[#2979FF] flex-shrink-0" />
                  <span>Faridabad, Haryana, India</span>
                </div>
              </div>

              {/* Narrative */}
              <div className="space-y-4 text-base md:text-[17px] text-[#52667D] leading-relaxed">
                <p>
                  I&apos;m building Zyoris from scratch — no office, no external funding, no co-founder safety net. Just a laptop, a clear vision, and the refusal to wait for permission. Every line of product architecture, every design decision, every hiring call, every pitch — that&apos;s me, right now, every day.
                </p>
                <p>
                  I graduated from Maharshi Dayanand University (MDU), Rohtak, and went deep into things I was curious about rather than things I was told to study. I completed advanced training in investment management at HEC Paris, got Meta certified in digital marketing, and taught myself full-stack product building because I needed to build — not just talk about building.
                </p>
                <p>
                  Before Zyoris, I spent time studying how Indian businesses actually work: where they lose money, where they waste time, what tools they&apos;re forced to use versus what tools they actually want. The answer kept being the same — they&apos;re surviving on spreadsheets, WhatsApp groups, and disconnected apps because nothing was built for them. I decided to fix that.
                </p>

                {/* Quote Callout */}
                <div className="my-8 p-6 md:p-8 bg-[#F0F5FF] border-l-4 border-[#2979FF] rounded-r-2xl shadow-sm">
                  <Quote className="w-7 h-7 text-[#2979FF]/40 mb-2" />
                  <p className="text-lg md:text-xl font-medium text-[#0A1E3F] italic leading-snug">
                    &ldquo;I&apos;d rather spend 14 hours building something uncertain than 8 hours feeling controlled by someone else&apos;s system.&rdquo;
                  </p>
                </div>

                <p>
                  Zyoris is not a side project. It&apos;s the main thing — a full-stack business operating system for Indian SMBs that replaces 5–8 tools with one intelligent platform. I&apos;m leading product development, frontend architecture, backend decisions, team building, and business development simultaneously. It&apos;s a lot. That&apos;s the point.
                </p>
                <p>
                  I&apos;m deeply interested in the intersection of AI and business operations — not AI as a buzzword, but AI that actually reduces the decision load on a business owner. Zyoris has real-time revenue forecasting, lead scoring, smart alerts, and anomaly detection built in — not as upsells, but as core features, because I believe intelligence should be the default, not the premium.
                </p>
                <p>
                  Outside the product, I think a lot about what it means to build in India right now. We&apos;re at a rare moment: a generation of founders who actually understand both technology and the Indian market deeply. Zyoris is my bet on that moment.
                </p>
              </div>

              {/* Founder Tags */}
              <div className="flex flex-wrap gap-2.5 my-8">
                {[
                  "Full-Stack Product",
                  "System Architecture",
                  "AI & Automation",
                  "Investment Management · HEC Paris",
                  "Digital Marketing · Meta Certified",
                  "MDU Graduate",
                  "B2B SaaS",
                  "Indian SMB Market",
                  "Remote-First Builder",
                ].map((tag, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium bg-[#E8F1FC] border border-[#D4E2F5] text-[#0D47A1]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Founder Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 p-6 bg-[#F8FAFC] border border-[#D5E3F7]/80 rounded-2xl">
                <div className="text-center p-3">
                  <div className="text-3xl md:text-4xl font-extrabold text-[#2979FF] tracking-tight">1</div>
                  <div className="text-xs md:text-sm text-[#52667D] mt-1 font-medium">Founder doing it all</div>
                </div>
                <div className="text-center p-3">
                  <div className="text-3xl md:text-4xl font-extrabold text-[#2979FF] tracking-tight">63M+</div>
                  <div className="text-xs md:text-sm text-[#52667D] mt-1 font-medium">SMBs we&apos;re building for</div>
                </div>
                <div className="text-center p-3">
                  <div className="text-3xl md:text-4xl font-extrabold text-[#2979FF] tracking-tight">₹0</div>
                  <div className="text-xs md:text-sm text-[#52667D] mt-1 font-medium">External funding (so far)</div>
                </div>
                <div className="text-center p-3">
                  <div className="text-3xl md:text-4xl font-extrabold text-[#2979FF] tracking-tight">100%</div>
                  <div className="text-xs md:text-sm text-[#52667D] mt-1 font-medium">Commitment to the mission</div>
                </div>
              </div>

              {/* Founder Socials */}
              <div className="flex flex-wrap items-center gap-4 mt-6">
                <a
                  href="https://www.linkedin.com/in/puneetkumar07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#E8F1FC] border border-[#D4E2F5] text-[#0D47A1] hover:bg-[#2979FF] hover:text-white hover:border-[#2979FF] transition-all duration-200 shadow-sm"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/zyoris.technology/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#E8F1FC] border border-[#D4E2F5] text-[#0D47A1] hover:bg-[#2979FF] hover:text-white hover:border-[#2979FF] transition-all duration-200 shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TIMELINE / HOW WE GOT HERE (STORY) */}
        <section className="py-16 md:py-24 border-t border-[#D5E3F7]/60 bg-[#F8FAFC]/50">
          <div className="padding-global">
            <div className="container-default">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <div className="text-style-badge is-badge mb-3 inline-block">
                  <div>Timeline</div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0A1E3F] tracking-tight">
                  How We Got Here
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {/* Step 1 */}
                <div className="deploya-card p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#2979FF] border border-[#D5E3F7]/80 rounded-2xl bg-white group">
                  <div>
                    <div className="text-2xl md:text-3xl font-black text-[#2979FF]/30 font-heading mb-3 group-hover:text-[#2979FF] transition-colors">
                      01
                    </div>
                    <h3 className="text-lg font-bold text-[#0A1E3F] mb-2 tracking-tight">
                      The Frustration
                    </h3>
                    <p className="text-sm text-[#52667D] leading-relaxed font-normal">
                      Saw Indian SMBs struggling with expensive western tools not designed for Indian workflows, GST, or team structures.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="deploya-card p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#2979FF] border border-[#D5E3F7]/80 rounded-2xl bg-white group">
                  <div>
                    <div className="text-2xl md:text-3xl font-black text-[#2979FF]/30 font-heading mb-3 group-hover:text-[#2979FF] transition-colors">
                      02
                    </div>
                    <h3 className="text-lg font-bold text-[#0A1E3F] mb-2 tracking-tight">
                      The Decision
                    </h3>
                    <p className="text-sm text-[#52667D] leading-relaxed font-normal">
                      Left behind conventional career paths to build from scratch. Started with a laptop in Faridabad and a small remote team.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="deploya-card p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#2979FF] border border-[#D5E3F7]/80 rounded-2xl bg-white group">
                  <div>
                    <div className="text-2xl md:text-3xl font-black text-[#2979FF]/30 font-heading mb-3 group-hover:text-[#2979FF] transition-colors">
                      03
                    </div>
                    <h3 className="text-lg font-bold text-[#0A1E3F] mb-2 tracking-tight">
                      The Build
                    </h3>
                    <p className="text-sm text-[#52667D] leading-relaxed font-normal">
                      Product development, architecture, and design — all happening in parallel. Real product, real features, real code.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="deploya-card p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#2979FF] border border-[#D5E3F7]/80 rounded-2xl bg-white group">
                  <div>
                    <div className="text-2xl md:text-3xl font-black text-[#2979FF]/30 font-heading mb-3 group-hover:text-[#2979FF] transition-colors">
                      04
                    </div>
                    <h3 className="text-lg font-bold text-[#0A1E3F] mb-2 tracking-tight">
                      Early Access
                    </h3>
                    <p className="text-sm text-[#52667D] leading-relaxed font-normal">
                      Now onboarding first companies. Building with early customers to make sure Zyoris solves real problems, not imagined ones.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONNECT WITH US / FOLLOW THE JOURNEY */}
        <section className="py-16 md:py-24 border-t border-[#D5E3F7]/60 bg-white">
          <div className="padding-global">
            <div className="container-default">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <div className="text-style-badge is-badge mb-3 inline-block">
                  <div>Connect With Us</div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0A1E3F] tracking-tight mb-3">
                  Follow the Journey
                </h2>
                <p className="text-[#52667D] text-base md:text-lg">
                  We build in public. Follow along as we go from zero to product.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <a
                  href="https://www.linkedin.com/company/zyoris/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="deploya-card p-6 flex items-center gap-4 rounded-2xl border border-[#D5E3F7]/80 bg-white hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#2979FF] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F0F5FF] border border-[#D4E2F5] flex items-center justify-center text-[#2979FF] group-hover:bg-[#2979FF] group-hover:text-white transition-colors flex-shrink-0">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-[#0A1E3F] text-base group-hover:text-[#2979FF] transition-colors">LinkedIn</div>
                    <div className="text-xs text-[#52667D]">Zyoris Technology</div>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/zyoris.technology/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="deploya-card p-6 flex items-center gap-4 rounded-2xl border border-[#D5E3F7]/80 bg-white hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#2979FF] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F0F5FF] border border-[#D4E2F5] flex items-center justify-center text-[#2979FF] group-hover:bg-[#2979FF] group-hover:text-white transition-colors flex-shrink-0">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-[#0A1E3F] text-base group-hover:text-[#2979FF] transition-colors">Instagram</div>
                    <div className="text-xs text-[#52667D]">@zyoris.technology</div>
                  </div>
                </a>

                <a
                  href="mailto:zyoris.puneet@gmail.com"
                  className="deploya-card p-6 flex items-center gap-4 rounded-2xl border border-[#D5E3F7]/80 bg-white hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#2979FF] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F0F5FF] border border-[#D4E2F5] flex items-center justify-center text-[#2979FF] group-hover:bg-[#2979FF] group-hover:text-white transition-colors flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-[#0A1E3F] text-base group-hover:text-[#2979FF] transition-colors">Email Us</div>
                    <div className="text-xs text-[#52667D]">zyoris.puneet@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 md:py-28 border-t border-[#D5E3F7]/60 bg-[#F0F5FF]/60">
          <div className="padding-global">
            <div className="container-default">
              <div className="max-w-2xl mx-auto text-center p-8 md:p-14 bg-white border border-[#D5E3F7] rounded-3xl shadow-xl shadow-blue-500/5">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0A1E3F] tracking-tight mb-3">
                  Want to Join the Team?
                </h2>
                <p className="text-[#52667D] text-base md:text-lg mb-8 leading-relaxed">
                  We&apos;re hiring developers, designers, and builders who want to work on real products.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button href="/#careers" variant="primary">
                    View Open Positions →
                  </Button>
                  <Button href="/#contact" variant="secondary">
                    Get in Touch
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

