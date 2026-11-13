export const VERIFY_ILLUSTRATION_URL = "https://files.catbox.moe/4kprgf.png";

export function getZyorisBannerAttachment() {
  // MUST return empty array so that Gmail and iOS never show attachment cards at the bottom!
  return [];
}

/**
 * Exact Clean Email Verification Template
 * Matches the reference image:
 * - Hosted illustration banner on top (#93C5FD background)
 * - Pure white rounded card (#FFFFFF)
 * - Zero bottom attachment chips
 */
export function renderEmailTemplate({
  title,
  preheader,
  contentHtml,
}: {
  title: string;
  preheader?: string;
  contentHtml: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #EEF4FA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  ${preheader ? `<div style="display: none; max-height: 0px; overflow: hidden; mso-hide: all;">${preheader}</div>` : ""}
  
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #EEF4FA; width: 100%; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 16px 48px 16px;">
        
        <!-- MAIN WHITE CARD CONTAINER -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 440px; background-color: #FFFFFF; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06); border: 1px solid #E2E8F0;">
          
          <!-- TOP ILLUSTRATION BANNER -->
          <tr>
            <td style="padding: 0; background-color: #93C5FD; text-align: center; line-height: 0;">
              <img src="${VERIFY_ILLUSTRATION_URL}" alt="Security Verification" width="440" style="width: 100%; max-width: 440px; height: auto; display: block; border-top-left-radius: 24px; border-top-right-radius: 24px;" />
            </td>
          </tr>

          <!-- CARD CONTENT -->
          <tr>
            <td style="padding: 32px 28px 36px 28px; background-color: #FFFFFF; text-align: center;">
              ${contentHtml}
            </td>
          </tr>

          <!-- FOOTER / WHATSAPP SUPPORT -->
          <tr>
            <td style="padding: 16px 28px 22px 28px; background-color: #FAFBFD; border-top: 1px solid #F1F5F9; text-align: center;">
              <a href="https://wa.me/919650553728?text=Hi%20Zyoris%20Team%2C%20following%20up%20on%20my%20inquiry." target="_blank" style="display: inline-block; padding: 8px 18px; background-color: #E8F5E9; border: 1px solid #C8E6C9; border-radius: 9999px; color: #1B5E20; font-size: 12px; font-weight: 600; text-decoration: none;">
                💬 Need help? WhatsApp: <strong>+91 96505 53728</strong>
              </a>
              <p style="margin: 12px 0 0 0; color: #94A3B8; font-size: 11px;">
                © 2026 Zyoris Technologies Pvt. Ltd. Confidential.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

