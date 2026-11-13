# 🛡️ Zyoris Developer & AI Agent Working Rules

> **MANDATORY POLICY FOR ANY DEVELOPER OR AI WORKING ON THIS REPOSITORY**  
> Every human developer and AI agent must read and strictly adhere to these rules before writing or modifying any code.

---

### Rule 1: Always Update Documentation
Whenever you make any changes (styles, UI components, backend routes, environment logic, email templates, new pages), you **MUST immediately update `docs/DEVELOPER_GUIDE.md`** in the same session. Document:
- Exact files modified or added.
- The rationale and context of the change.
- Any new conventions or environment variables introduced.

### Rule 2: Git Commit & Push Protocol
- **NEVER execute `git commit` or `git push` without explicit user permission.**
- Always check `git status` before asking the user for permission.
- Ensure all automated checks (e.g. `npx tsc --noEmit`) pass with exit code 0 before prompting for a commit/push.

### Rule 3: Brand Consistency
- **Primary Brand Color**: Electric Royal Blue (`#1E70FF` with hover `#0D47A1`). All interactive primary CTA buttons across all pages must use this color.
- **Phone Number Inputs**: Always include the fixed `🇮🇳 +91` badge with strict 10-digit validation (`^[6-9]\d{9}$`).
- **All Form Fields Mandatory**: Every input in lead/contact capture forms must be marked as required with a visible red asterisk (`*`).

### Rule 4: Email System Security & Formatting
- **Sender Address**: Must always be `verify@zyoris.com`.
- **Admin Lead Notifications**: Must always be dispatched to `info@zyoris.com`.
- **Reply-To**: Always set to `info@zyoris.com`.
- **Email Assets**: Host images on high-reliability CDNs or clean inline base64 to avoid email clients (Gmail/Apple Mail) showing bottom attachment chips.
- **Never commit `.env.local` or raw API keys into Git.**
