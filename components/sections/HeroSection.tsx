import React, { useEffect, useRef } from "react";
import { Button } from "../buttons/Button";

export const HeroSection: React.FC = () => {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const pinSection = pinSectionRef.current;
    const image = imageRef.current;
    if (!pinSection || !image) return;

    const clamp = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(max, value));

    const ease = (t: number) => t * t * (3 - 2 * t); // smoothstep

    const update = () => {
      const rect = pinSection.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
      const eased = ease(progress);

      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      const minScale = isMobile ? 0.75 : isTablet ? 0.70 : 0.68;
      const maxScale = isMobile ? 1.05 : isTablet ? 1.22 : 1.32;

      const scale = minScale + (maxScale - minScale) * eased;

      image.style.transform = `scale(${scale})`;
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const aiHeadings = [
    "AI PROCESSING",
    "LEADS ANALYZED: 2,847",
    "WIN PROBABILITY: 73%",
    "REVENUE FORECAST: ₹98.7K",
    "NEXT ACTION: CALL ACME CORP",
    "PIPELINE HEALTH: STRONG",
    "AI CONFIDENCE: 94%",
    "DEALS CLOSING SOON: 5",
    "HR TASKS PENDING: 3",
    "INVOICE DUE: ₹42K",
    "SMART ALERT: HIGH-VALUE LEAD DETECTED",
    "ZYORIS INTELLIGENCE ACTIVE",
  ];

  return (
    <section className="section_home1_hero">
      <div className="padding-global padding-section-medium">
        <div className="container-default">
          {/* Hero Content Header with staged load */}
          <div
            animate="load-hero-stagger"
            data-animate="load-hero-stagger"
            className="max-width-medium align-center text-align-center pt-8 pb-10"
          >
            {/* Badge */}
            <div animate="load-hero-1" data-animate="load-hero-1" className="text-style-badge is-badge">
              <div>Now accepting early access</div>
            </div>

            <div className="spacer-tiny"></div>
            <div className="spacer-xxsmall"></div>

            {/* Main Title with SplitText */}
            <h1
              animate="load-hero-title"
              data-animate="load-hero-title"
              style={{
                fontFamily: "var(--fonts--heading, 'Didact Gothic', sans-serif)",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "56px",
                lineHeight: "100%",
                letterSpacing: "5%",
                textAlign: "center",
                color: "#0A1E3F",
              }}
            >
              India&apos;s Intelligent
              <br /> Business OS
            </h1>

            <div className="spacer-xxsmall"></div>
            <div className="spacer-tiny"></div>

            {/* Subtitle */}
            <div
              animate="load-hero-2"
              data-animate="load-hero-2"
              className="text-size-medium max-w-xl mx-auto"
            >
              One platform for Sales, HR, Finance and Operations. With AI that tells you what to do next, not just what already happened.
            </div>

            <div className="spacer-small"></div>

            {/* Button Group */}
            <div animate="load-hero-3" data-animate="load-hero-3" className="button-group align-center mt-2">
              <Button
                href="/#early-access"
                variant="primary"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    const el = document.getElementById("early-access");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                  }
                }}
              >
                Request Early Access →
              </Button>
              <Button href="/#features" variant="secondary">
                See what&apos;s inside
              </Button>
            </div>
          </div>

          {/* ===== SCROLL ZOOM IMAGE BLOCK ===== */}
            <section
              ref={pinSectionRef}
              style={{
                position: "relative",
                height: "250vh",
                width: "100vw",
                maxWidth: "100vw",
                left: "50%",
                right: "50%",
                marginLeft: "-50vw",
                marginRight: "-50vw",
              }}
            >
              <div
                style={{
                  position: "sticky",
                  top: "6vh",
                  height: "88vh",
                  width: "100%",
                  maxWidth: "min(96vw, 1650px)",
                  margin: "0 auto",
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "visible",
                  boxSizing: "border-box",
                }}
              >
                <img
                  ref={imageRef}
                  src="/Dashboard.png"
                  alt="Zyoris Intelligent Business OS Dashboard"
                  style={{
                    width: "auto",
                    height: "auto",
                    maxWidth: "min(90vw, 1300px)",
                    maxHeight: "82vh",
                    objectFit: "contain",
                    transform: "scale(0.68)",
                    transformOrigin: "center center",
                    willChange: "transform",
                  }}
                />
              </div>
            </section>
            {/* ===== END SCROLL ZOOM IMAGE BLOCK ===== */}

            {/* Trust Tagline */}
            <div className="w-full text-center mt-8 text-[11px] sm:text-xs font-semibold tracking-wider text-[#4A85F6] uppercase">
              Trusted by founders across India &nbsp;·&nbsp; AI-first from day one &nbsp;·&nbsp; 10× faster than spreadsheets
            </div>

            {/* 5 Feature Pill Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4">
              {["Sales & CRM", "HR & People", "Finance", "AI Insights", "Call Centre"].map((item) => (
                <a
                  key={item}
                  className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#2E4A71] bg-[#EBF2FC] border border-[#CBDDF7] hover:bg-[#DEEAFC] hover:border-[#B2CEF7] transition-colors shadow-none"
                >
                  {item}
                </a>
              ))}
            </div>
          {/* Key Zyoris Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto my-8 p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-center">
            <div className="p-3">
              <div className="text-3xl font-semibold text-[#0A1E3F] ">63M+</div>
              <div className="text-xs text-[#0A1E3F]/70 mt-1">SMBs in India</div>
            </div>
            <div className="p-3 border-t md:border-t-0 md:border-l border-blue-100">
              <div className="text-3xl font-semibold text-[#0A1E3F]">80%</div>
              <div className="text-xs text-[#0A1E3F]/70 mt-1">Under-served</div>
            </div>
            <div className="p-3 border-t md:border-t-0 md:border-l border-blue-100">
              <div className="text-3xl font-semibold text-[black]">1/3rd</div>
              <div className="text-xs text-[#0A1E3F]/70 mt-1">Cost of Salesforce</div>
            </div>
          </div>

          {/* Logo Marquee Section */}
          <div
            animate="fade-up-1"
            data-animate="fade-up-1"
            className="home1_hero_logos"
          >
            <div className="logos_marquee">
              <div className="marquee-overlay"></div>
              {/* Group 1 */}
              <div className="logos_marquee-group">
                {aiHeadings.map((heading, i) => (
                  <div key={`ai-g1-${i}`} className="logos_marquee-item">
                    <span className="text-xs font-semibold tracking-wider text-[#0A1E3F] uppercase whitespace-nowrap">
                      {heading}
                    </span>
                  </div>
                ))}
              </div>
              {/* Group 2 (seamless repeat) */}
              <div className="logos_marquee-group">
                {aiHeadings.map((heading, i) => (
                  <div key={`ai-g2-${i}`} className="logos_marquee-item">
                    <span className="text-xs font-semibold tracking-wider text-[#0A1E3F] uppercase whitespace-nowrap">
                      {heading}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};