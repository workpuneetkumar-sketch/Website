"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Building2,
  MapPin,
  Mail,
  User,
  Phone,
  CreditCard,
  QrCode,
  ArrowRight,
  Sparkles,
  Tag,
  Percent,
  RefreshCw,
  Calendar,
  AlertTriangle,
} from "lucide-react";

interface PlanConfig {
  id: string;
  name: string;
  pricePerUser: number;
  period: string;
  defaultUsers: number;
  description: string;
  features: string[];
}

const PLANS: Record<string, PlanConfig> = {
  starter: {
    id: "starter",
    name: "Starter Plan",
    pricePerUser: 4500,
    period: "/user/month",
    defaultUsers: 3,
    description: "For startups & small teams (up to 10 users)",
    features: [
      "Leads, Contacts & Deals",
      "Basic Dashboard & Views",
      "AI Insights Engine",
      "Email Support",
    ],
  },
  growth: {
    id: "growth",
    name: "Growth Plan",
    pricePerUser: 8500,
    period: "/user/month",
    defaultUsers: 15,
    description: "For growing SMBs (10–50 users)",
    features: [
      "Everything in Starter",
      "Advanced AI & Predictive Reports",
      "HR & Attendance Module",
      "Revenue Forecasting",
      "Priority WhatsApp & Phone Support",
    ],
  },
  business: {
    id: "business",
    name: "Business Plan",
    pricePerUser: 12000,
    period: "/user/month",
    defaultUsers: 50,
    description: "For mid-size companies (50–200 users)",
    features: [
      "Everything in Growth",
      "Finance & Ledger Automation",
      "Full Call Centre Suite",
      "Legacy ERP Integrations",
      "Audit Log & Compliance Guard",
    ],
  },
};

