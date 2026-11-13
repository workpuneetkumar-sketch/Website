import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    } = await req.json();

    const keySecret =
      process.env.RAZORPAY_KEY_SECRET || "ySTkt3QZVuP9e4aiKSk2YYHs";

    if (!keySecret) {
      return NextResponse.json(
        { error: "Razorpay secret not configured" },
        { status: 500 }
      );
    }

    // Subscription signature verification: payment_id + "|" + subscription_id
    const body = `${razorpay_payment_id}|${razorpay_subscription_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      return NextResponse.json({
        success: true,
        message: "Autopay subscription verified successfully",
        paymentId: razorpay_payment_id,
        subscriptionId: razorpay_subscription_id,
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid subscription signature" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Subscription verification error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to verify subscription" },
      { status: 500 }
    );
  }
}
