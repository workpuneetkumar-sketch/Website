import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// Plan mappings in Razorpay
const RAZORPAY_PLANS: Record<string, { monthly: string; yearly: string }> = {
  starter: {
    monthly: "plan_Tzk4hc2ihd1cym",
    yearly: "plan_TzkF6FxTjYdLpH",
  },
  growth: {
    monthly: "plan_Tzk5HhfhDIBoY0",
    yearly: "plan_TzkFCUqqqXe0vj",
  },
  business: {
    monthly: "plan_TzkEN96iMmd13V",
    yearly: "plan_TzkFJoZCJnX9By",
  },
};

export async function POST(req: Request) {
  try {
    const {
      planId = "starter",
      billingCycle = "monthly",
      userCount = 1,
      totalCount = 60, // 60 monthly cycles (5 years)
      isFreeTrialOffer = false, // 1st month free for coupon ZyorisNew
      customerDetails = {},
      notes = {},
    } = await req.json();

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay credentials not configured" },
        { status: 500 }
      );
    }

    const selectedPlan = RAZORPAY_PLANS[planId];
    if (!selectedPlan) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    const razorpayPlanId =
      billingCycle === "annual" ? selectedPlan.yearly : selectedPlan.monthly;

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // 1. Create or ensure customer in Razorpay
    let customerId: string | undefined;
    if (customerDetails.email) {
      try {
        const customer = await razorpay.customers.create({
          name: customerDetails.name || "Zyoris Customer",
          email: customerDetails.email,
          contact: customerDetails.contact || "",
          notes: {
            company: customerDetails.company || "",
            gstin: customerDetails.gstin || "",
          },
        });
        customerId = customer.id;
      } catch (custErr: any) {
        console.warn("Customer creation skipped or failed:", custErr?.message);
      }
    }

    // 2. Compute subscription options
    // If free trial offer (e.g. ZyorisNew 1 month free), start recurring billing 30 days from now!
    // Razorpay allows start_at timestamp for future charge
    const subOptions: any = {
      plan_id: razorpayPlanId,
      total_count: billingCycle === "annual" ? 5 : totalCount, // 5 years total
      quantity: Math.max(1, Number(userCount) || 1),
      customer_notify: 1,
      notes: {
        ...notes,
        plan: planId,
        billingCycle,
        userCount,
        isFreeTrialOffer: isFreeTrialOffer ? "true" : "false",
      },
    };

    if (customerId) {
      subOptions.customer_id = customerId;
    }

    if (isFreeTrialOffer) {
      // 30 days trial: start billing after 30 days (first month completely free)
      const thirtyDaysAhead = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
      subOptions.start_at = thirtyDaysAhead;
    }

    const subscription: any = await razorpay.subscriptions.create(subOptions);

    return NextResponse.json({
      success: true,
      subscriptionId: subscription.id,
      shortUrl: subscription.short_url,
      keyId,
    });
  } catch (error: any) {
    console.error("Razorpay subscription creation error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create subscription" },
      { status: 500 }
    );
  }
}
