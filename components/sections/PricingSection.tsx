import React from "react";
import { Button } from "../buttons/Button";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  popular?: boolean;
  image: string;
  features: string[];
  buttonText: string;
  buttonHref: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "₹4,500",
    period: "/user/month",
    description: "For startups & small teams · Up to 10 users",
    image: "/plan1.png",
    features: [
      "Leads, Contacts & Deals",
      "Basic Dashboard",
      "AI Insights",
      "Role-Based Views",
      "Email Support",
    ],
    buttonText: "Get Started →",
    buttonHref: "/contact",
  },
  {
    id: "growth",
    name: "Growth",
    popular: true,
    price: "₹8,500",
    period: "/user/month",
    description: "For growing SMBs · 10–50 users",
    image: "/plan2.jpg",
    features: [
      "Everything in Starter",
      "Advanced AI & Reports",
      "HR Module",
      "Smart Notifications",
      "Revenue Forecasting",
      "Priority Support",
    ],
    buttonText: "Get Started →",
    buttonHref: "/contact",
  },
  {
    id: "business",
    name: "Business",
    price: "₹12,000",
    period: "/user/month",
    description: "For mid-size companies · 50–200 users",
    image: "/plan_business.jpg",
    features: [
      "Everything in Growth",
      "Finance Module",
      "Call Centre",
      "Priority Support",
      "Legacy Integration",
      "Audit Log & Compliance",
    ],
    buttonText: "Get Started →",
    buttonHref: "/contact",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "tailored for you",
    description: "For large organisations · Unlimited users",
    image: "/plan3.png",
    features: [
      "Full Platform Access",
      "Dedicated Account Manager",
      "Custom Setup & SLA",
      "On-Premise Option",
      "Direct Founder Access",
    ],
    buttonText: "Contact Us →",
    buttonHref: "/contact",
  },
];

export const PricingSection: React.FC = () => {
  return (
    <section
      id="pricing"  
      animate="scroll-section-color"
      data-animate="scroll-section-color"
      className="section_home1_features"
    >
      <div className="padding-global padding-section-medium">
        <div className="container-default">
          {/* Header */}
          <div className="header is-centered">
            <div className="max-width-large">
              <div
                animate="fade-up-1"
                data-animate="fade-up-1"
                className="text-style-badge is-badge"
              >
                <div>Pricing</div>
              </div>
              <div className="spacer-xsmall"></div>
              <h2 animate="title" data-animate="title">
                Simple, Unified Pricing for Smarter Workflows
              </h2>
              <div className="spacer-tiny"></div>
              <div className="spacer-xxsmall"></div>
              <div className="max-width-medium align-center">
                <div
                  animate="fade-up-2"
                  data-animate="fade-up-2"
                  className="text-size-medium text-style-muted"
                >
                  Choose the plan that fits your team’s needs
                </div>
              </div>
              <div className="spacer-medium"></div>
            </div>
          </div>

          {/* Pricing List with card stagger */}
          <div className="w-dyn-list">
            <div
              animate="card-stagger"
              data-animate="card-stagger"
              role="list"
              className="pricing_list w-dyn-items"
            >
              {pricingPlans.map((plan) => (
                <div key={plan.id} role="listitem" className="w-dyn-item">
                  <div className={`pricing_card group transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:border-[#2979FF]/40 ${plan.popular ? "is-highlighted-plan" : ""}`}>
                    <div className="pricing_card-content">
                      <div className="pricing_card-header">
                        <img
                          src={plan.image}
                          loading="lazy"
                          alt={plan.name}
                          className="icon-1x1-xxlarge pricing_card-icon"
                        />
                        <div className="pricing_card-header-text">
                          {plan.popular && (
                            <div className="text-style-badge is-badge pricing_badge_popular">
                              <div>MOST POPULAR</div>
                            </div>
                          )}
                          <h3 className="heading-style-h4">{plan.name}</h3>
                          <div className="text-size-small">
                            {plan.description}
                          </div>
                        </div>
                      </div>
                      <div className="pricing-price">
                        <div className="heading-style-h1 pricing-val">{plan.price}</div>
                        <div className="text-size-small pricing-period">{plan.period}</div>
                      </div>
                      <div className="w-richtext">
                        <ul role="list">
                          {plan.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <Button
                      href={plan.buttonHref}
                      variant={plan.popular ? "primary" : "secondary"}
                    >
                      {plan.buttonText}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="pricing_footnote">
            * All prices exclusive of GST · HR and Finance modules coming soon as part of phased expansion
          </p>
          <div className="spacer-medium"></div>
          {/* Explore All Plans Button */}
          <div className="flex-center">
          </div>
        </div>
      </div>
    </section>
  );
};
