"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "../buttons/Button";
import { X } from "lucide-react";
import { TopAnnouncementBar } from "./TopAnnouncementBar";
import "../../styles/deploya.css";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      {/* Running Announcement Bar */}
      <TopAnnouncementBar />

      <div className="nav-content">
        <div className="container w-container">
        <div className="nav-wrapper">
          {/* Logo */}
          <Link
            id="w-node-_90194ca1-81d8-1b85-2f41-dfea0faac993-0faac98e"
            href="/"
            aria-current="page"
            className="nav-brand w-nav-brand w--current flex items-center"
          >
            <div className="flex items-center">
              <img
                src="/logo.jpeg"
                alt="Zyoris logo"
                className="h-9 sm:h-10 w-auto max-w-[180px] sm:max-w-[210px] object-contain mix-blend-multiply flex-shrink-0"
              />
            </div>
          </Link>

          {/* Nav Right */}
          <div className="nav-right">
            <div className="nav-menu-wrapper !hidden md:!flex">
              <nav
                role="navigation"
                className="nav-menu w-nav-menu !hidden md:!flex items-center"
              >
                <Link href="/#features" className="nav-link w-nav-link">
                  Features
                </Link>
                <Link href="/#how" className="nav-link w-nav-link">
                  How it works
                </Link>
                <Link href="/#pricing" className="nav-link w-nav-link">
                  Pricing
                </Link>
                <Link href="/faq" className="nav-link w-nav-link">
                  FAQ
                </Link>
                <Link href="/contact" className="nav-link w-nav-link">
                  Contact
                </Link>
              </nav>
            </div>

            {/* Desktop Nav Right Buttons (Hidden on mobile) */}
            <div className="nav-buttons !hidden md:!flex">
              <div className="nav-info-dropdown w-dropdown">
                <div className="nav-info-dropdown-toggle w-dropdown-toggle">
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
                    Get Early Access
                  </Button>
                </div>
              </div>
            </div>

            {/* Hamburger Button (Only on mobile) */}
            <div
              className={`nav-menu-button w-nav-button md:!hidden flex items-center justify-center p-2 rounded-lg cursor-pointer ${mobileMenuOpen ? "w--open" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              role="button"
              tabIndex={0}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[2.2] text-[#0A1E3F]" />
              ) : (
                <img
                  loading="lazy"
                  src="https://cdn.prod.website-files.com/69b13cad49372c03e40843d9/69b13cad49372c03e4084538_menu.svg"
                  alt=""
                  className="nav-menu-icon"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="md:!hidden fixed inset-0 top-[6.25rem] bg-black/20 backdrop-blur-[2px] z-[9998]"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="md:!hidden fixed top-[6.25rem] left-0 right-0 w-full bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-2xl px-6 py-6 flex flex-col gap-3 z-[9999] max-h-[calc(100vh-6.25rem)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="nav-link w-nav-link py-2.5 border-b border-slate-100 text-[#0A1E3F]"
            >
              Features
            </Link>
            <Link
              href="/#how"
              onClick={() => setMobileMenuOpen(false)}
              className="nav-link w-nav-link py-2.5 border-b border-slate-100 text-[#0A1E3F]"
            >
              How it works
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="nav-link w-nav-link py-2.5 border-b border-slate-100 text-[#0A1E3F]"
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="nav-link w-nav-link py-2.5 border-b border-slate-100 text-[#0A1E3F]"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="nav-link w-nav-link py-2.5 border-b border-slate-100 text-[#0A1E3F]"
            >
              Contact
            </Link>
            <div className="pt-2" onClick={() => setMobileMenuOpen(false)}>
              <Button
                href="/#early-access"
                variant="primary"
              >
                Get Early Access
              </Button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
