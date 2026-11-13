"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Button } from "@/components/buttons/Button";
import {
  Sparkles,
  Rocket,
  GraduationCap,
  Users,
  CheckCircle2,
  Mail,
  Send,
  HeartHandshake,
  Lightbulb,
  Zap,
} from "lucide-react";
import { PhoneOtpVerifier } from "@/components/auth/PhoneOtpVerifier";

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    role: "Full-Stack Development (Next.js / Node)",
    portfolio: "",
    whyJoin: "",
  });

  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct direct mailto to hr@zyoris.com with formatted body
    const subject = encodeURIComponent(
      `Internship / Role Application: ${formData.name} (${formData.role})`
    );

    const body = encodeURIComponent(
      `Candidate Application Details:\n\n` +
        `• Name: ${formData.name}\n` +
        `• Email: ${formData.email}\n` +
        `• Phone: ${formData.phone}\n` +
        `• College / Education: ${formData.college || "N/A"}\n` +
        `• Interested Role: ${formData.role}\n` +
        `• Portfolio / GitHub / LinkedIn: ${formData.portfolio || "N/A"}\n\n` +
        `• Why they want to join & What they bring:\n${formData.whyJoin}\n\n` +
        `Sent via Zyoris Careers Portal.`
    );

    // Open user's email client addressed directly to hr@zyoris.com
    window.location.href = `mailto:hr@zyoris.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-wrapper">
        
        {/* HERO SECTION - Styled exactly like other Zyoris pages */}
        <section className="section_home1_hero pt-28 pb-16 md:pt-36 md:pb-24 border-b border-[#C2D4EE]/40 bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9]/60">
          <div className="padding-global">
            <div className="container-default max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F1FC] border border-[#C2D4EE] text-[#0D47A1] text-xs font-semibold tracking-wide uppercase mb-5">
                <Sparkles className="w-3.5 h-3.5 text-[#2979FF]" />
                <span>Careers &amp; Student Mentorship</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A1E3F] leading-[1.15]">
                We Don&apos;t Care About Years of Experience. <br className="hidden sm:inline" />
                We Care About <span className="text-[#2979FF]">Obsession &amp; Execution.</span>
              </h1>

              <p className="mt-5 text-base sm:text-lg md:text-xl text-[#0A1E3F]/75 max-w-2xl mx-auto font-normal leading-relaxed">
                If you are a student, self-taught coder, or hungry builder with real curiosity, fresh ideas, and team spirit, Zyoris is where you build real software that ships to real businesses.
              </p>
            </div>
          </div>
        </section>

        {/* WHAT WE LOOK FOR VS WHAT WE DON'T CARE ABOUT */}
        <section className="py-16 md:py-20 bg-white border-b border-[#C2D4EE]/50">
          <div className="padding-global">
            <div className="container-default max-w-6xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="text-style-badge is-badge mb-3 inline-block">
                  <div>Our Culture</div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0A1E3F] tracking-tight">
                  What Matters at Zyoris
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* What We Don't Care About */}
                <div className="p-7 md:p-8 rounded-2xl bg-slate-50 border border-slate-200">
                  <h3 className="text-xl font-bold text-[#0A1E3F] mb-4 flex items-center gap-2">
                    <span className="text-red-500 font-black">✕</span> What We Don&apos;t Require
                  </h3>
                  <ul className="space-y-3.5 text-sm md:text-base text-[#52667D]">
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-400 font-bold mt-0.5">•</span>
                      <span>No 5+ years experience demands for junior/intern roles</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-400 font-bold mt-0.5">•</span>
                      <span>No tier-1 college tag requirements (IIT/NIT/BITS not mandatory)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-400 font-bold mt-0.5">•</span>
                      <span>No fancy pedigree or corporate buzzword resumes</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-400 font-bold mt-0.5">•</span>
                      <span>No coffee-fetching or certificate rituals: only real work</span>
                    </li>
                  </ul>
                </div>

                {/* What We Truly Value */}
                <div className="p-7 md:p-8 rounded-2xl bg-[#F0F5FF]/70 border border-[#2979FF]/30 shadow-sm">
                  <h3 className="text-xl font-bold text-[#0A1E3F] mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#2979FF]" /> What We Truly Value
                  </h3>
                  <ul className="space-y-3.5 text-sm md:text-base text-[#0A1E3F]/85">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2979FF] mt-1 flex-shrink-0" />
                      <span><strong>Genuine Drive:</strong> Someone who truly wants to build, learn, and see their work live</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2979FF] mt-1 flex-shrink-0" />
                      <span><strong>Creativity &amp; Fresh Ideas:</strong> Not afraid to propose better ways of solving a problem</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2979FF] mt-1 flex-shrink-0" />
                      <span><strong>Strong Teamwork:</strong> Low ego, high curiosity, and active peer collaboration</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2979FF] mt-1 flex-shrink-0" />
                      <span><strong>Direct Founder Mentorship:</strong> Fast-track your engineering learning directly with leadership</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* APPLICATION FORM & SIDEBAR SECTION */}
        <section className="section_home1_faq py-16 md:py-24 bg-[#FAFBFD]">
          <div className="padding-global">
            <div className="container-default max-w-5xl mx-auto">
              
              <div className="faq_grid">
                
                {/* Left Side: Info Box */}
                <div className="faq_left">
                  <div>
                    <div className="text-style-badge is-badge mb-3 inline-block">
                      <div>Join The Crew</div>
                    </div>
                    <div className="spacer-xsmall"></div>
                    <h2>Ready to Build Real Software?</h2>
                    <div className="spacer-tiny"></div>
                    <p className="text-sm md:text-base text-[#52667D] leading-relaxed">
                      Fill out this brief application. Your details go directly to our hiring team at <strong>hr@zyoris.com</strong>.
                    </p>
                  </div>

                  <div className="home1_faq_banner !grid-cols-1 mt-6">
                    <div className="home1_faq_copy !p-6 rounded-2xl bg-white border border-[#C2D4EE]/80 shadow-sm">
                      <div className="text-size-medium font-semibold text-[#0A1E3F]">
                        Hiring Team
                      </div>
                      <div className="text-size-small text-style-muted mt-1">
                        Zyoris Technology
                      </div>
                      
                      <div className="space-y-2 mt-4 text-xs font-medium text-[#0A1E3F]">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-[#2979FF] flex-shrink-0" />
                          <span>hr@zyoris.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-[#2979FF] flex-shrink-0" />
                          <span>Interns &amp; College Students Welcome</span>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100 text-xs text-[#52667D]">
                        We review every application personally and respond within 48 business hours.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: The Interactive Form */}
                <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl border border-[#C2D4EE]/80 shadow-sm">
                  {submitted ? (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 rounded-full bg-[#E8F1FC] text-[#2979FF] flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#0A1E3F]">Application Prepared!</h3>
                      <p className="text-sm md:text-base text-[#52667D] mt-2 max-w-md mx-auto">
                        Your email client has been opened to send your application directly to <strong>hr@zyoris.com</strong>.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-6 px-5 py-2.5 bg-[#0D47A1] text-white text-xs font-semibold rounded-lg hover:bg-[#0A1E3F] transition-all"
                      >
                        Submit Another Response
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 text-left">
                      <div>
                        <label className="block text-xs font-bold uppercase text-[#0A1E3F]/80 mb-1.5">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-3 rounded-xl border border-[#C2D4EE] text-[#0A1E3F] text-sm focus:outline-none focus:border-[#2979FF] bg-slate-50/50"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-[#0A1E3F]/80 mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="you@email.com"
                            className="w-full px-4 py-3 rounded-xl border border-[#C2D4EE] text-[#0A1E3F] text-sm focus:outline-none focus:border-[#2979FF] bg-slate-50/50"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-[#0A1E3F]/80 mb-1.5">
                            Phone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => {
                              setFormData({ ...formData, phone: e.target.value });
                              setIsPhoneVerified(false);
                            }}
                            placeholder="+91 98765 43210"
                            className="w-full px-4 py-3 rounded-xl border border-[#C2D4EE] text-[#0A1E3F] text-sm focus:outline-none focus:border-[#2979FF] bg-slate-50/50"
                          />
                          <PhoneOtpVerifier
                            phoneNumber={formData.phone}
                            isVerified={isPhoneVerified}
                            onVerified={(verified) => setIsPhoneVerified(verified)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-[#0A1E3F]/80 mb-1.5">
                            College / Education (or Self-Taught)
                          </label>
                          <input
                            type="text"
                            value={formData.college}
                            onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                            placeholder="e.g. MDU Rohtak, Delhi Univ, Self-taught"
                            className="w-full px-4 py-3 rounded-xl border border-[#C2D4EE] text-[#0A1E3F] text-sm focus:outline-none focus:border-[#2979FF] bg-slate-50/50"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-[#0A1E3F]/80 mb-1.5">
                            Role You Want To Work In *
                          </label>
                          <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#C2D4EE] text-[#0A1E3F] text-sm focus:outline-none focus:border-[#2979FF] bg-slate-50/50"
                          >
                            <option value="Full-Stack Web (Next.js / Node)">Full-Stack Web (Next.js / Node)</option>
                            <option value="Frontend & UI/UX Design">Frontend &amp; UI/UX Design</option>
                            <option value="AI & Backend Automation">AI &amp; Backend Automation</option>
                            <option value="Product Marketing & Growth">Product Marketing &amp; Growth</option>
                            <option value="Customer Success & Operations">Customer Success &amp; Operations</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-[#0A1E3F]/80 mb-1.5">
                          GitHub / LinkedIn / Portfolio / Projects Link
                        </label>
                        <input
                          type="text"
                          value={formData.portfolio}
                          onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                          placeholder="https://github.com/your-username or project link"
                          className="w-full px-4 py-3 rounded-xl border border-[#C2D4EE] text-[#0A1E3F] text-sm focus:outline-none focus:border-[#2979FF] bg-slate-50/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-[#0A1E3F]/80 mb-1.5">
                          Tell Us About Your Drive &amp; Ideas (Why Zyoris?) *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formData.whyJoin}
                          onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
                          placeholder="Tell us what you love building, any cool project you worked on, or what ideas you bring to the team..."
                          className="w-full px-4 py-3 rounded-xl border border-[#C2D4EE] text-[#0A1E3F] text-sm focus:outline-none focus:border-[#2979FF] bg-slate-50/50"
                        ></textarea>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={!isPhoneVerified}
                          className="w-full py-3.5 px-6 rounded-xl bg-[#0D47A1] hover:bg-[#0A1E3F] disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                          <span>
                            {isPhoneVerified
                              ? "Submit Application to hr@zyoris.com"
                              : "Verify Phone via OTP to Submit"}
                          </span>
                        </button>
                      </div>
                    </form>
                  )}
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
