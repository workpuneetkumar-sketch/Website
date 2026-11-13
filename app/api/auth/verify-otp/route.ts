import { NextResponse } from "next/server";
import { verifyStoredOtp } from "@/lib/otpStore";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required." },
        { status: 400 }
      );
    }

    const isValid = verifyStoredOtp(email, otp);

    if (!isValid) {
      return NextResponse.json(
        { error: "Incorrect or expired verification code. Please try again." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, verified: true });
  } catch (err: any) {
    console.error("verify-otp API error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
