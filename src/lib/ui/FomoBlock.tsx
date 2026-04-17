import * as React from "react";

/**
 * "Why it matters now" block — the FOMO lever. Consistent visual treatment
 * across all hook pages. Shows a short, specific, evidence-backed urgency
 * statement pulled from the hook memo.
 */
export function FomoBlock({
  body,
  accent = "sienna",
}: {
  body: React.ReactNode;
  accent?: "sienna" | "sage" | "bronze" | "whitespaceTan" | "forestOk";
}) {
  const borderClass = {
    sienna: "border-sienna",
    sage: "border-sage",
    bronze: "border-bronze",
    whitespaceTan: "border-whitespaceTan",
    forestOk: "border-forestOk",
  }[accent];
  const textClass = {
    sienna: "text-sienna",
    sage: "text-sage",
    bronze: "text-bronze",
    whitespaceTan: "text-whitespaceTan",
    forestOk: "text-forestOk",
  }[accent];
  return (
    <div className={`border-l-4 ${borderClass} pl-6 py-2 max-w-3xl`}>
      <div
        className={`font-sans text-[11px] tracking-[0.2em] uppercase font-bold mb-2 ${textClass}`}
      >
        Why it matters now
      </div>
      <p className="font-serif text-base md:text-lg text-ink-60 leading-relaxed">
        {body}
      </p>
    </div>
  );
}
