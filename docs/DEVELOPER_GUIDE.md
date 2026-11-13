# Zyoris Website — Master Architecture, Technical History & Developer Guide
> **Confidential & Proprietary** — Internal Architecture & Developer Reference for Zyoris Technologies Pvt. Ltd.  
> Last Updated: November 2026 | Version: 2.5.0

---

## ⚠️ MANDATORY RULE FOR ALL DEVELOPERS & AI AGENTS

> [!IMPORTANT]
> **STRICT PROJECT POLICY:**  
> Whenever **ANY human developer or AI agent** makes modifications, adds new features, updates styles, refactors endpoints, or changes environment behaviors in this repository, they **MUST immediately update this file (`docs/DEVELOPER_GUIDE.md`)** during the same task.
> 
> **Never commit or deploy code without documenting what was changed, which files were touched, and why.**

---

## 1. Executive Summary & Product Context

**Zyoris** is India's Intelligent Business Operating System (Business OS). It unifies core business operations — Sales & CRM, HR & Payroll, Accounting & Invoicing, and AI Analytics — into a single synchronized workspace designed specifically for Indian fast-growing companies, SMBs, and mid-market enterprises.

- **Production / Staging URL**: `http://localhost:3000` (Local) / `https://zyoris.com` (Production)
- **Primary Tech Stack**: Next.js 14.2+ (App Router), React 18, TypeScript (Strict Mode), Tailwind CSS, GSAP / Custom animations, Resend Transactional Email Engine.
- **Git Remote**: `https://github.com/workpuneetkumar-sketch/Website.git` (Branch: `main`)
- **Strict Protocol**: **NEVER run `git push` or `git commit` without explicit user permission.**

---

## 2. Directory Structure & File Map

```
Website/
├── app/                                 # Next.js App Router root
│   ├── api/                             # Backend API Routes
│   │   ├── auth/
│   │   │   ├── send-otp/route.ts        # Generates & emails 6-digit OTP via verify@zyoris.com
│   │   │   └── verify-otp/route.ts      # Validates OTP against in-memory store
│   │   └── leads/
│   │       └── submit/route.ts          # Dispatches lead details to info@zyoris.com & Thank You to user
│   ├── contact-v1/                      # Dedicated Contact Us Page (Full mandatory form & direct channels)
│   ├── contact/                         # Route alias pointing directly to contact-v1
│   ├── checkout/                        # 3-step checkout with coupon code engine & Razorpay integration
│   ├── careers/                         # Careers & internship application page with email verification
│   ├── faq/                             # Interactive FAQ with category filters (50+ SEO questions)
│   ├── about/                           # Company story, team values, and mission
│   ├── globals.css                      # Global theme variables, brand colors (#1E70FF), button styling
│   └── page.tsx                         # Homepage entry point assembling all marketing sections
├── components/
│   ├── auth/
│   │   ├── EmailOtpVerifier.tsx         # Universal OTP verification badge & input widget
│   │   └── PhoneOtpVerifier.tsx         # Legacy phone OTP widget (retained for reference)
│   ├── buttons/
│   │   └── Button.tsx                   # Master button component supporting 3D hover text mask
│   ├── footer/
│   │   └── Footer.tsx                   # Global footer with WhatsApp support & direct links
│   ├── modals/
│   │   └── LaunchOfferModal.tsx         # Timed promotional pop-up modal for first-time visitors
│   ├── navbar/
│   │   ├── Navbar.tsx                   # Sticky responsive navigation with desktop & mobile menu
│   │   └── TopAnnouncementBar.tsx       # Infinite running marquee announcement bar with coupon copy buttons
│   └── sections/
│       ├── BannerCTASection.tsx         # Video background hero banner with lead capture form
│       ├── BenefitsSection.tsx          # "How it works" 3-step workflow cards
│       ├── FeaturesSection.tsx          # Interactive module showcase (01 to 06) with sticky nav
│       ├── HeroSection.tsx              # Homepage hero with scroll zoom 3D interface mockup
│       ├── IntegrationsSection.tsx      # Tool replacement & ecosystem grid
│       ├── PricingSection.tsx           # Monthly/Annual pricing cards with coupon discounts
│       ├── ShowcaseSection.tsx          # Metric cards (Time saved, ROI, Western tool comparison)
│       └── TestimonialsSection.tsx      # Why Zyoris grid + Main "Get Early Access" form (#early-access)
├── data/
│   └── faqData.ts                       # 50+ SEO & Google "People Also Ask" questions for Zyoris
├── lib/
│   ├── emailTemplates.ts                # Master HTML email renderer with responsive card layout & CDN banner
│   ├── otpStore.ts                      # Secure 10-minute in-memory OTP verification store
│   └── resend.ts                        # Resend client instance and environment variable fallbacks
├── public/                              # Static public assets (logos, images, video loops)
│   ├── logo.jpeg                        # Transparent/white navbar brand logo
│   ├── logoMain.jpeg                    # High-res square brand logo used in email templates
│   ├── zyoris-email-banner.jpg          # User-uploaded 3D brand logo artwork
│   ├── email-verify-illustration.png    # Precision-cropped pastel security envelope illustration
│   └── videos/                          # Looping video assets (loop-footer-video.mp4)
├── .env.local                           # Environment variables (GITIGNORED — DO NOT COMMIT SECRETS)
└── docs/                                # Documentation folder for future developers and AI agents
    ├── DEVELOPER_GUIDE.md               # This file
    └── RULES.md                         # Golden rules for future development
```

