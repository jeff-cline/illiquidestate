/**
 * Post-lead deliverables — the promise behind each CTA.
 * Links to static assets served by the master site (/assets/playbooks/...).
 * Replace with real signed URLs when the playbook PDFs are finalized.
 */

import type { HookId } from "@/lib/crm";

export interface Deliverable {
  title: string;
  url: string;
  subject: string;
  body: string; // plain-text email body
}

export const DELIVERABLES: Record<HookId, Deliverable> = {
  M1_silent_tax: {
    title: "The Silent Tax Playbook",
    url: "https://illiquidestate.com/assets/playbooks/silent-tax-playbook.pdf",
    subject: "The Silent Tax Playbook — inside",
    body:
      "Thank you for running the Silent Tax audit.\n\n" +
      "Your personalized estate-tax impact estimator and the companion Silent Tax Playbook are attached and linked below. The playbook covers the 2026 exemption sunset mechanics, the strategies $10M+ families are using (ILIT, SLAT, dynasty trust, premium-financed life insurance), and a decision tree keyed to the five archetypes we serve.\n\n" +
      "A member of the Illiquid Estate team will follow up within one business day.\n\n" +
      "— Jeff Cline, CEO\n" +
      "Illiquid Estate · 5 Cowboys Way, Frisco, TX 75034 · 972-800-6670",
  },
  E1_post_exit: {
    title: "Founder's Post-Exit Playbook",
    url: "https://illiquidestate.com/assets/playbooks/post-exit-playbook.pdf",
    subject: "Founder's Post-Exit Playbook — inside",
    body:
      "Thank you for requesting the Founder's Post-Exit Playbook.\n\n" +
      "The playbook covers the first 18 months post-exit — pre-sale planning windows, QSBS stacking, SLAT/ILIT gifting before the 2026 sunset, CRT integration, premium-financing decision tree, and common 18-month mistakes.\n\n" +
      "A member of the Illiquid Estate team will follow up within one business day.\n\n" +
      "— Jeff Cline, CEO\n" +
      "Illiquid Estate · 5 Cowboys Way, Frisco, TX 75034 · 972-800-6670",
  },
  O1_illiquid_estate: {
    title: "The Illiquid Estate Playbook",
    url: "https://illiquidestate.com/assets/playbooks/illiquid-estate-playbook.pdf",
    subject: "Your Illiquid Estate Report + playbook — inside",
    body:
      "Thank you for running the Illiquid Estate Calculator.\n\n" +
      "Your personalized Illiquid Estate Report is attached, along with the companion playbook covering Section 6166, buy-sell redesign post-Connelly v. IRS (2024), and premium financing for closely-held owners.\n\n" +
      "A member of the Illiquid Estate team will follow up within one business day.\n\n" +
      "— Jeff Cline, CEO\n" +
      "Illiquid Estate · 5 Cowboys Way, Frisco, TX 75034 · 972-800-6670",
  },
  X1_preipo_clock: {
    title: "Pre-IPO 24-Month Playbook",
    url: "https://illiquidestate.com/assets/playbooks/preipo-playbook.pdf",
    subject: "Your Pre-IPO timeline + playbook — inside",
    body:
      "Thank you for requesting the Pre-IPO 24-Month Timeline.\n\n" +
      "The playbook maps the optimal gift, trust, and premium-finance actions across your expected IPO window. It covers QSBS stacking, SLAT gifting, early-stage ILIT, and pre-lockup premium-financing integration.\n\n" +
      "A member of the Illiquid Estate team will follow up within one business day.\n\n" +
      "— Jeff Cline, CEO\n" +
      "Illiquid Estate · 5 Cowboys Way, Frisco, TX 75034 · 972-800-6670",
  },
  G1_family_office_audit: {
    title: "Family Office Insurance Audit",
    url: "https://illiquidestate.com/assets/playbooks/family-office-audit.pdf",
    subject: "Family Office Insurance Audit — 24-point checklist inside",
    body:
      "Thank you for requesting the Family Office Insurance Audit.\n\n" +
      "The 24-point institutional checklist covers policy inventory, ownership structure, funding status, MEC status, carrier rating review, beneficiary alignment, loan balance review for financed policies, and collateral call stress tests.\n\n" +
      "A member of the Illiquid Estate team will follow up within one business day to discuss a formal review of your policy schedule.\n\n" +
      "— Jeff Cline, CEO\n" +
      "Illiquid Estate · 5 Cowboys Way, Frisco, TX 75034 · 972-800-6670",
  },
  C1_charitable_leak: {
    title: "The Philanthropist's Life-Insurance Playbook",
    url: "https://illiquidestate.com/assets/playbooks/charitable-playbook.pdf",
    subject: "Your Charitable Leak report + playbook — inside",
    body:
      "Thank you for running the Charitable Leak analysis.\n\n" +
      "The playbook covers CRT + wealth-replacement ILIT structures, gifts of existing policies, and DAF / foundation overlays — the strategies $20M+ donors use to reduce the IRS share of their charitable legacy.\n\n" +
      "A member of the Illiquid Estate team will follow up within one business day.\n\n" +
      "— Jeff Cline, CEO\n" +
      "Illiquid Estate · 5 Cowboys Way, Frisco, TX 75034 · 972-800-6670",
  },
};
