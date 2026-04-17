import { Resend } from "resend";
import type { HookId } from "@/lib/crm";

function client() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not set");
  return new Resend(key);
}

export async function sendPlaybookEmail(args: {
  to: string;
  firstName: string;
  playbookName: string;
  hookId: HookId;
  leadId: string;
}) {
  const from = process.env.EMAIL_FROM || "Illiquid Estate <hello@illiquidestate.com>";
  const replyTo = process.env.EMAIL_REPLY_TO || "jeff.cline@me.com";

  const subject = `${args.playbookName} - your copy inside`;
  const html = buildHtml(args);
  const text = buildText(args);

  await client().emails.send({
    from,
    to: args.to,
    replyTo,
    subject,
    html,
    text,
    headers: {
      "X-Entity-Ref-ID": args.leadId,
    },
  });
}

function buildText(a: { firstName: string; playbookName: string }): string {
  return [
    `${a.firstName},`,
    "",
    `Thanks for requesting the ${a.playbookName}. Your copy is attached (or linked below).`,
    "",
    "One thing that separates Illiquid Estate from every incumbent in this category: we show our math. Every illustration comes with guaranteed and non-guaranteed elements labeled. Every lender spread is disclosed. Every advisor is named.",
    "",
    "If you'd like a 45-minute private review of your situation, reply to this email or book directly:",
    "https://illiquidestate.com/diagnostic",
    "",
    "Jeff Cline",
    "CEO, Illiquid Estate",
    "972-800-6670 · jeff.cline@me.com",
    "",
    "---",
    "Advertisement. Educational only — not legal, tax, or investment advice. Life insurance premium financing involves material risk. Borrower remains personally liable on the loan. Full disclosures: https://illiquidestate.com/disclosures",
  ].join("\n");
}

function buildHtml(a: { firstName: string; playbookName: string; hookId: HookId; leadId: string }): string {
  return `<!doctype html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:40px 20px;background:#faf8f3;font-family:Georgia,serif;color:#1a1a1a;">
<div style="max-width:560px;margin:0 auto;background:#ffffff;padding:40px;border:1px solid #e6e4df;">
  <div style="font-family:-apple-system,Helvetica,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#7a3b21;font-weight:600;margin-bottom:10px;">Illiquid Estate</div>
  <div style="height:3px;width:40px;background:#1a1a1a;margin-bottom:24px;"></div>
  <h1 style="font-size:28px;line-height:1.2;font-weight:400;margin:0 0 20px;">${a.playbookName} — your copy.</h1>
  <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">${a.firstName},</p>
  <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">Thanks for requesting the <em>${a.playbookName}</em>. Your copy is attached (or linked below).</p>
  <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">One thing that separates Illiquid Estate from every incumbent in this category: we show our math. Every illustration comes with guaranteed and non-guaranteed elements labeled. Every lender spread is disclosed. Every advisor is named.</p>
  <p style="font-size:16px;line-height:1.6;margin:0 0 32px;">If you'd like a 45-minute private review of your situation, reply to this email or book directly:</p>
  <p><a href="https://illiquidestate.com/diagnostic" style="display:inline-block;background:#1a1a1a;color:#faf8f3;padding:14px 28px;font-family:Georgia,serif;font-size:16px;text-decoration:none;">Book a private review →</a></p>
  <p style="font-size:14px;color:#4a4a4a;margin-top:40px;line-height:1.5;">
    Jeff Cline<br/>
    CEO, Illiquid Estate<br/>
    <a href="tel:9728006670" style="color:#4a4a4a;">972-800-6670</a> · <a href="mailto:jeff.cline@me.com" style="color:#4a4a4a;">jeff.cline@me.com</a>
  </p>
  <hr style="margin:36px 0;border:0;border-top:1px solid #e6e4df;"/>
  <p style="font-family:-apple-system,Helvetica,sans-serif;font-size:10px;color:#6a6a6a;line-height:1.5;">
    Advertisement. Illiquid Estate, LLC — licensed life insurance producer, all 50 states. 5 Cowboys Way, Frisco, TX 75034. Educational only — not legal, tax, or investment advice. Life insurance premium financing involves material risk — interest-rate, collateral-call, and policy-performance risk. Borrower remains personally liable on the loan. No policy values, loan terms, or tax outcomes are guaranteed. Full disclosures at <a href="https://illiquidestate.com/disclosures" style="color:#6a6a6a;">illiquidestate.com/disclosures</a>.
  </p>
  <p style="font-family:-apple-system,Helvetica,sans-serif;font-size:10px;color:#1a1a1a;font-weight:700;">
    Not FDIC insured · Not a bank deposit · Not insured by any federal government agency · May lose value
  </p>
</div>
</body></html>`;
}