---

## 3. Complete Chronological Technical History & Work Log

### Phase 1: Core Content, Video Banner & Brand Alignment
1. **Looping Video CTA Background**:
   - Integrated `public/videos/loop-footer-video.mp4` into `BannerCTASection.tsx` with autoplay, loop, and muted controls.
   - Tuned overlay opacity in `styles/deploya.css` (`.section_home1_layer`) so white text remains sharp and readable.
2. **50+ SEO Product FAQ Page (`/faq`)**:
   - Created `data/faqData.ts` with 50+ questions categorized into: Overview, Features, Pricing, Security, and Support.
   - Built interactive accordion search and category filtering in `app/faq/page.tsx` with SEO structured schema markup.
   - Linked FAQ in both Navbar and Footer.
3. **Dedicated Careers & Internship Portal (`/careers`)**:
   - Created interactive job board and application form with resume file attachment handling.
4. **Checkout Engine & Dynamic Coupons (`/checkout`)**:
   - Multi-tier seat pricing (Starter, Growth, Enterprise) with monthly/annual billing toggle.
   - Built real-time coupon validation engine (`ZyorisNew` for 1 month free, `ZYORIS10` for 10% instant off, min 3 seats requirement).
   - Razorpay payment gateway integration ready.
5. **Top Announcement Running Marquee (`TopAnnouncementBar.tsx`)**:
   - Created continuous marquee ticker on top of Navbar showcasing launch deals, automatic 8% annual billing saver, and single-click copy buttons for coupon codes.

---

### Phase 2: Firebase Retirement & Resend Email OTP Migration
1. **Discontinuation of Firebase Phone Auth**:
   - Firebase SMS authentication caused sandbox limitations on localhost and high carrier friction.
   - Completely transitioned to **Resend Email OTP verification**.
2. **Resend Client & API Routes**:
   - Created `lib/resend.ts` and in-memory store `lib/otpStore.ts` with 10-minute expiration.
   - `POST /api/auth/send-otp`: Generates random 6-digit OTP, formats HTML email, and dispatches via Resend.
   - `POST /api/auth/verify-otp`: Validates user-submitted OTP code.
   - `POST /api/leads/submit`: Dispatches full lead details to admin and customer Thank You receipt.
3. **Verified Domain Setup**:
   - Verified `zyoris.com` on Resend (DNS verified on GoDaddy, Resend Forge infrastructure enabled).
   - Set outgoing sender: **`Zyoris <verify@zyoris.com>`**.
   - Set inbound admin lead recipient: **`info@zyoris.com`**.
   - Set reply-to address: **`info@zyoris.com`** (Customer email replies go straight to official company inbox).

---

### Phase 3: Email Template Refinement & Image Delivery
1. **Elimination of Bottom Attachment Cards**:
   - Using CID MIME attachments caused Gmail and Apple Mail on iOS to render an ugly separate attachment card at the bottom of the email.
   - **Solution**: Hosted the exact cropped pastel security illustration (envelope + shield + lock) on a reliable CDN (`https://files.catbox.moe/4kprgf.png`) and set `attachments: []`. Bottom attachment chips are completely gone.
2. **Exact Reference UI Matching**:
   - Converted Indonesian text in original design to **clean Professional English**:
     - Title: **"Verify Your Account"**
     - Subtitle: Personalized with visitor's first name: *"Hi Puneet, please enter the verification code below..."*
     - Label: **"Verification Code"**
     - Digits: Spaced monospace numerals (`4  8  2  9  3  1`)
     - Expiry: *"This code is valid for 10 minutes."*
     - Disclaimer: *"Never share this verification code with anyone. Zyoris representatives will never ask for your code."*
     - Direct WhatsApp Support Pill: `+91 96505 53728`.

---

### Phase 4: Form Fields, Dropdowns & Button Branding
1. **Mandatory Fields on Contact Page (`/contact-v1`)**:
   - All fields marked mandatory with red asterisk (`*`): Full Name, Work Email (with OTP verification), Phone Number (10-digit validation with fixed `🇮🇳 +91` badge), Company Name, Team Size dropdown, Purpose dropdown, and Message.
   - Replaced browser default select arrows with sleek `ChevronDown` icons (`⌵`).
