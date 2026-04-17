import * as React from "react";
import "./globals.css";
import { compliance, contact, copyrightLine } from "@/lib/brand";
import { ComplianceFooter, PrelaunchBanner } from "@/lib/ui";

export const metadata = {
  title: "Illiquid Estate — Premium financing for $10M+ families",
  description:
    "A modern UHNW premium-financing firm. We show our math, name our advisors, and treat compliance as visible integrity.",
  metadataBase: new URL("https://illiquidestate.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const preLaunch = process.env.NEXT_PUBLIC_PRELAUNCH === "true";
  return (
    <html lang="en">
      <body className="bg-cream text-ink antialiased">
        <PrelaunchBanner show={preLaunch} />
        {children}
        <ComplianceFooter contact={contact} compliance={compliance} copyright={copyrightLine()} />
      </body>
    </html>
  );
}
