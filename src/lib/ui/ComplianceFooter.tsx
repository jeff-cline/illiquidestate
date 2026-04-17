import * as React from "react";

type ComplianceFooterProps = {
  contact: { legalName: string; phone: string; email: string; address: { street: string; city: string; state: string; zip: string } };
  compliance: {
    footer: string;
    pfRisk: string;
    mec: string;
    fdic: string;
    educational: string;
    disclosuresUrl: string;
    licensingUrl: string;
    privacyUrl: string;
    termsUrl: string;
  };
  copyright: string;
};

export function ComplianceFooter({ contact, compliance, copyright }: ComplianceFooterProps) {
  return (
    <footer className="mt-24 border-t border-ink20 bg-creamDeep/40 px-6 pt-12 pb-10 md:px-12">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-2 font-serif text-lg">Illiquid Estate</div>
            <address className="not-italic font-sans text-xs leading-relaxed text-ink60">
              {contact.address.street}<br />
              {contact.address.city}, {contact.address.state} {contact.address.zip}<br />
              <a href={`tel:${contact.phone.replace(/\D/g, "")}`} className="hover:text-sienna">{contact.phone}</a><br />
              <a href={`mailto:${contact.email}`} className="hover:text-sienna">{contact.email}</a>
            </address>
          </div>
          <FooterCol label="For clients">
            <a href="/#silos">Find your archetype</a>
            <a href="/methodology">Methodology</a>
            <a href="/disclosures">Disclosures</a>
          </FooterCol>
          <FooterCol label="For advisors">
            <a href="/advisors">Advisor partners</a>
            <a href="/methodology">Methodology</a>
            <a href={compliance.licensingUrl}>Licensing</a>
          </FooterCol>
          <FooterCol label="Legal">
            <a href={compliance.privacyUrl}>Privacy</a>
            <a href={compliance.termsUrl}>Terms</a>
            <a href={compliance.disclosuresUrl}>Full disclosures</a>
          </FooterCol>
        </div>

        <div className="border-t border-ink20 pt-6 font-sans text-[10.5px] leading-relaxed text-ink60 space-y-2">
          <p><strong className="text-ink">Advertisement.</strong> {compliance.educational}</p>
          <p>{compliance.pfRisk}</p>
          <p>{compliance.mec}</p>
          <p>{compliance.footer}</p>
          <p className="font-semibold text-ink">{compliance.fdic}</p>
          <p className="pt-2 text-ink40">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ink40">{label}</div>
      <nav className="flex flex-col gap-1.5 font-serif text-sm text-ink80 [&>a]:hover:text-sienna [&>a]:transition">
        {children}
      </nav>
    </div>
  );
}
