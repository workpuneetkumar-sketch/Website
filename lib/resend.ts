import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY || "";

export const resend = new Resend(apiKey);
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@zyoris.com";
export const FROM_EMAIL = process.env.FROM_EMAIL || "Zyoris <verify@zyoris.com>";
export const REPLY_TO_EMAIL = "info@zyoris.com";