2. **Global Button Standardization (`#1E70FF`)**:
   - Replaced muted `#5d97e9` with the vibrant **Electric Royal Blue (`#1E70FF`)** in `app/globals.css`.
   - Hover state transitions to `#0D47A1` with elevated blue shadow (`0 4px 14px rgba(30, 112, 255, 0.25)`).
   - Applied consistently across Navbar, Hero, Features modules, Pricing cards, Contact form, Testimonials, and Checkout.
3. **"Get Early Access" Viewport Center Alignment**:
   - Programmed `el.scrollIntoView({ behavior: "smooth", block: "center" })` on Navbar and Hero buttons.
   - Added `scroll-mt-28 md:scroll-mt-32` and `!pb-24 md:!pb-36` to `#early-access` card to eliminate top clipping behind the navbar.
4. **Vercel Zero-Config Build Resilience**:
   - Implemented lazy proxy initialization for Resend in `lib/resend.ts` and added `export const dynamic = "force-dynamic"` to all API routes so Next.js build never crashes when static page data collection runs in CI/CD without environment variables.
5. **SEO & Search Console Indexing Infrastructure**:
   - Created dynamic `app/robots.ts` (`/robots.txt`) with strict Googlebot directives allowing public marketing pages while blocking internal API endpoints (`/api/*`).
   - Created dynamic `app/sitemap.ts` (`/sitemap.xml`) registering all primary marketing pages with priority scores (1.0 to 0.6).
   - Added `alternates.canonical` to `app/layout.tsx` to resolve Search Console duplicate URL and redirect warnings.
6. **Navbar Responsive Polish & Popup Routing**:
   - Removed awkward vertical divider (`border-right`) on `nav-menu-wrapper` in both `components/navbar/Navbar.tsx` and `app/globals.css` ensuring clean spacing on small tabs / laptops.
   - Redirected Launch Offer modal (`LaunchOfferModal.tsx`) and Top Announcement bar (`TopAnnouncementBar.tsx`) CTAs directly to the contact page (`/contact?offer=ZyorisNew`) instead of the payment checkout page.
7. **Google Search, Gemini Knowledge Graph & 301 Redirects Engine**:
   - Added permanent 301 redirects in `next.config.mjs` for all legacy indexed URLs (`about.html` -> `/about`, `careers.html` -> `/careers`, `contact.html` -> `/contact-v1`, etc.) so existing Google rank carries forward without 404 errors.
   - Embedded Schema.org `@graph` in `app/layout.tsx` (Organization, SoftwareApplication with CRM feature highlights, and Person schema linking Puneet Kumar & Puneet Munjal with LinkedIn profiles).
   - Injected `FAQPage` JSON-LD schema into `app/faq/page.tsx` covering all 50+ FAQs for instant Google rich snippets and direct AI (Gemini, ChatGPT Search, Perplexity) ingestion.

---

## 4. Developer Cheat-Sheet (Where to Change What)

| Requirement | Target File to Edit | Key Details |
| :--- | :--- | :--- |
| **Resend API Key, Admin Inbox, Sender** | `.env.local` & `lib/resend.ts` | `ADMIN_EMAIL=info@zyoris.com`, `FROM_EMAIL=Zyoris <verify@zyoris.com>` |
| **Email Template HTML & Design** | `lib/emailTemplates.ts` | Edit `renderEmailTemplate()` & banner URLs |
| **OTP Generation & Verification Logic** | `app/api/auth/send-otp/route.ts` & `lib/otpStore.ts` | 6-digit generator, 10m TTL |
| **Lead Submission & Admin Notification** | `app/api/leads/submit/route.ts` | Handles concurrent admin + customer emails |
| **Top Running Marquee & Coupons** | `components/navbar/TopAnnouncementBar.tsx` | Edit `ANNOUNCEMENTS` array |
| **Navbar Links, Logo & Early Access Button** | `components/navbar/Navbar.tsx` | Desktop & mobile drawer navigation |
| **Global Theme Colors & Master Buttons** | `app/globals.css` | Edit `:root` and `.button` class |
| **Contact Page Form & Validations** | `app/contact-v1/page.tsx` | All fields mandatory, styled select dropdowns |
| **Homepage Early Access Form** | `components/sections/TestimonialsSection.tsx` | Target id: `#early-access` |
| **Footer Links, Socials & WhatsApp** | `components/footer/Footer.tsx` | Direct WhatsApp: `+91 96505 53728` |
| **Checkout Flow & Pricing Engine** | `app/checkout/page.tsx` | Coupon calculation, seats, Razorpay |

---

## 5. Security & Deployment Protocol

1. **Environment Variables**:
   - Always store secrets in `.env.local`. Never commit `.env.local` to GitHub.
   - Verify that `.gitignore` includes `.env*.local`.
2. **Quality Verification Before Deployment**:
   ```bash
   npx tsc --noEmit
   ```
   *(Must exit with code 0)*
3. **STRICT USER COMMAND**:
   - **Never run `git push` or `git commit` without explicit permission from the user.**
