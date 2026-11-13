import React, { useState } from "react";
import { Button } from "../buttons/Button";
import { EmailOtpVerifier } from "../auth/EmailOtpVerifier";
import { CheckCircle2, Loader2 } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailVerified) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/leads/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          source: "Early Access Section Form",
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Submission error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section id="why" className="section_home1_testimonials">
        <div className="padding-global padding-section-medium !pb-24 md:!pb-36">
          <div className="container-default">
            {/* Header */}
            <div className="header is-centered">
              <div className="max-width-large">
                <div className="text-style-badge is-badge">
                  <div>Why Zyoris</div>
                </div>
                <div className="spacer-xsmall"></div>
                <h2 animate="title" data-animate="title">
                  Built for India. Not adapted for it.
                </h2>
                <div className="spacer-tiny"></div>
                <div className="spacer-xxsmall"></div>
                <div
                  animate="fade-up-2"
                  data-animate="fade-up-2"
                  className="text-size-medium text-style-muted"
                >
                  India&apos;s SMBs deserve enterprise-grade intelligence without enterprise complexity or Western pricing.
                </div>
                <div className="spacer-medium"></div>
              </div>
            </div>

            {/* Testimonials List with card-stagger */}
            <div
              animate="card-stagger"
              data-animate="card-stagger"
              className="home1_testimonials_list"
            >
              {/* Card 1 */}
              <div className="home1_testimonials-card is-1">
                <div className="home1_testimonials-author">
                  <div>
                    <div className="text-size-medium font-bold text-white">Salesforce is too expensive</div>
                    <div className="text-size-small text-style-muted">
                      Cost Advantage
                    </div>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="home1_testimonials_content">
                  <div className="text-size-small">
                    At Rs 12,500 or more per user per month, Indian SMBs simply cannot afford it. Zyoris gives you more at a fraction of the cost, starting at ₹4,500 with zero surprise fees.
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="home1_testimonials-card is-2">
                <div className="home1_testimonials-author">
                  <div>
                    <div className="text-size-medium font-bold text-white">Zoho is too complex</div>
                    <div className="text-size-small text-style-muted">
                      Simplicity &amp; Adoption
                    </div>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="home1_testimonials_content">
                  <div className="text-size-small">
                    45 separate apps that nobody uses properly. Teams get confused, adoption fails, and you end up using 5% of what you paid for. Zyoris is one unified platform, clean and simple.
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div
                id="w-node-_320464c3-5288-24b1-e3dd-d55082f99f80-82f99f53"
                className="home1_testimonials-card is-3"
              >
                <div className="home1_testimonials-author">
                  <div>
                    <div className="text-size-medium font-bold text-white">Designed for Indian teams</div>
                    <div className="text-size-small text-style-muted">
                      Local Workflows
                    </div>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="home1_testimonials_content">
                  <div className="text-size-small">
                    Built around how Indian businesses actually work. Not translated from a US product that does not understand your GST, multi-tiered hierarchy, and field-sales realities.
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="home1_testimonials-card is-4">
                <div className="home1_testimonials-author">
                  <div>
                    <div className="text-size-medium font-bold text-white">Grows with you</div>
                    <div className="text-size-small text-style-muted">
                      Unified Expansion
                    </div>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="home1_testimonials_content">
                  <div className="text-size-small">
                    Start with CRM. Add HR. Add Finance. One platform that expands as your company does, with no migrations, zero data silos, and no duplicate data entry.
                  </div>
                </div>
              </div>
            </div>

            {/* Spacer */}
            <div className="spacer-large"></div>

            {/* Get Early Access Form */}
            <div
              id="early-access"
              animate="fade-up-3"
              data-animate="fade-up-3"
              className="w-full max-w-xl mx-auto my-8 p-6 md:p-8 rounded-2xl bg-white border border-[#D5E3F7]/80 shadow-xl shadow-blue-500/5 text-center scroll-mt-28 md:scroll-mt-32"
            >
              
              <h3 className="text-2xl md:text-3xl font-bold text-[#0A1E3F] tracking-tight mb-2">
                Get Early Access
              </h3>
              <p className="text-sm md:text-base text-[#52667D] leading-relaxed mb-6 max-w-md mx-auto font-normal">
                We&apos;re onboarding our first companies. Join the waitlist and be first to run your business on Zyoris.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-[#F0F5FF] border border-[#D4E2F5] text-center">
                  <h4 className="text-lg font-bold text-[#0A1E3F] mb-1">Thank you for joining!</h4>
                  <p className="text-sm text-[#52667D]">
                    We&apos;ve received your details. Our team will reach out with your early access invite shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#0A1E3F]/70 mb-1.5 font-semibold">
                        Your full name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name *"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#D5E3F7] text-[#0A1E3F] placeholder-[#52667D]/60 focus:outline-none focus:border-[#2979FF] focus:bg-white focus:ring-2 focus:ring-[#2979FF]/20 text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#0A1E3F]/70 mb-1.5 font-semibold">
                        Company name *
                      </label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Zyoris"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#D5E3F7] text-[#0A1E3F] placeholder-[#52667D]/60 focus:outline-none focus:border-[#2979FF] focus:bg-white focus:ring-2 focus:ring-[#2979FF]/20 text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#0A1E3F]/70 mb-1.5 font-semibold">
                        Work email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setIsEmailVerified(false);
                        }}
                        placeholder="info@zyoris.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#D5E3F7] text-[#0A1E3F] placeholder-[#52667D]/60 focus:outline-none focus:border-[#2979FF] focus:bg-white focus:ring-2 focus:ring-[#2979FF]/20 text-sm transition-all"
                      />
                      <EmailOtpVerifier
                        email={email}
                        name={name}
                        isVerified={isEmailVerified}
                        onVerified={(v) => setIsEmailVerified(v)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#0A1E3F]/70 mb-1.5 font-semibold">
                        Phone number *
                      </label>
                      <div className="flex rounded-lg overflow-hidden border border-[#D5E3F7] focus-within:border-[#2979FF] focus-within:ring-2 focus-within:ring-[#2979FF]/20 bg-[#F8FAFC]">
                        <span className="inline-flex items-center px-3 text-xs font-bold text-[#0A1E3F] bg-blue-50/80 border-r border-[#D5E3F7] select-none">
                          🇮🇳 +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={phone.replace(/^\+91\s*/, "")}
                          onChange={(e) => {
                            const raw = e.target.value.replace(/\D/g, "").slice(0, 10);
                            setPhone(`+91${raw}`);
                          }}
                          placeholder="96505 53728"
                          className="w-full px-3.5 py-2.5 bg-transparent text-[#0A1E3F] placeholder-[#52667D]/60 focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!isEmailVerified || submitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#1E70FF] hover:bg-[#0D47A1] disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-center font-bold text-sm md:text-base transition-all duration-200 cursor-pointer shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>
                          {isEmailVerified
                            ? "Request Early Access →"
                            : "Verify Email via OTP to Continue"}
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="divider"></div>
    </>
  );
};
