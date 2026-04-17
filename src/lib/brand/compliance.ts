// Compliance snippets — sourced from discovery/01-compliance-guardrails.md
// Must be reviewed by insurance marketing counsel before launch.
// These are the defaults — counsel may amend any of them.

import { contact } from "./tokens";

export const compliance = {
  // Short footer for every page bottom
  footer: `${contact.legalName} · Licensed life insurance producer, all 50 states · Home office ${contact.address.city}, ${contact.address.state} · Licensing: illiquidestate.com/licensing`,

  // Advertisement label — required per NAIC Model 570
  advertisement: "Advertisement",

  // Educational framing — for every page touching product mechanics
  educational:
    "Educational only — not legal, tax, or investment advice. Consult your independent advisors.",

  // Premium-financing risk disclosure — required anywhere PF is described
  pfRisk:
    "Life insurance premium financing involves material risk — interest-rate risk, collateral-call risk, and policy-performance risk. The borrower remains personally liable on the loan. No policy values, loan terms, or tax outcomes are guaranteed.",

  // MEC qualifier — required anywhere tax-favored cash-value access is mentioned
  mec:
    "Tax-favored access to policy cash value depends on the policy maintaining non-MEC status under IRC §7702A. Policies classified as Modified Endowment Contracts (MECs) are taxed on a LIFO basis with a 10% penalty if distributions are taken before age 59½.",

  // Illustration disclaimer — required anywhere performance is shown/projected
  illustration:
    "Any depiction of policy performance is subject to a personalized basic illustration compliant with applicable state insurance illustration regulations. The illustration shows guaranteed and non-guaranteed elements; non-guaranteed elements may change.",

  // STOLI / insurable-interest statement — required for any PF landing
  stoli:
    `${contact.name} does not participate in or facilitate Stranger-Originated Life Insurance (STOLI). Every policy requires valid insurable interest at issue. Our premium-financing structures are recourse arrangements collateralized by the client's own liquid assets.`,

  // Tax disclaimer — required anywhere tax treatment is discussed
  tax:
    "This material is for general educational purposes and does not constitute tax advice. Tax treatment of life insurance and premium financing depends on individual circumstances and policy classification. Consult your independent tax advisor.",

  // FDIC non-insurance statement — required for any insurance/investment content
  fdic:
    "Not FDIC insured · Not a bank deposit · Not insured by any federal government agency · May lose value",

  // Link targets
  disclosuresUrl: "https://illiquidestate.com/disclosures",
  licensingUrl: "https://illiquidestate.com/licensing",
  privacyUrl: "https://illiquidestate.com/privacy",
  termsUrl: "https://illiquidestate.com/terms",
} as const;

// Copyright line
export function copyrightLine(year: number = new Date().getFullYear()): string {
  return `© ${year} ${contact.legalName}. All rights reserved.`;
}
