import { NextResponse } from "next/server";
import { resend, FROM_EMAIL, REPLY_TO_EMAIL } from "@/lib/resend";
import { storeOtp } from "@/lib/otpStore";
import { renderEmailTemplate, getZyorisBannerAttachment } from "@/lib/emailTemplates";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    storeOtp(email, otp);

    // Format OTP with clean spaces between digits: e.g. "4 8 2 9 3 1"
    const spacedOtp = otp.split("").join(" ");

    // Greeting personalized with name or fallback
    const greeting = name ? `Hi ${name.trim().split(" ")[0]}, ` : "Hi, ";

    const contentHtml = `
      <!-- TITLE -->
      <h1 style="color: #111827; font-size: 22px; font-weight: 700; margin: 0 0 10px 0; letter-spacing: -0.3px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        Verify Your Account
      </h1>
      
      <!-- SUBTITLE -->
      <p style="color: #6B7280; font-size: 13px; line-height: 1.55; margin: 0 0 28px 0;">
        ${greeting}please enter the verification code below to verify your email address on Zyoris.
      </p>

      <!-- LABEL -->
      <div style="color: #111827; font-size: 15px; font-weight: 700; margin-bottom: 12px; letter-spacing: -0.2px;">
        Verification Code
      </div>

      <!-- SPACED CODE -->
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Courier New', monospace; font-size: 34px; font-weight: 800; letter-spacing: 10px; color: #111827; margin-bottom: 12px; padding-left: 10px;">
        ${spacedOtp}
      </div>

      <!-- EXPIRY -->
      <div style="color: #6B7280; font-size: 12px; margin-bottom: 30px;">
        This code is valid for <strong style="color: #111827;">10 minutes</strong>.
      </div>

      <!-- DISCLAIMER -->
      <p style="color: #9CA3AF; font-size: 11px; line-height: 1.6; margin: 0; max-width: 340px; display: inline-block;">
        Never share this verification code with anyone. Zyoris representatives will never ask for your code.
      </p>
    `;

    const emailHtml = renderEmailTemplate({
      title: `Zyoris Verification Code: ${otp}`,
      preheader: `Your 6-digit Zyoris verification code is ${otp}`,
      contentHtml,
    });

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      replyTo: REPLY_TO_EMAIL,
      to: [email.trim().toLowerCase()],
      subject: `Your Zyoris Verification Code: ${otp}`,
      html: emailHtml,
      attachments: getZyorisBannerAttachment(),
    });

    if (error) {
      console.error("Resend send OTP error:", error);
      let userMsg = error.message;
      if (error.message?.includes("You can only send testing emails to your own email address")) {
        userMsg = "Resend Sandbox Mode: Currently in testing mode, emails can only be sent to your registered Resend account (work.puneetkumar@gmail.com). To send to all visitors, verify your domain at resend.com/domains.";
      }
      return NextResponse.json(
        { error: userMsg || "Failed to send verification code." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: any) {
    console.error("send-otp API error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
