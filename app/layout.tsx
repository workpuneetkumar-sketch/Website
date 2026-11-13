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
  icons: {
    icon: "/logoMain.jpeg",
    apple: "/logoMain.jpeg",
  },
  openGraph: {
    title: "Zyoris | India's AI-Powered Business OS",
    description: "One platform for Sales, HR, Finance and Operations. AI that tells you what to do next. Starting at ₹4,500/user/month.",
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
                  description:
                    "India's Intelligent Business Operating System unifying CRM, HR & Payroll, Finance, and AI reasoning agents in a single workspace.",
                  foundingDate: "2026",
                  founder: {
                    "@type": "Person",
                    "@id": "https://zyoris.com/#founder",
                    name: "Puneet Kumar",
                    alternateName: ["Puneet Munjal", "Puneet Kumar Zyoris"],
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
                  sameAs: [
                    "https://in.linkedin.com/company/zyoris",
                    "https://www.instagram.com/zyoris.ai"
                  ]
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://zyoris.com/#software",
                  name: "Zyoris Business OS",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Cloud, Web-based",
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
                    "Best CRM for Indian SMBs & Mid-Market",
                    "AI Deal & Lead Scoring",
                    "Automated Sales Pipeline & Kanban",
                    "India HRMS & One-Click Payroll with PF/ESI/TDS",
                    "GST Invoicing & Accounting",
                    "Embedded Cloud Telephony & WhatsApp CRM"
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
