import React, { useRef, useState } from "react";
import { Button } from "../buttons/Button";
import { EmailOtpVerifier } from "../auth/EmailOtpVerifier";
import { CheckCircle2, Loader2 } from "lucide-react";

export const BannerCTASection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [teamSize, setTeamSize] = useState("1-10");
  const [lookingFor, setLookingFor] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

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
          teamSize,
          lookingFor,
          source: "Homepage Banner CTA Form",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Submission error. Please try again or WhatsApp us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section_home1_banner">
      
      <div className="background-video w-background-video w-background-video-atom">
        <video
          ref={videoRef}
          id="806e7a24-3b92-d55f-e300-76702ced1834-video"
          src="/videos/loop-footer-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ objectFit: "cover" }}
        />
        
        <div aria-live="polite">
          <button
            type="button"
            className="w-backgroundvideo-backgroundvideoplaypausebutton play-ontop w-background-video--control"
            onClick={toggleVideo}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            <span
              className="play-state is-black"
              style={{ display: isPlaying ? "none" : "inline-block" }}
            >
              <img
                loading="lazy"
                src="https://cdn.prod.website-files.com/69b13cad49372c03e40843d9/69dfb94916c1a334d7680a8c_d96e26192b0ec5c437214e072eaa1c49_Play-black.svg"
                alt="Play video"
                className="play-image"
              />
            </span>
            <span
              className="pause-state is-black"
              style={{ display: isPlaying ? "inline-block" : "none" }}
            >
              <img
                loading="lazy"
                src="https://cdn.prod.website-files.com/69b13cad49372c03e40843d9/69dfbbe6a96af17e5c0e63d5_Pause-black.svg"
                alt="Pause video"
                className="pause-image"
              />
            </span>
          </button>
        </div>
      </div>

      <div className="section_home1_layer"></div>

      <div className="padding-global">
        <div className="container-default">
          <div className="home1_banner_wrap">
            <div className="home1_banner_content">
              <div
                animate="fade-up-1"
                data-animate="fade-up-1"
                className="text-style-badge is-badge"
              >
                <div>Get in Touch</div>
              </div>
              <div className="spacer-xsmall"></div>
              <h2 animate="title" data-animate="title" className="!text-white">
                Start Your Zyoris Journey
              </h2>
              <div className="spacer-xsmall"></div>
              <div className="max-width-small">
                <div
                  animate="fade-up-2"
                  data-animate="fade-up-2"
                  className="text-size-medium !text-white"
                >
                 Tell us about your business and we'll get back to you personally. No spam, no automated responses, just a real conversation about how Zyoris can work for you.</div>
              </div>
            </div>

            <div
              id="contact"
              animate="fade-up-3"
              data-animate="fade-up-3"
              className="w-full max-w-xl mx-auto my-6 p-6 rounded-2xl bg-[rgba(7,16,31,0.58)] border border-white/30 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
            >
              {submitted ? (
                <div className="py-8 text-center space-y-3 animate-in fade-in duration-300">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Thank You!</h3>
                  <p className="text-sm text-white/80 max-w-md mx-auto">
                    We have received your details. A confirmation email has been sent to <strong>{email}</strong>, and our team will connect with you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setIsEmailVerified(false);
                      setName("");
                      setCompany("");
                      setEmail("");
                      setPhone("");
                      setLookingFor("");
                    }}
                    className="mt-4 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-semibold transition-colors"
                  >
                    Submit another response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white mb-1 font-semibold">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-3 py-2 rounded-lg bg-white/15 border border-white/25 text-white placeholder-white/55 focus:outline-none focus:border-blue-400 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white mb-1 font-semibold">Company Name *</label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Zyoris"
                        className="w-full px-3 py-2 rounded-lg bg-white/15 border border-white/25 text-white placeholder-white/55 focus:outline-none focus:border-blue-400 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white mb-1 font-semibold">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setIsEmailVerified(false);
                        }}
                        placeholder="info@zyoris.com"
                        className="w-full px-3 py-2 rounded-lg bg-white/15 border border-white/25 text-white placeholder-white/55 focus:outline-none focus:border-blue-400 text-sm"
                      />
                      <EmailOtpVerifier
                        email={email}
                        name={name}
                        isVerified={isEmailVerified}
                        onVerified={(v) => setIsEmailVerified(v)}
                        theme="dark"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white mb-1 font-semibold">Phone Number *</label>
                      <div className="flex rounded-lg overflow-hidden border border-white/25 focus-within:border-blue-400 bg-white/15">
                        <span className="inline-flex items-center px-3 text-xs font-bold text-white/90 bg-white/10 border-r border-white/20 select-none">
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
                          className="w-full px-3 py-2 bg-transparent text-white placeholder-white/55 focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white mb-1 font-semibold">Team Size</label>
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/25 text-white focus:outline-none focus:border-blue-400 text-sm"
                    >
                      <option value="1-10">1–10 people</option>
                      <option value="11-50">11–50 people</option>
                      <option value="51-200">51–200 people</option>
                      <option value="200+">200+ people</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white mb-1 font-semibold">What are you looking for?</label>
                    <input
                      type="text"
                      value={lookingFor}
                      onChange={(e) => setLookingFor(e.target.value)}
                      placeholder="e.g. CRM + HR integration, AI recommendations..."
                      className="w-full px-3 py-2 rounded-lg bg-white/15 border border-white/25 text-white placeholder-white/55 focus:outline-none focus:border-blue-400 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!isEmailVerified || submitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#1E70FF] hover:bg-[#0D47A1] disabled:bg-white/20 disabled:text-white/40 disabled:cursor-not-allowed text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <span>
                        {isEmailVerified
                          ? "Send my details →"
                          : "Verify Email via OTP to Continue"}
                      </span>
                    )}
                  </button>

                  <div className="text-center text-xs text-white/80 pt-2">
                    🔒 Your information is private and will never be shared with third parties.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
