import React, { useRef, useState } from "react";
import { Button } from "../buttons/Button";

export const ShowcaseSection: React.FC = () => {
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
    <section className="section_home1_feature">
      <div className="padding-global padding-section-medium">
        <div className="container-default">
          <div id="features-1" className="feature_card !min-h-0 !flex-col !w-full !gap-6">
            {/* Feature Content Left */}
            <div className="feature_content !flex-none !w-full !gap-6">
              <div className="feature_content-top">
                <div
                  animate="fade-up-1"
                  data-animate="fade-up-1"
                  className="text-style-badge is-badge"
                >
                  <div>Why This Price?</div>
                </div>
                <div className="spacer-xsmall"></div>
                <h2 animate="title" data-animate="title">
                  You Get 10x More. You Pay 3x Less.
                </h2>
                <div className="spacer-xxsmall"></div>
                <div
                  animate="fade-up-2"
                  data-animate="fade-up-2"
                  className="text-size-medium text-style-muted"
                >
                  Here&apos;s the honest breakdown of what you&apos;re actually getting — and why the price is more than fair. 
                </div>
                <div className="spacer-small"></div>
              </div>

              {/* 4 Value Tiles from Image 1 */}
              <div
                animate="card-stagger"
                data-animate="card-stagger"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full my-2 text-left"
              >
                <div className="deploya-card p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#2979FF] border border-[#D5E3F7]/80 rounded-2xl bg-white group">
                  <div>
                    <h3 className="text-lg font-bold text-[#0A1E3F] mb-2 tracking-tight">
                      Replace 5–8 Separate Tools
                    </h3>
                    <p className="text-sm text-[#52667D] leading-relaxed font-normal">
                      Instead of paying separately for CRM, HR, Finance, Analytics, and Call Centre software, get everything in one place with Zyoris — starting at just ₹4,500 per user/month.</p>
                  </div>
                </div>
                <div className="deploya-card p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#2979FF] border border-[#D5E3F7]/80 rounded-2xl bg-white group">
                  <div>
                    <h3 className="text-lg font-bold text-[#0A1E3F] mb-2 tracking-tight">
                      Real AI — Included. No Extra Cost.
                    </h3>
                    <p className="text-sm text-[#52667D] leading-relaxed font-normal">
                     Salesforce charges ₹3,000–5,000 extra for Einstein AI. Zoho's AI is basic. Zyoris bundles real predictive AI — revenue forecasting, lead scoring, smart recommendations — at no extra cost.</p>
                  </div>
                </div>
                <div className="deploya-card p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#2979FF] border border-[#D5E3F7]/80 rounded-2xl bg-white group">
                  <div>
                    <h3 className="text-lg font-bold text-[#0A1E3F] mb-2 tracking-tight">
                      40% Time Saved = Real Money
                    </h3>
                    <p className="text-sm text-[#52667D] leading-relaxed font-normal">
                      Your team wastes 40% of their time hunting for data across tools. At even ₹30K/month salary, that’s ₹12K/month per employee in lost productivity. Zyoris pays for itself in week one.</p>
                  </div>
                </div>
                <div className="deploya-card p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#2979FF] border border-[#D5E3F7]/80 rounded-2xl bg-white group">
                  <div>
                    <h3 className="text-lg font-bold text-[#0A1E3F] mb-2 tracking-tight">
                      Built for India, Not Adapted
                    </h3>
                    <p className="text-sm text-[#52667D] leading-relaxed font-normal">
                      Western tools charge full US/EU pricing — different markets, different laws. Zyoris is priced for Indian SMBs with Indian workflows, GST-compliant systems, and a team that understands your market.</p>
                  </div>
                </div>

              </div>

              {/* Feature Labels / Metric stats */}
              <div
                animate="fade-up-2"
                data-animate="fade-up-2"
                className="feature_labels mt-2"
              >
                <div className="feature_label">
                  <div className="text-xl font-bold text-blue-400">₹12K+</div>
                  <div className="text-size-small text-weight-light">
                    Monthly cost if tools bought separately
                  </div>
                </div>
                <div className="feature_label">
                  <div className="text-xl font-bold text-blue-400">3×</div>
                  <div className="text-size-small text-weight-light">
                    Cheaper than Salesforce
                  </div>
                </div>
                <div className="feature_label">
                  <div className="text-xl font-bold text-blue-400">40%</div>
                  <div className="text-size-small text-weight-light">
                    Team time saved on data work
                  </div>
                </div>
                <div className="feature_label">
                  <div className="text-xl font-bold text-blue-400">Week 1</div>
                  <div className="text-size-small text-weight-light">
                    Positive ROI for teams
                  </div>
                </div>
                
                
              </div>
            </div>            
          </div>
        </div>
      </div>

      
    </section>
  );
};