const INDIAN_STATES = [
  "Delhi",
  "Haryana",
  "Uttar Pradesh",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Telangana",
  "Gujarat",
  "Rajasthan",
  "West Bengal",
  "Punjab",
  "Other",
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan") || "starter";
  const initialCoupon = searchParams.get("coupon") || "";
  const initialUsersParam = searchParams.get("users");

  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    PLANS[initialPlan] ? initialPlan : "starter"
  );
  const plan = PLANS[selectedPlanId] || PLANS.starter;

  // Minimum 3 users enforced by default
  const [userCount, setUserCount] = useState<number>(() => {
    if (initialUsersParam) {
      const parsed = parseInt(initialUsersParam);
      if (!isNaN(parsed) && parsed >= 3) return parsed;
    }
    return 3;
  });

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    phone: "",
    companyName: "",
    gstin: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "Delhi",
    pincode: "",
    pan: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [paymentDetails, setPaymentDetails] = useState<{
    paymentId?: string;
    subscriptionId?: string;
  }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Available valid discount coupons
  const VALID_COUPONS: Record<
    string,
    { discountPercent: number; description: string; minUsers: number; maxFreeUsers: number }
  > = {
    ZYORISNEW: {
      discountPercent: 100,
      description: "1st Month 100% FREE (For 3 to 5 active users)",
      minUsers: 3,
      maxFreeUsers: 5,
    },
    ZYORIS10: {
      discountPercent: 10,
      description: "10% Launch Discount (Min. 3 users)",
      minUsers: 3,
      maxFreeUsers: 5,
    },
  };

  // Coupon discount state with auto-apply support
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountPercent: number;
    description: string;
    minUsers: number;
    maxFreeUsers: number;
  } | null>(() => {
    if (initialCoupon && VALID_COUPONS[initialCoupon.toUpperCase()]) {
      const cfg = VALID_COUPONS[initialCoupon.toUpperCase()];
      return {
        code: initialCoupon.toUpperCase(),
        ...cfg,
      };
    }
    // Default to ZYORISNEW if user starts on starter with 3 users
    return {
      code: "ZYORISNEW",
      ...VALID_COUPONS.ZYORISNEW,
    };
  });
  const [couponError, setCouponError] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const cleaned = couponInput.trim().toUpperCase();

    if (!cleaned) {
      setCouponError("Please enter a coupon code");
      return;
    }

    if (VALID_COUPONS[cleaned]) {
      const cfg = VALID_COUPONS[cleaned];
      if (userCount < cfg.minUsers) {
        setCouponError(`This coupon requires minimum ${cfg.minUsers} user seats.`);
        return;
      }

      setAppliedCoupon({
        code: cleaned,
        ...cfg,
      });
      setCouponInput("");
    } else {
      setCouponError("Invalid or expired coupon code");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  // Pricing Calculations:
  // 1 Month 100% Free up to 5 users. Users above 5 pay standard cost.
  const isFreeTrialCoupon = appliedCoupon?.code === "ZYORISNEW";
  const monthlyBase = plan.pricePerUser * userCount;
  const monthlyGst = Math.round(monthlyBase * 0.18);
  const monthlyTotal = monthlyBase + monthlyGst;

  let couponDiscountAmount = 0;
  if (appliedCoupon && userCount >= (appliedCoupon.minUsers || 3)) {
    if (appliedCoupon.code === "ZYORISNEW") {
      // Free seats up to 5 (max 5)
      const freeSeats = Math.min(userCount, 5);
      couponDiscountAmount = plan.pricePerUser * freeSeats;
    } else {
      couponDiscountAmount = Math.round((monthlyBase * appliedCoupon.discountPercent) / 100);
    }
  }

  const firstMonthSubtotal = Math.max(0, monthlyBase - couponDiscountAmount);
  const firstMonthGst = Math.round(firstMonthSubtotal * 0.18);
  const dueToday = firstMonthSubtotal + firstMonthGst;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Enforce email format and phone
    if (!formData.workEmail || !formData.workEmail.includes("@")) {
      setErrorMessage("Please enter a valid work email address.");
      return;
    }
    if (!formData.phone || formData.phone.replace(/\D/g, "").length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number for WhatsApp & Autopay.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Direct Autopay Subscription flow via Razorpay
      const subRes = await fetch("/api/razorpay/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          userCount,
          isFreeTrialOffer: isFreeTrialCoupon && dueToday === 0,
          customerDetails: {
            name: formData.fullName,
            email: formData.workEmail,
            contact: formData.phone,
            company: formData.companyName,
            gstin: formData.gstin || "",
          },
          notes: {
            planName: plan.name,
            seats: userCount,
            company: formData.companyName,
            appliedCoupon: appliedCoupon?.code || "NONE",
            activeUserPolicy: "Must remain active weekly; inactive accounts paused after 7 days.",
          },
        }),
      });

      const subData = await subRes.json();
      if (!subRes.ok || !subData.subscriptionId) {
        throw new Error(subData.error || "Failed to initialize Autopay subscription");
      }

      const options = {
        key: subData.keyId,
        subscription_id: subData.subscriptionId,
        name: "Zyoris Business OS",
        description: isFreeTrialCoupon && dueToday === 0
          ? `1st Month Free · Then ₹${monthlyTotal.toLocaleString("en-IN")}/mo Autopay`
          : `${plan.name} (${userCount} seats · Monthly Autopay)`,
        image: "/logo.jpeg",
        prefill: {
          name: formData.fullName,
          email: formData.workEmail,
          contact: formData.phone,
        },
        notes: {
          company: formData.companyName,
          gstin: formData.gstin || "N/A",
        },
        theme: {
          color: "#2979FF",
        },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/razorpay/verify-subscription", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_subscription_id: response.razorpay_subscription_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setPaymentDetails({
                paymentId: response.razorpay_payment_id,
                subscriptionId: response.razorpay_subscription_id,
              });
              setOrderPlaced(true);
            } else {
              setErrorMessage("Autopay verification failed. Please contact support.");
            }
          } catch (vErr) {
            console.error("Autopay verify error:", vErr);
            setPaymentDetails({
              paymentId: response.razorpay_payment_id,
              subscriptionId: response.razorpay_subscription_id,
            });
            setOrderPlaced(true);
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          },
        },
      };

      if ((window as any).Razorpay) {
        const rzp = new (window as any).Razorpay(options);
        rzp.on("payment.failed", function (failResponse: any) {
          setIsSubmitting(false);
          setErrorMessage(
            failResponse.error?.description || "Autopay authorization failed. Please try again."
          );
        });
        rzp.open();
      } else {
        throw new Error("Razorpay SDK not loaded. Please refresh and try again.");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      setErrorMessage(err?.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="py-20 px-4 max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-blue-50 text-[#2979FF] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border border-blue-100">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="text-style-badge is-badge mb-3">
          Autopay Mandate Active · Verified via Razorpay
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#0A1E3F] tracking-tight mb-4">
          Welcome to Zyoris, {formData.fullName || "Partner"}!
        </h1>
        <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed">
          Your <strong>Autopay Mandate</strong> has been successfully authorized via UPI/Card.
          {isFreeTrialCoupon && dueToday === 0 ? (
            <> First month is <strong>100% FREE (₹0)</strong> for your starting seats. Workspace credentials have been sent to <strong>{formData.workEmail}</strong>.</>
          ) : (
            <> Your subscription is now active. Monthly billing will auto-debit with automated GST tax invoices generated per cycle.</>
          )}
        </p>

        <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 text-left mb-8 shadow-sm">
          <h3 className="font-semibold text-[#0A1E3F] mb-4 text-base border-b border-slate-200 pb-3 flex items-center justify-between">
            <span>Subscription & Workspace Details</span>
            <span className="text-xs font-mono text-[#2979FF] bg-blue-50 px-2 py-1 rounded">
              {paymentDetails.subscriptionId || paymentDetails.paymentId || "ZY-ACTIVE"}
            </span>
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-slate-500 block">Organization</span>
              <span className="font-medium text-[#0A1E3F]">
                {formData.companyName || "Zyoris Team"}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Razorpay Subscription ID</span>
              <span className="font-mono text-xs font-bold text-[#0D47A1]">
                {paymentDetails.subscriptionId || "rzp_sub_live"}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Billing Type</span>
              <span className="font-bold text-emerald-700">
                Monthly Autopay (UPI / Card)
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Plan & Seats</span>
              <span className="font-medium text-[#0A1E3F]">
                {plan.name} ({userCount} users)
              </span>
            </div>
            {formData.gstin && (
              <div className="col-span-2 pt-1 border-t border-slate-100">
                <span className="text-slate-500 block">GSTIN for ITC Claim</span>
                <span className="font-mono text-xs font-medium text-[#0A1E3F] uppercase">
                  {formData.gstin}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#2979FF] text-white font-medium hover:bg-[#0D47A1] transition-all shadow-md"
          >
            Go to Homepage
          </Link>
          <Link
            href="/contact-v1"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white border border-slate-200 text-[#0A1E3F] font-medium hover:bg-slate-50 transition-all"
          >
            Contact Dedicated Support
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="padding-global padding-section-medium">
      <div className="container-default">
        {/* Header Badge */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <div className="text-style-badge is-badge mb-3">
            <Lock className="w-3.5 h-3.5 inline mr-1 text-[#2979FF]" />
            256-Bit SSL Encrypted Razorpay Checkout
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A1E3F] tracking-tight mb-4">
            Activate Your Zyoris Business Workspace
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            Complete your company billing details below. All invoices are 100% GST-compliant for Indian tax credits.
          </p>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column: Form Details (Address, Company, GST) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Select Plan & Seats */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[#0A1E3F] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#EBF3FF] text-[#2979FF] flex items-center justify-center text-xs">
                      1
                    </span>
                    Select Plan & Seats
                  </h2>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold">
                    <RefreshCw className="w-3 h-3 text-emerald-600 animate-spin-slow" />
                    <span>Monthly Autopay</span>
                  </div>
                </div>

                {/* Plan Options Grid */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {Object.values(PLANS).map((p) => {
                    const isSelected = p.id === selectedPlanId;
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setSelectedPlanId(p.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "border-[#2979FF] bg-[#EBF3FF]/70 shadow-sm ring-2 ring-blue-100"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div className="font-bold text-sm text-[#0A1E3F]">{p.name.replace(" Plan", "")}</div>
                        <div className="text-xs text-[#2979FF] font-semibold mt-1">
                          ₹{p.pricePerUser.toLocaleString("en-IN")}
                          <span className="text-[10px] text-slate-500 font-normal">/seat</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* User Count Stepper (Min 3 Users Enforced) */}
                <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#0A1E3F]">
                      Team Seats / Users (Minimum 3 Users)
                    </label>
                    <span className="text-[11px] text-slate-500">
                      1st month 100% FREE for 3 to 5 users · Users above 5 charged standard rate
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={userCount <= 3}
                      onClick={() => setUserCount(Math.max(3, userCount - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={3}
                      max={500}
                      value={userCount}
                      onChange={(e) => setUserCount(Math.max(3, parseInt(e.target.value) || 3))}
                      className="w-14 text-center font-bold text-[#0A1E3F] bg-white border border-slate-200 rounded-lg py-1 text-sm outline-none focus:border-[#2979FF]"
                    />
                    <button
                      type="button"
                      onClick={() => setUserCount(userCount + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Free Month Terms & Condition Banner */}
                <div className="mt-4 p-4 rounded-xl bg-amber-50/80 border border-amber-200/90 flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-[#0A1E3F] leading-relaxed">
                    <p className="font-bold text-amber-900 mb-1">
                      1 Month Free Offer Terms & Conditions:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      <li>Valid on starting teams of <strong>3 to 5 users</strong> (1st Month 100% Free).</li>
                      <li><strong>Active User Policy:</strong> All registered seats must remain active. If the account remains inactive for <strong>1 continuous week (7 days)</strong>, the free workspace access will be automatically revoked.</li>
                      <li>Seats above 5 are billed at regular plan pricing.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 2: Account Details (Direct Email Input - No OTP) */}
              <div>
                <h2 className="text-lg font-bold text-[#0A1E3F] flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#EBF3FF] text-[#2979FF] flex items-center justify-center text-xs">
                    2
                  </span>
                  Account & Contact Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0A1E3F] mb-1.5">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        required
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Puneet Kumar"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:border-[#2979FF] focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0A1E3F] mb-1.5">
                      Work Email (Workspace Admin & Invoices) *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        required
                        type="email"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="puneet@company.com"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:border-[#2979FF] focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0A1E3F] mb-1.5">
                      Phone Number (WhatsApp Alerts & Autopay Mandate) *
                    </label>
                    <div className="flex border border-slate-200 rounded-xl overflow-hidden focus-within:border-[#2979FF] focus-within:ring-2 focus-within:ring-blue-100 bg-white">
                      <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 border-r border-slate-200 text-xs font-semibold text-slate-700">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        <span>+91</span>
                      </div>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone.replace(/^\+91\s*/, "")}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, "").slice(0, 10);
                          setFormData((prev: any) => ({ ...prev, phone: `+91${raw}` }));
                        }}
                        placeholder="98765 43210"
                        className="w-full px-3 py-2 text-sm bg-transparent outline-none text-slate-800 placeholder-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0A1E3F] mb-1.5">
                      Company / Organization Name *
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        required
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="e.g. Nexa Dynamics Pvt Ltd"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:border-[#2979FF] focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Billing Address & Indian GST Compliance */}
              <div>
                <h2 className="text-lg font-bold text-[#0A1E3F] flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#EBF3FF] text-[#2979FF] flex items-center justify-center text-xs">
                    3
                  </span>
                  Billing Address & GSTIN (India)
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0A1E3F] mb-1.5">
                      Billing Address (Street / Building) *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        required
                        type="text"
                        name="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleChange}
                        placeholder="Plot No. 42, Cyber City / Connaught Place"
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:border-[#2979FF] focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0A1E3F] mb-1.5">
                        City *
                      </label>
                      <input
                        required
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="New Delhi"
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:border-[#2979FF] focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0A1E3F] mb-1.5">
                        State *
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:border-[#2979FF] focus:ring-2 focus:ring-blue-100 outline-none bg-white"
                      >
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0A1E3F] mb-1.5">
                        PIN Code *
                      </label>
                      <input
                        required
                        type="text"
                        name="pincode"
                        maxLength={6}
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="110001"
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:border-[#2979FF] focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-[#0A1E3F]">
                          GSTIN (Optional for 100% Tax Credit)
                        </label>
                        <span className="text-[10px] text-slate-400">15-digit</span>
                      </div>
                      <input
                        type="text"
                        name="gstin"
                        maxLength={15}
                        value={formData.gstin}
                        onChange={handleChange}
                        placeholder="07AAAAA0000A1Z5"
                        className="w-full uppercase font-mono px-3 py-2 text-sm border border-slate-200 rounded-xl focus:border-[#2979FF] focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-[#0A1E3F]">
                          Company PAN
                        </label>
                        <span className="text-[10px] text-slate-400">10-digit</span>
                      </div>
                      <input
                        type="text"
                        name="pan"
                        maxLength={10}
                        value={formData.pan}
                        onChange={handleChange}
                        placeholder="ABCDE1234F"
                        className="w-full uppercase font-mono px-3 py-2 text-sm border border-slate-200 rounded-xl focus:border-[#2979FF] focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Payment Method Selection */}
              <div>
                <h2 className="text-lg font-bold text-[#0A1E3F] flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#EBF3FF] text-[#2979FF] flex items-center justify-center text-xs">
                    4
                  </span>
                  Select Autopay Mode
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "upi", label: "UPI Autopay / e-Mandate", icon: QrCode, badge: "GooglePay · PhonePe · Paytm" },
                    { id: "card", label: "Credit / Debit Cards", icon: CreditCard, badge: "Visa · Mastercard · RuPay" },
                    { id: "netbanking", label: "NetBanking / e-NACH", icon: Building2, badge: "All Major Indian Banks" },
                  ].map((m) => {
                    const isSelected = paymentMethod === m.id;
                    const Icon = m.icon;
                    return (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                          isSelected
                            ? "border-[#2979FF] bg-[#EBF3FF]/70 shadow-sm ring-2 ring-blue-100"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-3">
                          <Icon className={`w-5 h-5 ${isSelected ? "text-[#2979FF]" : "text-slate-500"}`} />
                          <span className="text-[10px] text-slate-500 font-medium">
                            {m.badge}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-[#0A1E3F]">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between">
                  <span>{errorMessage}</span>
                  <button
                    type="button"
                    onClick={() => setErrorMessage(null)}
                    className="text-red-500 hover:text-red-800 font-bold ml-2"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-[#1E70FF] hover:bg-[#0D47A1] disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold text-base md:text-lg transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Opening Secure Razorpay Autopay Gateway...</span>
                ) : isFreeTrialCoupon && dueToday === 0 ? (
                  <>
                    <span>Claim 1 Month Free & Authorize Monthly Autopay</span>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                  </>
                ) : (
                  <>
                    <span>Confirm & Setup Monthly Autopay (Due Today: ₹{dueToday.toLocaleString("en-IN")})</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified Razorpay Live Production
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2979FF]" /> Cancel Autopay Anytime
                </span>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary Card (Sticky) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-bold text-lg text-[#0A1E3F]">{plan.name}</h3>
                  <p className="text-xs text-slate-500">{plan.description}</p>
                </div>
                <span className="text-xs font-semibold text-[#0D47A1] bg-blue-100/70 px-2.5 py-1 rounded-full">
                  Monthly Autopay
                </span>
              </div>

              {/* Features List */}
              <div className="py-4 border-b border-slate-200 space-y-2.5">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  What is included
                </div>
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2979FF] flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* Coupon Code Section */}
              <div className="py-4 border-b border-slate-200">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#2979FF]" /> Promo / Coupon Code
                  </span>
                </div>

                {!appliedCoupon ? (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="e.g. ZYORISNEW"
                      className="flex-1 px-3 py-1.5 text-xs uppercase font-mono border border-slate-200 rounded-lg outline-none focus:border-[#2979FF] bg-white"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-[#0A1E3F] hover:bg-[#2979FF] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200/80 px-3 py-2 rounded-xl text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800">
                      <Percent className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.description})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-red-500 hover:text-red-700 font-bold ml-2 text-sm"
                      title="Remove coupon"
                    >
                      ×
                    </button>
                  </div>
                )}

                {couponError && (
                  <div className="text-[11px] text-red-500 mt-1.5 font-medium">
                    {couponError}
                  </div>
                )}
              </div>

              {/* Cost Breakdown */}
              <div className="py-4 border-b border-slate-200 space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Seats ({userCount} users @ ₹{plan.pricePerUser.toLocaleString("en-IN")}/mo)</span>
                  <span className="font-medium text-[#0A1E3F]">
                    ₹{(plan.pricePerUser * userCount).toLocaleString("en-IN")}/mo
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600 font-medium text-xs">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" /> Coupon ({appliedCoupon.code})
                    </span>
                    <span>-₹{couponDiscountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>First Month Subtotal {userCount > 5 && "(Only seats 1-5 free)"}</span>
                  <span className="font-medium text-[#0A1E3F]">
                    ₹{firstMonthSubtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    GST (18% for Indian Entities)
                  </span>
                  <span className="font-medium text-[#0A1E3F]">
                    ₹{firstMonthGst.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Total Due Today */}
              <div className="pt-4 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Total Due Today</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#0D47A1]">
                    ₹{dueToday.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-emerald-700 font-bold block">
                    Monthly Autopay
                  </span>
                  <span className="text-[10px] text-slate-400">All taxes inclusive</span>
                </div>
              </div>

              {/* Autopay Schedule Detail */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-100/90 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <div className="font-semibold text-[#0A1E3F] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#2979FF]" />
                  <span>Autopay Billing Schedule:</span>
                </div>
                {isFreeTrialCoupon && dueToday === 0 ? (
                  <>
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>• Month 1 (First 30 Days):</span>
                      <span>₹0 (100% FREE for {Math.min(userCount, 5)} seats)</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>• Month 2 Onwards (Monthly):</span>
                      <span>₹{monthlyTotal.toLocaleString("en-IN")}/month</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-slate-700 font-medium">
                      <span>• Month 1 Due Today:</span>
                      <span>₹{dueToday.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>• Month 2 Onwards (Monthly):</span>
                      <span>₹{monthlyTotal.toLocaleString("en-IN")}/month</span>
                    </div>
                  </>
                )}
                <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg mt-2 border border-amber-200/60 leading-tight">
                  ⚠️ <strong>Note:</strong> Free month requires active daily/weekly usage. Inactive workspaces for more than 7 continuous days will be paused.
                </div>
              </div>

              {/* Indian Corporate Guarantee */}
              <div className="mt-5 p-4 rounded-xl bg-blue-50/70 border border-blue-100/90 text-xs text-[#0A1E3F]/80 leading-relaxed">
                <p className="font-semibold text-[#0D47A1] mb-1 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#2979FF]" /> Corporate GST Invoicing
                </p>
                Enter your company GSTIN during checkout to avail input tax credit (ITC) on all subscription fees. Need custom PO or vendor registration? Email <a href="mailto:info@zyoris.com" className="text-[#2979FF] underline font-medium">info@zyoris.com</a>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="page-wrapper">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <Navbar />
      <main className="main-wrapper bg-[#FBFDFF] min-h-screen">
        <Suspense fallback={<div className="py-24 text-center">Loading checkout...</div>}>
          <CheckoutContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
