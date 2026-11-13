"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Building,
  ArrowRight,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    teamSize: "10-50 employees",
    inquiryType: "Sales & Demo",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Inquiry: ${formData.company || formData.name} - ${formData.inquiryType}`
    );

    const body = encodeURIComponent(
      `New Contact Inquiry from Zyoris Website:\n\n` +
        `• Name: ${formData.name}\n` +
        `• Email: ${formData.email}\n` +
        `• Phone: ${formData.phone || "N/A"}\n` +
        `• Company: ${formData.company || "N/A"}\n` +
        `• Team Size: ${formData.teamSize}\n` +
        `• Inquiry Type: ${formData.inquiryType}\n\n` +
        `• Message / Details:\n${formData.message}\n\n` +
        `Sent via Zyoris Contact Page.`
    );

    // Open mailto to info@zyoris.com
    window.location.href = `mailto:info@zyoris.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-wrapper">
        
        {/* HERO SECTION */}
        <section className="section_home1_hero pt-28 pb-16 md:pt-36 md:pb-24 border-b border-[#C2D4EE]/40 bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9]/60">
          <div className="padding-global">
            <div className="container-default max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F1FC] border border-[#C2D4EE] text-[#0D47A1] text-xs font-semibold tracking-wide uppercase mb-5">
                <Sparkles className="w-3.5 h-3.5 text-[#2979FF]" />
                <span>Get In Touch</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A1E3F] leading-[1.15]">
                Let&apos;s Talk About Scaling <br className="hidden sm:inline" />
                Your <span className="text-[#2979FF]">Business Operations</span>
              </h1>

              <p className="mt-4 text-base sm:text-lg md:text-xl text-[#0A1E3F]/75 max-w-2xl mx-auto font-normal leading-relaxed">
                Whether you want a personalized product walkthrough, need help migrating from Tally/Zoho, or want early adopter founder pricing, we are here for you.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT CARDS & INTERACTIVE FORM */}
        <section className="section_home1_faq py-16 md:py-24 bg-[#FAFBFD]">
          <div className="padding-global">
            <div className="container-default max-w-6xl mx-auto">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Left Side: Contact Channels & Location info */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Channels Card */}
                  <div className="bg-white p-7 md:p-8 rounded-2xl border border-[#C2D4EE]/80 shadow-sm space-y-6">
                    <h2 className="text-xl font-bold text-[#0A1E3F] tracking-tight">
                      Contact Information
                    </h2>
                    <p className="text-sm text-[#52667D] leading-relaxed">
                      Reach out through any of our official channels. Our team responds directly within 2 to 4 business hours.
                    </p>

                    <div className="space-y-4 pt-2">
                      {/* Email */}
                      <a
                        href="mailto:info@zyoris.com"
                        className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-[#F0F5FF] hover:border-[#2979FF]/40 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white border border-[#C2D4EE] flex items-center justify-center text-[#2979FF] shadow-sm flex-shrink-0 group-hover:bg-[#2979FF] group-hover:text-white transition-colors">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase text-[#52667D]">General &amp; Sales</div>
                          <div className="text-sm md:text-base font-bold text-[#0A1E3F] group-hover:text-[#2979FF] transition-colors">
                            info@zyoris.com
                          </div>
                        </div>
                      </a>

                      {/* Phone / WhatsApp */}
                      <a
                        href="tel:+919650553728"
                        className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-[#F0F5FF] hover:border-[#2979FF]/40 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white border border-[#C2D4EE] flex items-center justify-center text-[#2979FF] shadow-sm flex-shrink-0 group-hover:bg-[#2979FF] group-hover:text-white transition-colors">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase text-[#52667D]">Call / WhatsApp Directly</div>
                          <div className="text-sm md:text-base font-bold text-[#0A1E3F] group-hover:text-[#2979FF] transition-colors">
                            +91 96505 53728
                          </div>
                        </div>
                      </a>

                      {/* Careers / HR */}
                      <Link
                        href="/careers"
                        className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-[#F0F5FF] hover:border-[#2979FF]/40 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white border border-[#C2D4EE] flex items-center justify-center text-[#2979FF] shadow-sm flex-shrink-0 group-hover:bg-[#2979FF] group-hover:text-white transition-colors">
                          <Building className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase text-[#52667D]">Careers &amp; Internships</div>
                          <div className="text-sm md:text-base font-bold text-[#0A1E3F] group-hover:text-[#2979FF] transition-colors flex items-center gap-1.5">
                            <span>hr@zyoris.com</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#2979FF]" />
                          </div>
                        </div>
                      </Link>

                      {/* Location */}
                      <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/70">
                        <div className="w-10 h-10 rounded-lg bg-white border border-[#C2D4EE] flex items-center justify-center text-[#2979FF] shadow-sm flex-shrink-0">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase text-[#52667D]">Headquarters</div>
                          <div className="text-sm font-bold text-[#0A1E3F]">
                            Faridabad (Delhi NCR), India
                          </div>
                          <div className="text-xs text-[#52667D] mt-0.5">
                            Serving growing businesses across India
                          </div>
                        </div>
                      </div>

                      {/* Working Hours */}
                      <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/70">
                        <div className="w-10 h-10 rounded-lg bg-white border border-[#C2D4EE] flex items-center justify-center text-[#2979FF] shadow-sm flex-shrink-0">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase text-[#52667D]">Support Hours</div>
                          <div className="text-sm font-bold text-[#0A1E3F]">
                            Monday to Saturday: 9:30 AM to 6:30 PM IST
                          </div>
                          <div className="text-xs text-[#52667D] mt-0.5">
                            24/7 priority emergency response for active tenants
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Side: Detailed Inquiry Form */}
                <div className="lg:col-span-7 bg-white p-6 sm:p-8 md:p-10 rounded-2xl border border-[#C2D4EE]/80 shadow-sm">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[#0A1E3F] tracking-tight">
                      Send Us a Message
                    </h2>
                    <p className="text-sm text-[#52667D] mt-1">
                      Fill out the form below and we will get back to you with custom answers.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-[#E8F1FC] text-[#2979FF] flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#0A1E3F]">Message Prepared!</h3>
                      <p className="text-sm md:text-base text-[#52667D] mt-2 max-w-md mx-auto">
                        Your email client has opened with pre-filled details to send directly to <strong>info@zyoris.com</strong>.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-6 px-5 py-2.5 bg-[#0D47A1] text-white text-xs font-semibold rounded-lg hover:bg-[#0A1E3F] transition-all"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 text-left">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-[#0A1E3F]/80 mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your name"
                            className="w-full px-4 py-3 rounded-xl border border-[#C2D4EE] text-[#0A1E3F] text-sm focus:outline-none focus:border-[#2979FF] bg-slate-50/50"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-[#0A1E3F]/80 mb-1.5">
                            Business Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@company.com"
                            className="w-full px-4 py-3 rounded-xl border border-[#C2D4EE] text-[#0A1E3F] text-sm focus:outline-none focus:border-[#2979FF] bg-slate-50/50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-[#0A1E3F]/80 mb-1.5">
                            Phone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 96505 53728"
                            className="w-full px-4 py-3 rounded-xl border border-[#C2D4EE] text-[#0A1E3F] text-sm focus:outline-none focus:border-[#2979FF] bg-slate-50/50"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-[#0A1E3F]/80 mb-1.5">
                            Company Name
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="e.g. Zyoris Technologies"
                            className="w-full px-4 py-3 rounded-xl border border-[#C2D4EE] text-[#0A1E3F] text-sm focus:outline-none focus:border-[#2979FF] bg-slate-50/50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-[#0A1E3F]/80 mb-1.5">
                            Team Size
                          </label>
                          <select
                            value={formData.teamSize}
                            onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#C2D4EE] text-[#0A1E3F] text-sm focus:outline-none focus:border-[#2979FF] bg-slate-50/50"
                          >
                            <option value="1-10 employees">1 - 10 employees</option>
                            <option value="10-50 employees">10 - 50 employees</option>
                            <option value="50-200 employees">50 - 200 employees</option>
                            <option value="200+ employees">200+ employees</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-[#0A1E3F]/80 mb-1.5">
                            What are you looking for?
                          </label>
                          <select
                            value={formData.inquiryType}
                            onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#C2D4EE] text-[#0A1E3F] text-sm focus:outline-none focus:border-[#2979FF] bg-slate-50/50"
                          >
                            <option value="Sales & Demo">Book a Live 1-on-1 Demo</option>
                            <option value="Early Access Pricing">Lock in Founder Early Access</option>
                            <option value="Data Migration">Migrate from Tally / Zoho / Excel</option>
                            <option value="Partnership / CA Program">Partner / CA Program</option>
                            <option value="General Inquiry">General Question</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-[#0A1E3F]/80 mb-1.5">
                          How can we help? *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your current tool stack or specific requirements..."
                          className="w-full px-4 py-3 rounded-xl border border-[#C2D4EE] text-[#0A1E3F] text-sm focus:outline-none focus:border-[#2979FF] bg-slate-50/50"
                        ></textarea>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full py-3.5 px-6 rounded-xl bg-[#0D47A1] hover:bg-[#0A1E3F] text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                        >
                          <Send className="w-4 h-4" />
                          <span>Send Message to info@zyoris.com</span>
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
