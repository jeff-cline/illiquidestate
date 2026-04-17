import * as React from "react";

type HeroProps = {
  kicker?: string;
  archetypeLabel?: string;
  headline: React.ReactNode;
  subline?: string;
  accentColor?: string;
};

export function Hero({ kicker, archetypeLabel, headline, subline, accentColor = "#7a3b21" }: HeroProps) {
  return (
    <section className="relative px-6 pt-24 pb-16 md:px-12 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-5xl">
        {(kicker || archetypeLabel) && (
          <div className="mb-8 flex items-center gap-3">
            {kicker && (
              <span
                className="font-sans text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: accentColor }}
              >
                {kicker}
              </span>
            )}
            {archetypeLabel && (
              <span
                className="rounded-sm px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.15em]"
                style={{ background: `${accentColor}22`, color: accentColor }}
              >
                {archetypeLabel}
              </span>
            )}
          </div>
        )}
        <div className="mb-10 h-[3px] w-16" style={{ background: accentColor }} />
        <h1 className="mb-8 font-serif text-5xl leading-[1.05] tracking-tight text-ink md:text-7xl">
          {headline}
        </h1>
        {subline && (
          <p className="max-w-3xl font-serif text-xl italic leading-relaxed text-ink60 md:text-2xl">
            {subline}
          </p>
        )}
      </div>
    </section>
  );
}
