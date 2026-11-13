import { Resend } from "resend";

let resendInstance: Resend | null = null;

export const getResendClient = (): Resend => {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY || "re_dummy_build_key";
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
};

// Proxy to keep backwards compatibility with `resend.emails.send(...)`
export const resend = {
  get emails() {
    return getResendClient().emails;
  },
};

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@zyoris.com";
export const FROM_EMAIL = process.env.FROM_EMAIL || "Zyoris <verify@zyoris.com>";
export const REPLY_TO_EMAIL = "info@zyoris.com";
