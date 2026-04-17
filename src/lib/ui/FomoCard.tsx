import * as React from "react";

type FomoCardProps = {
  label?: string;
  children: React.ReactNode;
  accentColor?: string;
};

export function FomoCard({
  label = "Why it matters now",
  children,
  accentColor = "#7a3b21",
}: FomoCardProps) {
  return (
    <div
      className="border-l-[3px] bg-cream/60 px-5 py-4 font-sans text-sm leading-relaxed text-ink80"
      style={{ borderLeftColor: accentColor }}
    >
      <div
        className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em]"
        style={{ color: accentColor }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}
