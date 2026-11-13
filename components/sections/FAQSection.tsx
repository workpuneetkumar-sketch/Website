import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../buttons/Button";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What does Zyoris do?",
    answer:
      "Zyoris is India's Intelligent Business Operating System (Business OS). It unifies core business operations (Sales & CRM, HR & Payroll, Accounting & Invoicing, and AI Analytics) into a single synchronized workspace designed specifically for Indian fast-growing companies and mid-market enterprises.",
  },
  {
    question: "How is Zyoris different from Zoho, Salesforce, or HubSpot?",
    answer:
      "Zoho has 45+ fragmented apps where data sync often fails, Salesforce charges expensive Western enterprise pricing for unused bloatware, and HubSpot prices scale aggressively. Zyoris provides one clean, unified platform with native Indian GST, rupee payroll, and WhatsApp automation.",
  },
  {
    question: "What core modules are included in Zyoris?",
    answer:
      "Zyoris includes 5 foundational modules: Sales & CRM Pipeline, HRMS with Automated Rupee Payroll (PF, ESI, TDS), Finance & GST e-Invoicing, Contextual AI Executive Co-Pilot, and Omnichannel Customer Support with WhatsApp & Cloud Telephony.",
  },
  {
    question: "How much does Zyoris cost and is there a price lock?",
    answer:
      "Pricing starts at ₹4,500/user/month with all modules included. Early adopter companies who onboard during our initial rollout receive a permanent price lock protection: your onboarding rate will remain frozen for life.",
  },
  {
    question: "Is our business data secure and DPDP compliant?",
    answer:
      "Yes. Every company's data is strictly isolated through multi-tenant architecture and Row-Level Security (RLS). Hosted in secure Indian datacenters (AWS Mumbai / Azure Central India), 100% compliant with the Digital Personal Data Protection (DPDP) Act 2023. We never train public AI on your proprietary data.",
  },
  {
    question: "Can we migrate our existing data from Tally, Zoho, or Excel?",
    answer:
      "Yes. We provide pre-built migration utilities and dedicated onboarding specialists to assist in migrating charts of accounts, vendor books, employee records, and customer histories with zero data loss.",
  },
];

