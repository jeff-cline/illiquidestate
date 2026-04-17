import * as React from "react";
import Link from "next/link";
import { Hero, FomoCard, CtaButton } from "@/lib/ui";
import { colors, silos } from "@/lib/brand";
import { Logo } from "@/lib/brand";

export default function HomePage() {
  return (
    <>
      <TopNav />
      <Hero
        kicker="Illiquid Estate"
        headline={
          <>
            Your estate looks great on paper.
            <br />
            <em className="italic text-sienna">The IRS will want cash.</em>
          </>
        }
        subline="A modern UHNW firm for the illiquid estate problem — with the five archetypes this category actually serves, not one monolithic pitch."
      />

      <section className="mx-auto max-w-5xl px-6 pb-16 md:px-12">
        <FomoCard>
          The 2026 federal estate-tax exemption is legislated to revert to roughly half its current level on January 1, 2026. Families at $10M+ have an approximately 20-month window to restructure gifts, trusts, and life-insurance coverage before the exemption contracts — and closely-held owners have a specific, documented liquidity problem on top of it.
        </FomoCard>
      </section>

      <section id="silos" className="mx-auto max-w-6xl px-6 pb-24 md:px-12">
        <div className="mb-10">
          <div className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-sienna">Find your archetype</div>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl">Five silos. One answer.</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(silos).map((silo) => (
            <SiloCard key={silo.id} silo={silo} />
          ))}
        </div>
      </section>

      <section className="bg-creamDeep/50 px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <div className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-sienna">Methodology</div>
            <h2 className="mb-4 font-serif text-3xl md:text-4xl">Show the math. Name the advisors. Disclose the compensation.</h2>
            <p className="font-serif text-lg leading-relaxed text-ink80">
              We publish our methodology openly — illustration framework, lender-spread math, recourse vs. non-recourse, when premium financing does not work. Compliance as visible integrity, not hidden boilerplate.
            </p>
          </div>
          <div className="space-y-4 font-sans text-sm text-ink80">
            <MethodItem title="Illustration methodology">
              How we frame guaranteed vs. non-guaranteed elements in every illustration, and what happens when assumptions don't hold.
            </MethodItem>
            <MethodItem title="Lender spread and recourse">
              Plain-English explanation of the interest-rate mechanics, collateral structure, and why our arrangements are strictly recourse.
            </MethodItem>
            <MethodItem title="When premium financing does not work">
              The honest list of cases where PF is the wrong answer — and what we recommend instead.
            </MethodItem>
            <MethodItem title="Compensation disclosure">
              Named advisors. Named carriers. Disclosed spread. No hidden loadings.
            </MethodItem>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-sienna">Start here</div>
          <h2 className="mb-6 font-serif text-4xl md:text-6xl">Before the IRS does.</h2>
          <p className="mx-auto mb-10 max-w-xl font-serif text-lg italic leading-relaxed text-ink60">
            A 3-minute estate-liquidity diagnostic. You get a personalized report and a private 45-minute review with a named advisor.
          </p>
          <Link href="/diagnostic">
            <CtaButton ariaLabel="Start the illiquid estate diagnostic">Start the diagnostic</CtaButton>
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
          <a href="#silos" className="hover:text-sienna">Archetypes</a>
          <a href="/methodology" className="hover:text-sienna">Methodology</a>
          <a href="/advisors" className="hover:text-sienna">Advisors</a>
          <a href="/disclosures" className="hover:text-sienna">Disclosures</a>
          <Link href="/diagnostic" className="rounded-sm border border-ink px-4 py-1.5 transition hover:bg-ink hover:text-cream">
            Diagnostic
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiloCard({ silo }: { silo: (typeof silos)[keyof typeof silos] }) {
  const href = silo.id === "owner" ? "/owner" : `/${silo.id}`;
  return (
    <Link
      href={href}
      className="group relative block border border-ink10 bg-cream p-6 transition hover:border-ink"
    >
      <div className="mb-3 h-[2px] w-10" style={{ background: silo.accent }} />
      <div
        className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: silo.accent }}
      >
        {silo.label}
      </div>
      <h3 className="mb-3 font-serif text-2xl leading-tight">{silo.title}</h3>
      <p className="font-serif text-base italic leading-relaxed text-ink60">"{silo.one}"</p>
      <div className="mt-5 font-sans text-sm text-ink40 transition group-hover:text-sienna">
        Read the silo →
      </div>
    </Link>
  );
}

function MethodItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-ink20 pl-4">
      <div className="mb-1 font-sans text-sm font-semibold text-ink">{title}</div>
      <p className="font-serif text-sm italic leading-relaxed text-ink60">{children}</p>
    </div>
  );
}
