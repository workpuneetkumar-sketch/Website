"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Button } from "@/components/buttons/Button";
import { Mail, Phone } from "lucide-react";

interface FAQItem {
  id: string;
  category: "all" | "overview" | "product" | "pricing" | "security" | "support";
  question: string;
  answer: string;
}

const FAQ_CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "overview", label: "Overview & Company" },
  { id: "product", label: "Product & Features" },
  { id: "pricing", label: "Pricing & Plans" },
  { id: "security", label: "Security & DPDP" },
  { id: "support", label: "Implementation & Support" },
] as const;

const FAQ_LIST: FAQItem[] = [
  // 1. Overview & Google Search Intent (SEO)
  {
    id: "ov-1",
    category: "overview",
    question: "What does Zyoris do?",
    answer:
      "Zyoris is India's Intelligent Business Operating System (Business OS). It unifies core business operations (Sales & CRM, HR & Payroll, Accounting & Invoicing, and AI Analytics) into a single synchronized workspace designed specifically for Indian fast-growing companies and mid-market enterprises.",
  },
  {
    id: "ov-2",
    category: "overview",
    question: "Who is the founder of Zyoris?",
    answer:
      "Zyoris was founded by Puneet Munjal, bringing deep expertise in building enterprise-grade SaaS, AI reasoning agents, distributed architectures, and intuitive workflows tailored for the Indian business ecosystem.",
  },
  {
    id: "ov-3",
    category: "overview",
    question: "Is Zyoris fully Indian?",
    answer:
      "Yes, Zyoris is 100% Indian-origin and engineered in India. All customer data and infrastructure are securely hosted in compliant Indian cloud datacenters (AWS Mumbai / Azure Central India), complying strictly with the Digital Personal Data Protection (DPDP) Act 2023 and RBI data localization norms.",
  },
  {
    id: "ov-4",
    category: "overview",
    question: "Zyoris कंपनी क्या करती है? (What does Zyoris company do?)",
    answer:
      "Zyoris भारत का ऑल-इन-वन इंटेलिजेंट बिज़नेस ऑपरेटिंग सिस्टम है। यह आपकी कंपनी के सेल्स (CRM), एचआर और पेरोल (HRMS), बिलिंग और जीएसटी एकाउंटिंग, तथा एआई इनसाइट्स को एक ही आसान सॉफ्टवेयर में जोड़ता है, ताकि आपको 5 अलग-अलग महंगे टूल्स न खरीदने पड़ें।",
  },
  {
    id: "ov-5",
    category: "overview",
    question: "How is Zyoris different from Zoho, Salesforce, or HubSpot?",
    answer:
      "Zoho offers 45+ disconnected apps where syncing often breaks, Salesforce charges enterprise Western prices with 90% unused bloatware, and HubSpot becomes exponentially expensive as contacts grow. Zyoris gives you one unified platform without plugin hell, designed natively for Indian GST, rupee payroll, and local sales workflows at transparent locked-in pricing.",
  },
  {
    id: "ov-6",
    category: "overview",
    question: "What is an 'Intelligent Business OS'?",
    answer:
      "Unlike traditional SaaS tools that keep CRM, HRMS, and Accounting in separate silos, an Intelligent Business OS interconnects all departments on one central database. An autonomous AI layer sits on top, analyzing operational signals in real time to tell founders and executives what decisions to take next.",
  },
  {
    id: "ov-7",
    category: "overview",
    question: "Which industries does Zyoris cater to?",
    answer:
      "Zyoris is optimized for Indian B2B services, IT consultancies, manufacturing units, logistics & supply chain companies, D2C/retail agencies, healthcare networks, financial service distributors, and fast-scaling startups with 10 to 500+ employees.",
  },
  {
    id: "ov-8",
    category: "overview",
    question: "Why should an Indian business switch to Zyoris in 2026?",
    answer:
      "Switching eliminates subscription fatigue, reduces IT overhead by up to 60%, automates Indian tax and payroll compliance effortlessly, and empowers your team with an AI co-pilot that understands Indian market dynamics and WhatsApp-first customer engagement.",
  },
  {
    id: "ov-9",
    category: "overview",
    question: "Where is the Zyoris corporate headquarters located?",
    answer:
      "Zyoris is based out of Delhi NCR, India, operating hybrid development and client success operations across major Indian tech hubs including Bengaluru, Mumbai, and Gurugram.",
  },
  {
    id: "ov-10",
    category: "overview",
    question: "Does Zyoris offer partner or chartered accountant programs?",
    answer:
      "Yes. For chartered accountants, tax consultants, IT system integrators, and business advisory firms, Zyoris provides certified partner accounts and co-branded enterprise deployments with lucrative recurring revenue share models.",
  },

  // 2. Product & Features
  {
    id: "pr-1",
    category: "product",
    question: "What core modules are included inside the Zyoris platform?",
    answer:
      "Zyoris includes 5 foundational pillars: 1) Sales & CRM Pipeline, 2) HRMS, Attendance & Automated Rupee Payroll, 3) Finance, e-Invoicing & GST Accounting, 4) AI Executive Insights Co-Pilot, and 5) Integrated Omnichannel Customer Support with WhatsApp & Cloud Telephony.",
  },
  {
    id: "pr-2",
    category: "product",
    question: "How does Zyoris CRM handle lead management and pipelines?",
    answer:
      "Zyoris CRM automatically captures leads from your website, Google Ads, Meta Ads, LinkedIn, IndiaMART, Justdial, and WhatsApp. It scores leads using predictive AI, routes them to the right sales executive, tracks deal velocity on visual Kanban boards, and logs all communication automatically.",
  },
  {
    id: "pr-3",
    category: "product",
    question: "Does Zyoris provide native WhatsApp Business API integration?",
    answer:
      "Yes! Zyoris integrates official WhatsApp Business API natively. You can trigger automated order confirmations, payment reminders, lead follow-up nudges, and customer service chats directly from the CRM without external middle-ware like Zapier.",
  },
  {
    id: "pr-4",
    category: "product",
    question: "How does the HRMS & Payroll module handle Indian compliance?",
    answer:
      "Zyoris HRMS automatically calculates PF (Provident Fund), ESI, Professional Tax (state-wise slabs), TDS deductions, and generates Form 16 ready salary slips with a single click. It also provides biometric and geofenced selfie attendance tracking.",
  },
  {
    id: "pr-5",
    category: "product",
    question: "Can employees manage leave and claims via a self-service portal?",
    answer:
      "Yes, Zyoris provides an intuitive Employee Self-Service (ESS) web portal and mobile app where staff can mark attendance, submit leave requests, file expense reimbursement bills with OCR receipt scanning, and download tax sheets.",
  },
  {
    id: "pr-6",
    category: "product",
    question: "Does Zyoris support GST filing and automated e-Invoicing?",
    answer:
      "Yes. Zyoris Finance generates IRN-compliant e-invoices with dynamic QR codes and auto-generates E-Way bills directly connected to the GSTN portal. It also reconciles GSTR-1, GSTR-2B, and GSTR-3B to prevent input tax credit (ITC) leakages.",
  },
  {
    id: "pr-7",
    category: "product",
    question: "Can I connect Indian current bank accounts with Zyoris?",
    answer:
      "Yes. Through secure Open Banking and Account Aggregator APIs, Zyoris connects with leading Indian banks (HDFC, ICICI, SBI, Axis, Kotak) for automated bank feed syncing, one-click vendor payouts, and fast reconciliation.",
  },
  {
    id: "pr-8",
    category: "product",
    question: "What is the AI Co-Pilot in Zyoris and how does it work?",
    answer:
      "Zyoris AI is not a generic chatbot. It is a contextual operational brain. It analyzes your daily cash inflows, deals stuck in sales stages, pending invoices, and employee attrition trends, delivering proactive alerts like: 'Deal #402 is likely to slip this quarter' or 'Follow up with Client X for ₹12.5L overdue invoice.'",
  },
  {
    id: "pr-9",
    category: "product",
    question: "Can Zyoris integrate with our existing IVR / Call Centre system?",
    answer:
      "Yes. Zyoris includes an embedded Cloud Telephony dialer supporting leading providers (Exotel, Knowlarity, Tata Tele, Twilio). It enables one-click calling, automated call recording, and call log syncing against contact timeline records.",
  },
  {
    id: "pr-10",
    category: "product",
    question: "Does Zyoris support inventory and warehouse tracking?",
    answer:
      "Yes. For trading, manufacturing, and distribution businesses, Zyoris tracks SKU inventory across multiple godowns/locations, generates purchase orders, computes FIFO/weighted average valuation, and triggers low-stock reorder warnings.",
  },
  {
    id: "pr-11",
    category: "product",
    question: "Are custom fields, custom stages, and automated workflows supported?",
    answer:
      "Absolutely. You can create custom fields, custom data entities, and automated trigger-action workflows (e.g. 'When invoice is 7 days overdue, send WhatsApp reminder and notify account manager').",
  },
  {
    id: "pr-12",
    category: "product",
    question: "Can we generate custom board reports and executive KPI dashboards?",
    answer:
      "Yes. Zyoris comes with out-of-the-box drag-and-drop analytics for Sales ARR/MRR, DSO (Days Sales Outstanding), Cash Flow Runway, Gross Margins, and Team Output, exportable to PDF, Excel, and automated scheduled Slack/email reports.",
  },

  // 3. Pricing & Plans
  {
    id: "pc-1",
    category: "pricing",
    question: "How much does Zyoris cost?",
    answer:
      "Zyoris transparent pricing starts at ₹4,500/user/month (billed annually) for the unified Business OS covering CRM, HRMS, and Finance. Unlike competitors who charge add-ons for every single module or plugin, Zyoris includes all core capabilities in one plan.",
  },
  {
    id: "pc-2",
    category: "pricing",
    question: "What is the Early Access Founder Pricing lock-in?",
    answer:
      "Early adopter companies who sign up during our initial rollout receive permanent price lock protection. Even as we add enterprise modules and raise prices for future customers, your onboarding price will remain frozen for the lifetime of your continuous active subscription.",
  },
  {
    id: "pc-3",
    category: "pricing",
    question: "Are there any hidden setup fees, integration fees, or maintenance charges?",
    answer:
      "None. What you see is what you pay. Standard onboarding, regular software updates, bug fixes, cloud hosting, and data backups are included in your subscription without unexpected consulting charges.",
  },
  {
    id: "pc-4",
    category: "pricing",
    question: "Can we pay in Indian Rupees (INR) and get a proper GST tax invoice?",
    answer:
      "Yes! All billings are in INR with 18% GST. You will receive a valid GST tax invoice every billing cycle, enabling your company to claim 100% Input Tax Credit (ITC). We accept Net Banking, UPI, Corporate Credit Cards, and NEFT/RTGS.",
  },
  {
    id: "pc-5",
    category: "pricing",
    question: "Is there a free trial or interactive product walkthrough available?",
    answer:
      "Yes, we provide qualified businesses with a guided personalized product walkthrough and a 14-day assisted sandbox trial populated with industry-specific mock data to test your end-to-end workflows.",
  },
  {
    id: "pc-6",
    category: "pricing",
    question: "Can we upgrade or downgrade user licenses as our team changes?",
    answer:
      "Yes. You can add or deactivate user seats anytime directly from your Admin billing dashboard. Pro-rated adjustments are automatically credited or billed on your next cycle.",
  },
  {
    id: "pc-7",
    category: "pricing",
    question: "What is the minimum contract commitment?",
    answer:
      "We offer both quarterly and annual plans. Annual commitments enjoy significant discounts (up to 25% off) plus complimentary dedicated onboarding assistance.",
  },
  {
    id: "pc-8",
    category: "pricing",
    question: "What happens if we choose to cancel our subscription?",
    answer:
      "You have zero lock-in beyond your selected period. If you decide to cancel, you retain full rights to export all your business data in standard CSV, JSON, and encrypted SQL formats with zero export fees.",
  },

  // 4. Security & Compliance
  {
    id: "sec-1",
    category: "security",
    question: "How does Zyoris ensure multi-tenant data isolation?",
    answer:
      "Zyoris uses strict logical and tenant-partitioned database architectures. Every customer request is cryptographically validated using scoped JWT tokens and Row-Level Security (RLS) policies. No tenant can ever access or leak into another tenant's data.",
  },
  {
    id: "sec-2",
    category: "security",
    question: "Is Zyoris compliant with India's DPDP Act 2023?",
    answer:
      "Yes, Zyoris is built from the ground up to comply with the Digital Personal Data Protection (DPDP) Act 2023. We maintain clear consent logs, purpose limitation controls, data principal rights handlers (access, correction, deletion), and designated grievance officers.",
  },
  {
    id: "sec-3",
    category: "security",
    question: "What encryption standards does Zyoris use for customer data?",
    answer:
      "All data in transit is encrypted using TLS 1.3 with forward secrecy. All data at rest (database storage, document uploads, and audit records) is protected with AES-256 bit encryption with managed KMS keys.",
  },
  {
    id: "sec-4",
    category: "security",
    question: "Does Zyoris train public AI models on our proprietary business data?",
    answer:
      "Never. Your proprietary contracts, customer identities, financial records, and employee information are strictly private. We do NOT use customer business data to train public Foundation Models or LLMs. Your operational intelligence remains entirely your own.",
  },
  {
    id: "sec-5",
    category: "security",
    question: "Does Zyoris support Role-Based Access Control (RBAC) and Audit Logs?",
    answer:
      "Yes. Administrators can configure granular permission sets down to specific field-level visibility (e.g. sales reps cannot see customer financial margins; HR executives cannot see founder compensation). Complete tamper-evident audit logs record who viewed, edited, or exported every record.",
  },
  {
    id: "sec-6",
    category: "security",
    question: "How are disaster recovery and automated backups handled?",
    answer:
      "Automated encrypted snapshots are taken every 6 hours and stored in georedundant secondary Indian regions with point-in-time recovery (PITR) up to 30 days. We maintain an RPO under 15 minutes and RTO under 1 hour.",
  },
  {
    id: "sec-7",
    category: "security",
    question: "Does Zyoris support Single Sign-On (SSO) and Two-Factor Authentication (2FA)?",
    answer:
      "Yes. 2FA (via Google Authenticator/SMS OTP) is available for all tiers, and Enterprise tiers support SAML 2.0 / OAuth2 SSO with Google Workspace, Microsoft Azure Active Directory, and Okta.",
  },
  {
    id: "sec-8",
    category: "security",
    question: "What is your uptime Service Level Agreement (SLA)?",
    answer:
      "We provide a 99.9% uptime SLA for all production accounts, backed by high-availability cluster failover and real-time public status monitoring.",
  },

  // 5. Implementation, Migration & Support
  {
    id: "sp-1",
    category: "support",
    question: "How long does it take to deploy and migrate to Zyoris?",
    answer:
      "Most Indian SMBs and mid-market teams go live within 5 to 14 business days. Our dedicated onboarding specialists assist you in mapping your chart of accounts, importing customer histories, and configuring your payroll cycles.",
  },
  {
    id: "sp-2",
    category: "support",
    question: "Can we migrate data from Zoho, Tally, Salesforce, or Excel spreadsheets?",
    answer:
      "Yes. We offer pre-built migration utilities for Tally Prime/ERP 9, Zoho Books/CRM, Busy, Excel/CSV sheets, and Salesforce. Our migration team verifies data balance parity so no financial journal or customer history is lost.",
  },
  {
    id: "sp-3",
    category: "support",
    question: "What kind of customer support is provided?",
    answer:
      "All customers receive priority WhatsApp business support, dedicated email assistance (info@zyoris.com), and phone escalations (+91 96505 53728) during Indian business hours (9:30 AM to 6:30 PM IST), with 24/7 emergency incident response.",
  },
  {
    id: "sp-4",
    category: "support",
    question: "Do you offer hands-on team training and onboarding workshops?",
    answer:
      "Yes. We conduct live interactive Zoom/Google Meet training sessions for your sales reps, HR managers, and finance team, supplemented by recorded video guides and step-by-step documentation in English and Hindi.",
  },
  {
    id: "sp-5",
    category: "support",
    question: "Does Zyoris provide open REST APIs and webhooks for custom integrations?",
    answer:
      "Yes. Every entity in Zyoris is accessible via documented RESTful APIs and real-time outgoing Webhooks, allowing your in-house developers to connect proprietary ERPs, custom e-commerce stores, or mobile apps seamlessly.",
  },
  {
    id: "sp-6",
    category: "support",
    question: "Is there a dedicated Account Manager assigned to our account?",
    answer:
      "Yes. Accounts with 15+ seats or on annual business packages are assigned a dedicated Customer Success Manager (CSM) who conducts quarterly operational reviews and priority feature request routing.",
  },
  {
    id: "sp-7",
    category: "support",
    question: "How frequently does Zyoris release software updates and new features?",
    answer:
      "We ship continuous non-disruptive cloud updates every two weeks. New feature rollouts and tax rule changes (e.g. Budget amendments, revised TDS slabs) are applied automatically with zero downtime.",
  },
  {
    id: "sp-8",
    category: "support",
    question: "How do I book a live one-on-one demo with the Zyoris team?",
    answer:
      "You can click the 'Get Early Access' or 'Contact Us' button on our website, email us at info@zyoris.com, or directly call/WhatsApp our leadership team at +91 96505 53728 to schedule a customized 30-minute walkthrough.",
  },
  {
    id: "sp-9",
    category: "support",
    question: "Can Zyoris work offline if our internet connection drops?",
    answer:
      "Zyoris web and mobile applications cache critical read data locally so your field sales reps and staff can access contact details and draft notes offline, which auto-sync the moment connectivity is restored.",
  },
  {
    id: "sp-10",
    category: "support",
    question: "Does Zyoris support multiple currencies and international GST/VAT?",
    answer:
      "Yes. While engineered primarily for Indian domestic businesses, Zyoris supports multi-currency billing (USD, EUR, GBP, AED, SGD), LUT export invoices with zero GST for IT exports, and international tax reporting.",
  },
  {
    id: "sp-11",
    category: "support",
    question: "Can multiple company branches or GSTINs be managed under one subscription?",
    answer:
      "Yes. Multi-entity and multi-GSTIN architectures allow holding companies and multi-branch businesses to consolidate financials while maintaining separate books and tax filings per state branch.",
  },
  {
    id: "sp-12",
    category: "support",
    question: "How can I share product feedback or request a new feature in Zyoris?",
    answer:
      "Our early customers have a direct line to our founding and engineering team via private Slack/WhatsApp channels and an in-app feature request portal with public roadmap visibility.",
  },
];

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [openMap, setOpenMap] = useState<{ [id: string]: boolean }>({ "ov-1": true });
  const [search, setSearch] = useState<string>("");

  const filteredFaqs = useMemo(() => {
    return FAQ_LIST.filter((item) => {
      const matchCat = activeTab === "all" || item.category === activeTab;
      const q = search.toLowerCase().trim();
      if (!q) return matchCat;
      const matchText =
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);
      return matchCat && matchText;
    });
  }, [activeTab, search]);

  const toggle = (id: string) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-wrapper">
        <section className="section_home1_faq pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="padding-global">
            <div className="container-default">
              
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="text-style-badge is-badge mb-4 inline-block">
                  <div>Frequently Asked Questions</div>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A1E3F]">
                  All You Need to Know About <span className="text-[#2979FF]">Zyoris</span>
                </h1>
                <p className="mt-4 text-base md:text-lg text-[#0A1E3F]/70">
                  Real, transparent answers covering our Intelligent Business OS, pricing, Indian compliance, and product capabilities.
                </p>

                {/* Search Bar */}
                <div className="mt-8 max-w-xl mx-auto">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search 50+ questions (e.g. Zoho, Pricing, GST, DPDP, Founder)..."
                    className="w-full px-5 py-3.5 rounded-full border border-[#C2D4EE] bg-white text-[#0A1E3F] text-sm focus:outline-none focus:border-[#2979FF] shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                {FAQ_CATEGORIES.map((cat) => {
                  const isActive = activeTab === cat.id;
                  const count =
                    cat.id === "all"
                      ? FAQ_LIST.length
                      : FAQ_LIST.filter((i) => i.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveTab(cat.id)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[#0D47A1] text-white shadow-sm"
                          : "bg-white text-[#0A1E3F]/80 border border-[#C2D4EE]/70 hover:border-[#2979FF]"
                      }`}
                    >
                      {cat.label} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Main FAQ Layout using standard website classes */}
              <div className="faq_grid">
                
                {/* Left Side Promo / Contact Card */}
                <div className="faq_left">
                  <div>
                    <div className="text-style-badge is-badge">
                      <div>Need Help?</div>
                    </div>
                    <div className="spacer-xsmall"></div>
                    <h2>Have specific business questions?</h2>
                    <div className="spacer-tiny"></div>
                    <div>
                      Connect directly with our team for custom onboarding, data migration, and architecture inquiries.
                    </div>
                  </div>

                  <div className="home1_faq_banner mt-6">
                    <div className="home1_faq_copy !p-6">
                      <div className="text-size-medium font-semibold text-[#0A1E3F]">
                        Contact Zyoris
                      </div>
                      <div className="text-size-small text-style-muted mt-1">
                        India&apos;s Intelligent Business OS
                      </div>
                      <div className="flex items-center gap-2.5 text-size-small text-[#0A1E3F] mt-4 font-medium">
                        <Mail className="w-4 h-4 text-[#2979FF] flex-shrink-0" />
                        <a href="mailto:info@zyoris.com" className="hover:text-[#2979FF] transition-colors">
                          info@zyoris.com
                        </a>
                      </div>
                      <div className="flex items-center gap-2.5 text-size-small text-[#0A1E3F] mt-2 font-medium">
                        <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <a
                          href="https://wa.me/919650553728?text=Hi%20Zyoris%20Team%2C%20I%20have%20a%20question%20regarding%20Zyoris%20OS."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-emerald-600 transition-colors flex items-center gap-1.5"
                        >
                          <span>+91 96505 53728 (WhatsApp)</span>
                        </a>
                      </div>
                      <div className="spacer-small"></div>
                      <Button href="/contact" variant="secondary">
                        Contact Us
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right Side Accordion using website's native faq_box & faq_accordion classes */}
                <div className="w-tabs">
                  <div className="w-tab-content">
                    <div className="w-tab-pane w--tab-active">
                      <div className="faq_box">
                        {filteredFaqs.length === 0 ? (
                          <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
                            <p className="text-sm text-[#0A1E3F]">No questions match your search.</p>
                            <button
                              onClick={() => {
                                setSearch("");
                                setActiveTab("all");
                              }}
                              className="mt-3 text-xs text-[#2979FF] underline"
                            >
                              Show all questions
                            </button>
                          </div>
                        ) : (
                          filteredFaqs.map((faq, index) => {
                            const isOpen = !!openMap[faq.id];
                            return (
                              <div
                                key={faq.id}
                                className="faq_accordion"
                                aria-expanded={isOpen}
                                onClick={() => toggle(faq.id)}
                                style={{ cursor: "pointer" }}
                              >
                                <div className="faq_question">
                                  <div className="faq_question_header">
                                    <div className="text-size-small text-weight-normal flex items-start gap-2">
                                      <span className="text-[#2979FF] font-semibold text-xs select-none min-w-[20px]">
                                        {index + 1}.
                                      </span>
                                      <span>{faq.question}</span>
                                    </div>
                                  </div>
                                  <div className="faq_action">
                                    <div className="faq_action-line"></div>
                                    <div
                                      className="faq_action-line is-last"
                                      style={{
                                        transform: isOpen
                                          ? "rotate(0deg)"
                                          : "rotate(-90deg)",
                                        transition: "transform 0.3s ease",
                                      }}
                                    ></div>
                                  </div>
                                </div>

                                <div
                                  className="faq_answer"
                                  style={{
                                    display: isOpen ? "block" : "none",
                                    height: isOpen ? "auto" : 0,
                                    overflow: "hidden",
                                    transition: "all 0.3s ease",
                                  }}
                                >
                                  <div className="faq_answer-content">
                                    <div className="text-size-small text-style-muted pl-6">
                                      {faq.answer}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
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
