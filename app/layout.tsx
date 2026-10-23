import type { Metadata } from "next";
import "./globals.css";
import "../styles/deploya.css"
import {Michroma} from "next/font/google"

const michroma = Michroma({
  weight : "400",
  subsets: ["latin"],
  variable: "--font-zyoris",
})



export const metadata: Metadata = {
  metadataBase: new URL("https://zyoris.com"),
  title: "Zyoris | India's AI-Powered Business OS — CRM, HR, Finance in One Platform",
  description: "Zyoris is India's first Intelligent Business Operating System. One platform for Sales & CRM, HR, Finance, and AI Insights. Starting at ₹4,500/user/month. Built for Indian SMBs.",
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    title: "Zyoris | India's AI-Powered Business OS",
    description: "One platform for Sales, HR, Finance and Operations. AI that tells you what to do next. Starting at ₹4,500/user/month.",
    url: "https://zyoris.com/",
    siteName: "Zyoris",
    images: [
      {
        url: "/logo.jpeg",
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
      </head>
      <body className={michroma.variable}>
        <div className="page-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}
