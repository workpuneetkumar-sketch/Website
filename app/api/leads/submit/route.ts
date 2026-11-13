import { NextResponse } from "next/server";
import { resend, ADMIN_EMAIL, FROM_EMAIL, REPLY_TO_EMAIL } from "@/lib/resend";
import { renderEmailTemplate, getZyorisBannerAttachment } from "@/lib/emailTemplates";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      company,
      email,
      phone,
      teamSize,
      lookingFor,
      message,
      source = "Website Contact Form",
    } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    // 1. Admin Lead Email Content
    const adminInnerHtml = `
      <div style="margin-bottom: 24px;">
        <span style="display: inline-block; padding: 4px 14px; background-color: #E8F1FC; border: 1px solid #C2D4EE; border-radius: 9999px; color: #0D47A1; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
          🔥 New Inbound Lead
        </span>
        <h1 style="color: #0A1E3F; font-size: 22px; font-weight: 700; margin: 12px 0 6px 0;">
          Lead Received from ${name || "Visitor"}
        </h1>
        <p style="color: #64748B; font-size: 13px; margin: 0;">
          Source: <strong>${source}</strong> &nbsp;·&nbsp; ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
        </p>
      </div>

      <!-- LEAD DETAILS TABLE -->
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 20px 0; background: #FAFCFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden;">
        <tr style="border-bottom: 1px solid #EEF2F6;">
          <td style="padding: 12px 16px; color: #64748B; width: 35%; font-weight: 600;">Full Name</td>
          <td style="padding: 12px 16px; color: #0A1E3F; font-weight: 700;">${name || "N/A"}</td>
        </tr>
        <tr style="border-bottom: 1px solid #EEF2F6;">
          <td style="padding: 12px 16px; color: #64748B; font-weight: 600;">Company</td>
          <td style="padding: 12px 16px; color: #0A1E3F; font-weight: 700;">${company || "N/A"}</td>
        </tr>
        <tr style="border-bottom: 1px solid #EEF2F6;">
          <td style="padding: 12px 16px; color: #64748B; font-weight: 600;">Work Email</td>
          <td style="padding: 12px 16px;">
            <a href="mailto:${email}" style="color: #2979FF; font-weight: 700; text-decoration: none;">${email}</a>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #EEF2F6;">
          <td style="padding: 12px 16px; color: #64748B; font-weight: 600;">Phone / WhatsApp</td>
          <td style="padding: 12px 16px;">
            <a href="https://wa.me/${(phone || "").replace(/\D/g, "")}" style="color: #25D366; font-weight: 700; text-decoration: none;">
              ${phone || "N/A"} (Open WhatsApp)
            </a>
          </td>
        </tr>
        ${teamSize ? `
        <tr style="border-bottom: 1px solid #EEF2F6;">
          <td style="padding: 12px 16px; color: #64748B; font-weight: 600;">Team Size</td>
          <td style="padding: 12px 16px; color: #0A1E3F; font-weight: 600;">${teamSize}</td>
        </tr>` : ""}
        ${lookingFor || message ? `
        <tr>
          <td style="padding: 12px 16px; color: #64748B; font-weight: 600; vertical-align: top;">Requirements</td>
          <td style="padding: 12px 16px; color: #0A1E3F; line-height: 1.6;">${lookingFor || message}</td>
        </tr>` : ""}
      </table>

      <!-- QUICK ACTIONS -->
      <div style="margin-top: 24px; text-align: center;">
        <a href="https://wa.me/${(phone || "").replace(/\D/g, "")}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #25D366, #128C7E); color: white; border-radius: 9999px; text-decoration: none; font-size: 13px; font-weight: 700; margin-right: 8px;">
          💬 Reply on WhatsApp
        </a>
        <a href="mailto:${email}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #0A1E3F, #0D47A1); color: white; border-radius: 9999px; text-decoration: none; font-size: 13px; font-weight: 700;">
          ✉️ Send Email
        </a>
      </div>
    `;

    const adminEmailHtml = renderEmailTemplate({
      title: `New Lead: ${name || "Visitor"} (${company || "Company"})`,
      preheader: `New inbound lead from ${name || "Visitor"} via ${source}`,
      contentHtml: adminInnerHtml,
    });

    // 2. Customer Thank You Email Content
    const firstName = name ? name.split(" ")[0] : "there";
    const customerInnerHtml = `
      <div style="margin-bottom: 24px;">
        <span style="display: inline-block; padding: 4px 14px; background-color: #E8F5E9; border: 1px solid #C8E6C9; border-radius: 9999px; color: #1B5E20; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
          ✓ Request Received
        </span>
        <h1 style="color: #0A1E3F; font-size: 24px; font-weight: 700; margin: 12px 0 6px 0;">
          Thank You for Connecting with Zyoris
        </h1>
        <p style="color: #64748B; font-size: 14px; margin: 0; line-height: 1.5;">
          Hi ${firstName}, we're excited to help your business operate smarter.
        </p>
      </div>

      <p style="color: #1E293B; font-size: 15px; line-height: 1.6;">
        We have received your inquiry. One of our enterprise product specialists is reviewing your details and will connect with you shortly.
      </p>

      <!-- HIGHLIGHT BOX -->
      <div style="background: linear-gradient(180deg, #F0F5FF 0%, #E8F1FC 100%); border: 1.5px solid #2979FF; padding: 20px; border-radius: 14px; margin: 24px 0;">
        <div style="font-size: 13px; font-weight: 700; color: #0D47A1; margin-bottom: 8px;">
          What to expect next:
        </div>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #334155; line-height: 1.7;">
          <li>A personalized walkthrough of CRM, HR, Invoicing, and AI Analytics.</li>
          <li>Answers to your specific team and integration requirements.</li>
          <li>Free 14-day early access setup with dedicated onboarding.</li>
        </ul>
      </div>

      <p style="color: #1E293B; font-size: 14px; line-height: 1.6;">
        Have an urgent requirement or want to skip the queue? Chat directly with our founders and solution architects on WhatsApp:
      </p>

      <div style="text-align: center; margin: 20px 0;">
        <a href="https://wa.me/919650553728?text=Hi%20Zyoris%20Team%2C%20following%20up%20on%20my%20inquiry." target="_blank" style="display: inline-block; padding: 12px 28px; background: #25D366; color: white; border-radius: 9999px; text-decoration: none; font-size: 14px; font-weight: 700; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25);">
          💬 WhatsApp +91 96505 53728
        </a>
      </div>

      <p style="color: #64748B; font-size: 14px; line-height: 1.6; margin-top: 24px;">
        Warm regards,<br />
        <strong style="color: #0A1E3F;">The Zyoris Team</strong><br />
        <span style="font-size: 12px; color: #94A3B8;">India's Intelligent Business Operating System</span>
      </p>
    `;

    const customerEmailHtml = renderEmailTemplate({
      title: "Thank You for Contacting Zyoris",
      preheader: `Hi ${firstName}, we received your request and will connect with you shortly.`,
      contentHtml: customerInnerHtml,
    });

    // Dispatch emails concurrently
    const bannerAttachments = getZyorisBannerAttachment();
    await Promise.allSettled([
      // Lead to Admin
      resend.emails.send({
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        subject: `🔥 New Lead: ${name || "Visitor"} from ${company || "Company"} (${phone || email})`,
        html: adminEmailHtml,
        attachments: bannerAttachments,
      }),
      // Thank You to Customer
      resend.emails.send({
        from: FROM_EMAIL,
        replyTo: REPLY_TO_EMAIL,
        to: [email.trim().toLowerCase()],
        subject: "Thank you for reaching out to Zyoris — We'll connect with you shortly",
        html: customerEmailHtml,
        attachments: bannerAttachments,
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Lead processed and notification emails sent successfully.",
    });
  } catch (err: any) {
    console.error("submit-lead API error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to process lead." },
      { status: 500 }
    );
  }
}
