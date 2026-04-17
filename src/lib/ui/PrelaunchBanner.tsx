import * as React from "react";

/**
 * Pre-launch banner — shown on every page until counsel review is confirmed.
 * Controlled via the NEXT_PUBLIC_PRELAUNCH env var at build time.
 */
export function PrelaunchBanner({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="bg-ink px-4 py-2 text-center font-sans text-xs tracking-wide text-cream">
      <span className="mr-2 rounded-sm bg-sienna px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Pre-launch</span>
      This site is in staging. Copy is pending counsel review; no advertising is being served.
    </div>
  );
}
