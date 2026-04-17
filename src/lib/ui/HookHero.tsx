import * as React from "react";

/**
 * Hero block used at the top of every hook landing page and on the master
 * silo pages. Consistent typography, color system, and rhythm across all 6
 * sites.
 */
export function HookHero({
  kicker,
  siloBadge,
  headline,
  subline,
  accent = "sienna",
}: {
  kicker: string;
  siloBadge?: string;
  headline: React.ReactNode;
  subline: string;
  accent?: "sienna" | "sage" | "bronze" | "whitespaceTan" | "forestOk";
}) {
  const accentClass = {
    sienna: "text-sienna border-sienna",
    sage: "text-sage border-sage",
    bronze: "text-bronze border-bronze",
    whitespaceTan: "text-whitespaceTan border-whitespaceTan",
    forestOk: "text-forestOk border-forestOk",
  }[accent];

  return (
    <section className="bg-cream pt-16 pb-12 md:pt-24 md:pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`font-sans text-xs tracking-[0.2em] uppercase font-semibold ${accentClass.split(" ")[0]}`}
          >
            {kicker}
          </span>
          {siloBadge ? (
            <span
              className={`font-sans text-[10px] tracking-[0.15em] uppercase font-semibold px-2 py-0.5 rounded-sm bg-cream-2 ${accentClass.split(" ")[0]}`}
            >
              {siloBadge}
            </span>
          ) : null}
        </div>
        <div className={`h-1 w-16 mb-8 ${accentClass.split(" ")[1]} bg-current`} />
        <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight text-ink mb-6 max-w-4xl">
          {headline}
        </h1>
        <p className="font-serif italic text-xl md:text-2xl text-ink-60 leading-relaxed max-w-3xl">
          {subline}
        </p>
      </div>
    </section>
  );
}
