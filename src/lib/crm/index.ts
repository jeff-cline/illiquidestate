// Public types shared between hook sites and master.
// The master is the only one that talks to Supabase directly; hook sites POST JSON
// to the master's /api/leads endpoint.

export type HookId =
  | "M1_silent_tax"
  | "E1_post_exit"
  | "O1_illiquid_estate"
  | "X1_preipo_clock"
  | "G1_family_office_audit"
  | "C1_charitable_leak";

export type NetWorthRange =
  | "under-10m"
  | "10-25m"
  | "25-50m"
  | "50-100m"
  | "100m-plus";

export type LeadInput = {
  hookId: HookId;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  netWorthRange: NetWorthRange;
  stateCode: string;
  source?: string | null;
  referrer?: string | null;
};

export type Lead = LeadInput & {
  id: string;
  createdAt: string;
  status: "new" | "contacted" | "qualified" | "closed_won" | "closed_lost";
  emailDeliveredAt: string | null;
  notes: string | null;
};

export const HOOK_META: Record<HookId, { name: string; domain: string; playbook: string }> = {
  M1_silent_tax: {
    name: "The Silent Tax",
    domain: "thesilenttax.com",
    playbook: "Silent Tax Playbook",
  },
  E1_post_exit: {
    name: "Post-Exit Playbook",
    domain: "thepostexitplaybook.com",
    playbook: "Founder's Post-Exit Playbook",
  },
  O1_illiquid_estate: {
    name: "Illiquid Estate",
    domain: "illiquidestate.com",
    playbook: "Illiquid Estate Diagnostic",
  },
  X1_preipo_clock: {
    name: "Pre-IPO 24-Month Clock",
    domain: "preipoclock.com",
    playbook: "Pre-IPO Wealth Playbook",
  },
  G1_family_office_audit: {
    name: "Family Office Audit",
    domain: "familyofficeaudit.com",
    playbook: "24-Point Family Office Insurance Audit",
  },
  C1_charitable_leak: {
    name: "Charitable Leak",
    domain: "charitableleak.com",
    playbook: "Philanthropist's Life-Insurance Playbook",
  },
};

export const ALLOWED_ORIGINS = [
  "https://illiquidestate.com",
  "https://www.illiquidestate.com",
  "https://thesilenttax.com",
  "https://www.thesilenttax.com",
  "https://thepostexitplaybook.com",
  "https://www.thepostexitplaybook.com",
  "https://preipoclock.com",
  "https://www.preipoclock.com",
  "https://familyofficeaudit.com",
  "https://www.familyofficeaudit.com",
  "https://charitableleak.com",
  "https://www.charitableleak.com",
];
