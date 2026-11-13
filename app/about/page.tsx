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
  GraduationCap,
  Rocket,
  CheckCircle2,
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
                  We started from a bedroom in Faridabad with a laptop, unstable WiFi, and a belief that Indian businesses deserve better software, built for them, not adapted from elsewhere.
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
                  63 million SMBs in India are running on spreadsheets, WhatsApp, and 5 to 8 disconnected tools. They are not lacking effort, they are lacking clarity. That is what Zyoris fixes.
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
                      CRM, HR, Finance, AI Insights: everything in one place. No tool-switching, no copy-pasting data between systems.
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
                      Zyoris does not just show data: it tells you what to do next. Revenue forecasting, lead scoring, smart alerts. Included free.
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
                      Start with CRM. Add HR. Add Finance. One platform that expands with your company, with zero migrations and no data loss.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOUNDER & CEO SECTION (Optimized for Google search: Puneet Kumar Founder & CEO of Zyoris) */}
        <section className="py-16 md:py-24 border-t border-[#D5E3F7]/60 bg-white">
          {/* JSON-LD Schema for Puneet Kumar Founder and CEO of Zyoris */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Puneet Kumar",
                alternateName: ["Puneet Munjal", "Puneet Kumar Zyoris"],
                jobTitle: "Founder & CEO",
                worksFor: {
                  "@type": "Organization",
                  name: "Zyoris",
                  url: "https://zyoris.com",
                  description: "India's Intelligent Business Operating System",
                },
                url: "https://zyoris.com/about",
                sameAs: [
                  "https://www.linkedin.com/in/puneetkumar07",
                  "https://www.linkedin.com/in/puneetmunjal7",
                  "https://www.instagram.com/zyoris.technology/",
                ],
                alumniOf: "Maharshi Dayanand University",
                knowsAbout: [
                  "Business Operating Systems",
                  "AI & SaaS Architecture",
                  "Indian SMB Operations",
                  "Investment Management",
                ],
              }),
            }}
          />
          <div className="padding-global">
            <div className="container-default max-w-4xl mx-auto">
              {/* Founder Header */}
              <div className="mb-8">
                <div className="text-style-badge is-badge mb-2 inline-block">
                  <div>Founder &amp; CEO</div>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1E3F] tracking-tight">
                  Puneet Kumar
                </h2>
                <div className="text-base md:text-lg font-semibold text-[#2979FF] mt-1">
                  Founder &amp; CEO, Zyoris
                </div>
                <div className="flex items-center gap-1.5 text-sm font-medium text-[#52667D] mt-2">
                  <MapPin className="w-4 h-4 text-[#2979FF] flex-shrink-0" />
                  <span>Delhi NCR (Faridabad), India</span>
                </div>
              </div>

              {/* Narrative */}
              <div className="space-y-4 text-base md:text-[17px] text-[#52667D] leading-relaxed">
                <p>
                  I am building Zyoris from scratch: no bloated corporate bureaucracy, no external investor interference, and no excuses. Just a laptop, a sharp architectural vision, and the refusal to wait for permission. Every line of core system architecture, UI design choice, team mentorship, and product deployment is driven with founder-first focus.
                </p>
                <p>
                  An alumnus of Maharshi Dayanand University (MDU), Rohtak, I deliberately pursued deep hands-on mastery over conventional theoretical paths. I completed advanced executive training in investment management at HEC Paris, earned Meta certification in digital systems and performance marketing, and self-taught full-stack enterprise architecture because building scalable products requires real execution, not surface-level theory.
                </p>
                <p>
                  Before founding Zyoris, I spent years studying how Indian businesses truly run day-to-day: where revenue leaks, why customer leads fall through the cracks, and why founders struggle with 5 to 8 disconnected software tools. Indian SMBs do not need another bloated Western software with a dollar price tag. They need one cohesive, intelligent operating system built ground-up for their exact realities. That is Zyoris.
                </p>

                {/* Quote Callout */}
                <div className="my-8 p-6 md:p-8 bg-[#F0F5FF] border-l-4 border-[#2979FF] rounded-r-2xl shadow-sm">
                  <Quote className="w-7 h-7 text-[#2979FF]/40 mb-2" />
                  <p className="text-lg md:text-xl font-medium text-[#0A1E3F] italic leading-snug">
                    &ldquo;I would rather spend 14 hours a day building something real and transformative than 8 hours feeling confined inside someone else&apos;s legacy system.&rdquo;
                  </p>
                </div>

                <p>
                  Zyoris is not a side experiment. It is the flagship mission: a full-stack Intelligent Business Operating System for Indian enterprises that unifies Sales CRM, HRMS, GST Invoicing, and AI Analytics under one roof. Intelligence is our baseline standard, giving every business real-time cash flow forecasting, lead velocity alerts, and predictive recommendations out-of-the-box.
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
                      Product development, architecture, and design, all happening in parallel. Real product, real features, real code.
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
                  href="mailto:info@zyoris.com"
                  className="deploya-card p-6 flex items-center gap-4 rounded-2xl border border-[#D5E3F7]/80 bg-white hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#2979FF] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F0F5FF] border border-[#D4E2F5] flex items-center justify-center text-[#2979FF] group-hover:bg-[#2979FF] group-hover:text-white transition-colors flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-[#0A1E3F] text-base group-hover:text-[#2979FF] transition-colors">Email Us</div>
                    <div className="text-xs text-[#52667D]">info@zyoris.com</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* INTERNS & COLLEGE STUDENTS SECTION (Empowering the next generation with hands-on experience) */}
        <section className="py-16 md:py-24 border-t border-[#D5E3F7]/60 bg-gradient-to-b from-[#F8FAFC]/50 to-white">
          <div className="padding-global">
            <div className="container-default max-w-5xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <div className="text-style-badge is-badge mb-3 inline-block">
                  <div>Mentorship &amp; Real Growth</div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0A1E3F] tracking-tight mb-4">
                  Giving College Students &amp; Interns Real Hands-on Experience
                </h2>
                <p className="text-[#52667D] text-base md:text-lg leading-relaxed">
                  We believe young talent needs real codebases, production deployments, and direct mentorship: not coffee-fetching or certificate-printing rituals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="deploya-card p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#2979FF] border border-[#D5E3F7]/80 rounded-2xl bg-white group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#F0F5FF] border border-[#D4E2F5] flex items-center justify-center text-[#2979FF] mb-5 group-hover:bg-[#2979FF] group-hover:text-white transition-colors duration-200">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0A1E3F] mb-2.5 tracking-tight">
                      Zero College Bias
                    </h3>
                    <p className="text-sm md:text-base text-[#52667D] leading-relaxed font-normal">
                      Whether you study at an IIT or a local tier-3 college in Rohtak or Faridabad, only your drive, consistency, and problem-solving curiosity matter to us.
                    </p>
                  </div>
                </div>

                <div className="deploya-card p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#2979FF] border border-[#D5E3F7]/80 rounded-2xl bg-white group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#F0F5FF] border border-[#D4E2F5] flex items-center justify-center text-[#2979FF] mb-5 group-hover:bg-[#2979FF] group-hover:text-white transition-colors duration-200">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0A1E3F] mb-2.5 tracking-tight">
                      Real Production Code
                    </h3>
                    <p className="text-sm md:text-base text-[#52667D] leading-relaxed font-normal">
                      Interns at Zyoris write features that ship directly to live users: Next.js frontend, Node/Python microservices, AI workflows, and cloud databases.
                    </p>
                  </div>
                </div>

                <div className="deploya-card p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#2979FF] border border-[#D5E3F7]/80 rounded-2xl bg-white group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#F0F5FF] border border-[#D4E2F5] flex items-center justify-center text-[#2979FF] mb-5 group-hover:bg-[#2979FF] group-hover:text-white transition-colors duration-200">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0A1E3F] mb-2.5 tracking-tight">
                      Direct Founder Mentorship
                    </h3>
                    <p className="text-sm md:text-base text-[#52667D] leading-relaxed font-normal">
                      Work directly with Puneet Kumar on system architecture, design decisions, and startup mechanics to fast-track your engineering maturity.
                    </p>
                  </div>
                </div>
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
                  Want to Build with Zyoris?
                </h2>
                <p className="text-[#52667D] text-base md:text-lg mb-8 leading-relaxed">
                  Whether you are an ambitious student seeking an internship or an experienced builder, we would love to hear from you.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button href="/careers" variant="primary">
                    Apply for Internship / Roles →
                  </Button>
                  <Button href="/contact" variant="secondary">
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

