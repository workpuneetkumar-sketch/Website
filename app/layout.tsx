import type { Metadata } from "next";
import "./globals.css";
import "../styles/deploya.css"
import { Michroma } from "next/font/google";

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-zyoris",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zyoris.com"),
  alternates: {
    canonical: "/",
  },
  title: "Zyoris | India's AI-Powered Business OS — CRM, HR, Finance in One Platform",
  description: "Zyoris is India's first Intelligent Business Operating System. One platform for Sales & CRM, HR, Finance, and AI Insights. Starting at ₹4,500/user/month. Built for Indian SMBs.",
  keywords: [
    "best crm",
    "best crm in india",
    "simple crm",
    "best crm for small business",
    "best crm for indian smbs",
    "ai crm",
    "crm software",
    "sales crm",
    "zyoris",
    "zyoris technology",
    "what is zyoris",
    "puneet kumar zyoris",
    "who is puneet kumar",
    "business operating system",
    "all in one business software",
    "indian hrms payroll",
    "gst billing accounting crm",
    "zoho alternative",
    "salesforce alternative india",
    "lead management software"
  ],
  icons: {
    icon: "/logoMain.jpeg",
    apple: "/logoMain.jpeg",
  },
  openGraph: {
    title: "Zyoris | India's AI-Powered Business OS — Best CRM, HRMS & Finance",
    description: "Zyoris is India's Intelligent Business OS. Best CRM software for Indian SMBs & fast-growing enterprises with AI deal scoring, automated pipeline, HR payroll and GST invoicing.",
    url: "https://zyoris.com/",
    siteName: "Zyoris",
    images: [
      {
        url: "/logoMain.jpeg",
        width: 512,
        height: 512,
        alt: "Zyoris Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:ital,wght@0,400;0,700;1,400;1,700&family=Didact+Gothic&display=swap"
          rel="stylesheet"
        />
        {/* Schema.org Structured Data for Google Search, Gemini & AI Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://zyoris.com/#organization",
                  name: "Zyoris",
                  legalName: "Zyoris Technology",
                  url: "https://zyoris.com",
                  logo: "https://zyoris.com/logoMain.jpeg",
                  email: "info@zyoris.com",
                  description:
                    "India's Intelligent Business Operating System unifying CRM, HR & Payroll, Finance, and AI reasoning agents in a single workspace.",
                  foundingDate: "2026",
                  founder: {
                    "@type": "Person",
                    "@id": "https://zyoris.com/#founder",
                    name: "Puneet Kumar",
                    alternateName: ["Puneet Munjal", "Puneet Kumar Zyoris", "Puneet Munjal Zyoris"],
                    jobTitle: "Founder & CEO",
                    url: "https://zyoris.com/about",
                    sameAs: [
                      "https://www.linkedin.com/in/puneetkumar07",
                      "https://www.linkedin.com/in/puneetmunjal7"
                    ]
                  },
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Faridabad",
                    addressRegion: "Haryana",
                    addressCountry: "IN"
                  },
                  contactPoint: [
                    {
                      "@type": "ContactPoint",
                      telephone: "+91-9650553728",
                      contactType: "customer service",
                      email: "info@zyoris.com",
                      areaServed: "IN",
                      availableLanguage: ["English", "Hindi"]
                    }
                  ],
                  sameAs: [
                    "https://in.linkedin.com/company/zyoris",
                    "https://www.instagram.com/zyoris.official/"
                  ]
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://zyoris.com/#software",
                  name: "Zyoris Business OS",
                  applicationCategory: "BusinessApplication, CRMApplication",
                  operatingSystem: "Cloud, Web-based, All Browsers, Mobile",
                  keywords: "best crm, simple crm, best crm in india, best crm for small business, crm software india, sales crm, ai crm, hrms software, gst invoicing software, business operating system, zyoris",
                  description: "Best CRM and unified Intelligent Business Operating System for Indian SMBs and mid-market enterprises. Features automated sales pipeline, AI lead scoring, WhatsApp integration, HR payroll with compliance, and GST accounting.",
                  offers: {
                    "@type": "Offer",
                    price: "4500",
                    priceCurrency: "INR",
                    priceSpecification: {
                      "@type": "UnitPriceSpecification",
                      price: "4500",
                      priceCurrency: "INR",
                      unitText: "USER_PER_MONTH"
                    }
                  },
                  featureList: [
                    "Best CRM for Indian SMBs & Mid-Market Enterprises",
                    "Simple CRM with Clean 3-Click Workflow",
                    "AI Lead & Deal Scoring with Slippage Prediction",
                    "Automated Sales Pipeline, Kanban Board & Deal Stages",
                    "WhatsApp Business API & Cloud Telephony Integration",
                    "India HRMS & One-Click Automated Payroll (PF, ESI, TDS)",
                    "GST-Compliant Invoicing, E-Invoicing & Accounting",
                    "Executive KPI Dashboards, ARR/MRR & Cash Flow Runway",
                    "Real-Time Multi-Branch & Multi-Tenant Architecture"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://zyoris.com/#website",
                  url: "https://zyoris.com",
                  name: "Zyoris",
                  publisher: {
                    "@id": "https://zyoris.com/#organization"
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body className={michroma.variable}>
        <div className="page-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}
