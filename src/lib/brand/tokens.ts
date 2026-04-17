// Brand tokens — Illiquid Estate
// Grounded in the Discovery positioning: modern-restraint · editorial · quiet-wealth
// Visual reference: Loro Piana / Brunello Cucinelli / editorial publication — not fintech purple

export const colors = {
  // Base
  cream: "#faf8f3",
  creamDeep: "#f4f1ea",
  ink: "#1a1a1a",
  ink80: "#333333",
  ink60: "#4a4a4a",
  ink40: "#8a8a8a",
  ink20: "#cfcfcf",
  ink10: "#e6e4df",
  white: "#ffffff",

  // Accent — primary brand color (burnt sienna from social graphics)
  sienna: "#7a3b21",
  siennaLight: "#f0e4dc",
  siennaDeep: "#5a2a17",

  // Secondary accents — one per silo for silo-level surfaces
  siloMaster: "#7a3b21",      // sienna — master brand + O1 owner (this brand IS O1)
  siloEntrepreneur: "#3d4a38", // sage
  siloExecutive: "#9a7b4f",    // bronze
  siloGenerational: "#8b6b3f", // whitespace brown-gold
  siloCharitable: "#2f5d3b",   // ok green

  // Status
  ok: "#2f5d3b",
  warn: "#8b2f2f",
} as const;

export const fonts = {
  // Serif for editorial / headlines / long-form
  serif: 'Georgia, "Times New Roman", "Playfair Display", serif',
  // Sans for UI / labels / forms / kickers
  sans: '-apple-system, "SF Pro Text", "Helvetica Neue", Inter, Arial, sans-serif',
  // Mono for technical / disclosure IDs / methodology
  mono: '"SF Mono", Menlo, "JetBrains Mono", Consolas, monospace',
} as const;

export const contact = {
  name: "Illiquid Estate",
  legalName: "Illiquid Estate, LLC",
  address: {
    street: "5 Cowboys Way",
    city: "Frisco",
    state: "Texas",
    zip: "75034",
  },
  phone: "972-800-6670",
  email: "jeff.cline@me.com",
  ceoName: "Jeff Cline",
  ceoTitle: "Chief Executive Officer",
} as const;

export const domain = {
  master: "illiquidestate.com",
  hooks: {
    silentTax: "thesilenttax.com",
    postExit: "thepostexitplaybook.com",
    preIpo: "preipoclock.com",
    familyOffice: "familyofficeaudit.com",
    charitable: "charitableleak.com",
  },
} as const;

export const silos = {
  owner: {
    id: "owner",
    label: "For business owners",
    title: "Business owners planning succession",
    one: "Your estate looks great on paper. The IRS will want cash.",
    hero: "The illiquid estate problem: how owners actually pay the tax.",
    accent: colors.siloMaster,
    // Silo 2 is the master's home silo — the brand name IS the Silo 2 hook
    isMaster: true,
  },
  entrepreneur: {
    id: "entrepreneur",
    label: "For post-liquidity founders",
    title: "Post-liquidity entrepreneurs",
    one: "You sold the company. Now what?",
    hero: "After the wire: an unhurried playbook for the first 18 months.",
    accent: colors.siloEntrepreneur,
    hookDomain: "thepostexitplaybook.com",
  },
  executive: {
    id: "executive",
    label: "For concentrated-equity executives",
    title: "Concentrated-equity executives",
    one: "24 months before your IPO are your biggest estate-planning window.",
    hero: "The pre-IPO clock · playbook for executives.",
    accent: colors.siloExecutive,
    hookDomain: "preipoclock.com",
  },
  generational: {
    id: "generational",
    label: "For family offices",
    title: "Generational wealth families",
    one: "Family offices audit investments quarterly. Most audit insurance never.",
    hero: "The institutional insurance audit.",
    accent: colors.siloGenerational,
    hookDomain: "familyofficeaudit.com",
  },
  charitable: {
    id: "charitable",
    label: "For charitable-legacy-first donors",
    title: "Charitable-legacy-first donors",
    one: "The IRS takes a bigger share of your charitable legacy than you think.",
    hero: "Give more. Keep your heirs whole.",
    accent: colors.siloCharitable,
    hookDomain: "charitableleak.com",
  },
} as const;

export type SiloId = keyof typeof silos;