export const FAQSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"product" | "support" | "payments">("product");
  const [openIndexes, setOpenIndexes] = useState<{ [key: string]: boolean }>({});
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const toggleFAQ = (tab: string, idx: number) => {
    const key = `${tab}-${idx}`;
    setOpenIndexes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <section id="faq" className="section_home1_faq">
        <div className="padding-global padding-section-medium">
          <div className="container-default">
            <div className="faq_grid">
              {/* FAQ Left Info */}
              <div className="faq_left">
                <div>
                  <div
                    animate="fade-up-1"
                    data-animate="fade-up-1"
                    className="text-style-badge is-badge"
                  >
                    <div>Still Not Sure?</div>
                  </div>
                  <div className="spacer-xsmall"></div>
                  <h2 animate="title" data-animate="title">
                    Common Questions, Honest Answers.
                  </h2>
                  <div className="spacer-xxsmall"></div>
                  <div className="spacer-tiny"></div>
                  <div animate="fade-up-2" data-animate="fade-up-2">
                    Everything you need to know about Zyoris, pricing, and how we compare.
                  </div>
                </div>

                {/* FAQ Promo Card with Video Button */}
                <div
                  animate="fade-up-2"
                  data-animate="fade-up-2"
                  className="home1_faq_banner !grid-cols-1"
                >
                  {/* Demo video temporarily hidden until final video is ready - keep code for later re-enable */}
                  <div className="home1_faq_left !hidden">
                    <div className="background-video w-background-video w-background-video-atom">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                          backgroundImage:
                            'url("https://cdn.prod.website-files.com/69b13cad49372c03e40843d9%2F69df74da9436254f3cbaac0c_video4_poster.0000000.jpg")',
                          objectFit: "cover",
                        }}
                      >
                        <source
                          src="https://cdn.prod.website-files.com/69b13cad49372c03e40843d9%2F69df74da9436254f3cbaac0c_video4_mp4.mp4"
                          type="video/mp4"
                        />
                        <source
                          src="https://cdn.prod.website-files.com/69b13cad49372c03e40843d9%2F69df74da9436254f3cbaac0c_video4_webm.webm"
                          type="video/webm"
                        />
                      </video>
                      <div aria-live="polite">
                        <button
                          type="button"
                          className="w-backgroundvideo-backgroundvideoplaypausebutton play-pause-button w-background-video--control"
                          onClick={() => setVideoModalOpen(true)}
                          aria-label="Play video"
                        >
                          <span className="play-state">
                            <img
                              loading="lazy"
                              src="https://cdn.prod.website-files.com/69b13cad49372c03e40843d9/69dfba5565772296451f867c_Play.svg"
                              alt="Play video"
                              className="play-image"
                            />
                          </span>
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setVideoModalOpen(true)}
                      className="home1_faq_lightbox w-inline-block"
                      style={{ background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
                    >
                      <div className="home3_benefits_paly">
                        <img
                          loading="lazy"
                          src="https://cdn.prod.website-files.com/69b13cad49372c03e40843d9/69df743bec412fcd24672a7c_880c6d3c94113cb6cdd24b54f2eb4108_play.svg"
                          alt=""
                          className="icon-1x1-small"
                        />
                        <div className="text-size-medium">Watch Demo</div>
                      </div>
                    </button>
                  </div>

                  <div className="home1_faq_copy">
                    <div className="avatars">
                      <img
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/69b13cad49372c03e40843d9/69de7b25f6acd92136074544_People6.avif"
                        alt=""
                        className="avatars_img is-first"
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/69b13cad49372c03e40843d9/69de7b26ac00db7a4605b96e_People3.avif"
                        alt=""
                        className="avatars_img"
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/69b13cad49372c03e40843d9/69de7b25a1540c120ae5b8f5_People8.avif"
                        alt=""
                        className="avatars_img"
                      />
                    </div>
                    <div className="spacer-xxsmall"></div>
                    <div className="spacer-tiny"></div>
                    <div className="text-size-medium">Have more questions?</div>
                    <div className="text-size-medium text-style-muted">
                      Contact our support team
                    </div>
                    <div className="spacer-small"></div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button href="/contact" variant="secondary">
                        Contact Us
                      </Button>
                      <Button href="/faq" variant="primary">
                        View All FAQs →
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Tabs & Accordions */}
              <div
                animate="fade-up-3"
                data-animate="fade-up-3"
                className="w-tabs"
              >
                {/* Tab Menu */}
                

                {/* Tab Panes */}
                <div className="w-tab-content">
                  <div className="w-tab-pane w--tab-active">
                    <div className="faq_box">
                      {faqs.map((faq, i) => {
                        const isOpen = !!openIndexes[`${activeTab}-${i}`];
                        return (
                          <div
                            key={`${activeTab}-${i}`}
                            faq_accordion=""
                            data-faq-accordion=""
                            className="faq_accordion"
                            aria-expanded={isOpen}
                            onClick={() => toggleFAQ(activeTab, i)}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="faq_question">
                              <div className="faq_question_header">
                                <div className="text-size-small text-weight-normal">
                                  {faq.question}
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
                              faq_answer=""
                              data-faq-answer=""
                              className="faq_answer"
                              style={{
                                display: isOpen ? "block" : "none",
                                height: isOpen ? "auto" : 0,
                                overflow: "hidden",
                                transition: "all 0.3s ease",
                              }}
                            >
                              <div className="faq_answer-content">
                                <div className="text-size-small text-style-muted">
                                  {faq.answer}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4 flex items-center justify-end">
                      <Link
                        href="/faq"
                        className="text-sm font-medium text-[#2979FF] hover:text-[#0D47A1] hover:underline flex items-center gap-1.5 transition-colors"
                      >
                        <span>View all 50+ FAQs &amp; Knowledge Base</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Lightbox Modal */}
      {videoModalOpen && (
        <div
          className="w-lightbox-backdrop"
          style={{ opacity: 1 }}
          onClick={() => setVideoModalOpen(false)}
        >
          <div className="w-lightbox-container">
            <div
              className="w-lightbox-content"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  position: "relative",
                  width: "90vw",
                  maxWidth: "940px",
                  aspectRatio: "16/9",
                }}
              >
                <iframe
                  src="https://www.youtube.com/embed/-yXdPqm7zC0?autoplay=1"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title="Demo Video"
                />
              </div>
              <button
                type="button"
                className="w-lightbox-control w-lightbox-close"
                onClick={() => setVideoModalOpen(false)}
                aria-label="Close video"
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
