import * as React from "react";
import { PrelaunchBanner } from "./PrelaunchBanner";
import { ComplianceFooter } from "./ComplianceFooter";

/**
 * Page shell used by every hook site + master silo pages.
 * Prelaunch banner top · content · compliance footer bottom.
 */
export function PageShell({
  children,
  hookId,
  header,
}: {
  children: React.ReactNode;
  hookId?: string;
  header?: React.ReactNode;
}) {
  return (
    <>
      <PrelaunchBanner />
      {header}
      <main>{children}</main>
      <ComplianceFooter hookId={hookId} />
    </>
  );
}
