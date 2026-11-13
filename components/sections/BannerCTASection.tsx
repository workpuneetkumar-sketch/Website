import React, { useRef, useState } from "react";
import { Button } from "../buttons/Button";

export const BannerCTASection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Details received: our team will reach out within 24 hours.");
                }}
                className="space-y-4 text-left"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white mb-1 font-semibold">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full px-3 py-2 rounded-lg bg-white/15 border border-white/25 text-white placeholder-white/55 focus:outline-none focus:border-blue-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white mb-1 font-semibold">Company Name *</label>
                    <input
                      type="text"
                      required
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
                      placeholder="info@zyoris.com"
                      className="w-full px-3 py-2 rounded-lg bg-white/15 border border-white/25 text-white placeholder-white/55 focus:outline-none focus:border-blue-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white mb-1 font-semibold">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 96505 53728"
                      className="w-full px-3 py-2 rounded-lg bg-white/15 border border-white/25 text-white placeholder-white/55 focus:outline-none focus:border-blue-400 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white mb-1 font-semibold">Team Size</label>
                  <select className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/25 text-white focus:outline-none focus:border-blue-400 text-sm">
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
                    placeholder="e.g. CRM + HR integration, AI recommendations..."
                    className="w-full px-3 py-2 rounded-lg bg-white/15 border border-white/25 text-white placeholder-white/55 focus:outline-none focus:border-blue-400 text-sm"
                  />
                </div>

                <Button variant="primary" className="w-full py-3 text-center font-medium">
                  Send my details →
                </Button>

                <div className="text-center text-xs text-white/80 pt-2">
                  🔒 Your information is private and will never be shared with third parties.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
