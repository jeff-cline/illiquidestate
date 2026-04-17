import * as React from "react";
import Link from "next/link";
import { Hero, FomoCard, LeadForm } from "@/lib/ui";
import { colors, Logo } from "@/lib/brand";

const ACCENT = colors.sienna;
const LEAD_API = "/api/leads";

export const metadata = {
  title: "The Illiquid Estate Diagnostic — see your liquidity gap in 3 minutes",
  description:
    "For $10M+ families navigating the 2026 sunset. A 3-minute diagnostic that quantifies the liquidity gap your heirs will face — and the structures that close it.",
};

export default function DiagnosticPage() {
  return (
    <>
      <TopNav />

      <Hero
        kicker="Illiquid Estate · the diagnostic"
        archetypeLabel="For $10M+ families"
        accentColor={ACCENT}
        headline={
          <>
            Your estate has a <em className="italic text-sienna">liquidity gap</em>.
            <br />
            See how big.
          </>
        }
        subline="A 3-minute diagnostic keyed to your asset mix, state, and situation. You get a personalized report and — if you want — a private 45-minute review with a named advisor."
      />

      <section className="mx-auto max-w-5xl px-6 pb-16 md:px-12">
        <FomoCard accentColor={ACCENT}>
          The 2026 federal estate-tax exemption is legislated to revert to roughly half its current level on January 1, 2026. Families at $10M+ have an approximately 20-month window to restructure gifts, trusts, and life-insurance coverage before the exemption contracts. The diagnostic surfaces the specific structures that apply to your situation.
        </FomoCard>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <div className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-sienna">
              What you get
            </div>
            <h2 className="mb-6 font-serif text-3xl md:text-4xl">
              A personalized report. A playbook. A named advisor.
            </h2>
            <ul className="space-y-3 font-serif text-base italic leading-relaxed text-ink80">
              <li>• Your estimated liquidity gap, based on asset mix, state, and family structure.</li>
              <li>• A decision tree keyed to the five archetypes we serve — founders, owners, executives, families, and donors.</li>
              <li>• The Illiquid Estate Diagnostic Playbook — covering §6166, buy-sell redesign post-<em>Connelly v. IRS</em> (2024), and premium financing for closely-held owners.</li>
              <li>• Optional: a private 45-minute review with a named advisor, a tax attorney, and (if applicable) the lender.</li>
            </ul>

            <div className="mt-10 space-y-4 font-sans text-sm text-ink80">
              <BenefitItem label="No obligation">
                You receive the report regardless of whether you schedule a review.
              </BenefitItem>
              <BenefitItem label="No sales pitch">
                The review is a diagnostic. If premium financing isn't right for you, we say so — and we tell you what is.
              </BenefitItem>
              <BenefitItem label="Compliance-forward">
                Everything we send meets NAIC Model 570 advertising standards and includes required illustration framing. We show our math. Every advisor is named. Compensation is disclosed.
              </BenefitItem>
            </div>
          </div>

          <div className="border border-ink10 bg-white p-6 md:p-8">
            <div className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-sienna">
              Start the diagnostic
            </div>
            <h3 className="mb-6 font-serif text-2xl">See the gap.</h3>
            <LeadForm
              hookId="O1_illiquid_estate"
              leadApiUrl={LEAD_API}
              ctaLabel="See the gap"
              accentColor={ACCENT}
              deliverableLabel="Illiquid Estate Diagnostic"
              successTitle="Check your inbox."
              successBody="Your Illiquid Estate Report and the companion playbook are on their way. A named advisor will follow up within one business day to offer a private 45-minute review."
            />
          </div>
        </div>
      </section>

      <section className="bg-creamDeep/50 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-sienna">
            Why now
          </div>
          <h2 className="mb-8 font-serif text-3xl md:text-5xl">
            Three windows are closing.
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Why num="01" title="2026 sunset">
              The most compressed gifting timeline in a decade. SLAT, dynasty-trust, and gift planning windows contract on January 1, 2026.
            </Why>
            <Why num="02" title="Post-Connelly buy-sell">
              The 2024 Supreme Court decision in <em>Connelly v. IRS</em> reshaped how buy-sell-funded life insurance is valued. Existing structures need review.
            </Why>
            <Why num="03" title="Incumbent fossilization">
              Modern-UHNW expectations have re-set around transparency. Incumbents stuck in heritage-opacity cannot easily reorganize.
            </Why>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-sienna">
            Not a business owner?
          </div>
          <h2 className="mb-6 font-serif text-3xl md:text-4xl">
            We serve five archetypes.
          </h2>
          <p className="mx-auto mb-8 max-w-xl font-serif text-lg italic leading-relaxed text-ink60">
            Each has its own diagnostic, its own playbook, and its own named advisor. Pick the one that fits.
          </p>
          <Link
            href="/#silos"
            className="inline-flex items-center gap-3 border border-ink bg-cream px-8 py-4 font-serif text-lg text-ink transition hover:bg-ink hover:text-cream"
          >
            Find your archetype <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}

function TopNav() {
  return (
    <header className="border-b border-ink10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" aria-label="Illiquid Estate home">
          <Logo className="h-8 md:h-9" />
        </Link>
        <nav className="hidden items-center gap-8 font-sans text-sm text-ink80 md:flex">
          <Link href="/#silos" className="hover:text-sienna">Archetypes</Link>
          <Link href="/methodology" className="hover:text-sienna">Methodology</Link>
          <Link href="/disclosures" className="hover:text-sienna">Disclosures</Link>
          <Link href="/diagnostic" className="rounded-sm border border-ink px-4 py-1.5 transition hover:bg-ink hover:text-cream">
            Diagnostic
          </Link>
        </nav>
      </div>
    </header>
  );
}

function BenefitItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-sienna pl-4">
      <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-sienna">{label}</div>
      <div className="mt-1 text-ink80">{children}</div>
    </div>
  );
}

function Why({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 font-serif text-2xl italic text-sienna">{num}</div>
      <h3 className="mb-2 font-serif text-xl">{title}</h3>
      <p className="font-sans text-sm leading-relaxed text-ink80">{children}</p>
    </div>
  );
}
