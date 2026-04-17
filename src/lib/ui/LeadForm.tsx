"use client";

import * as React from "react";
import { CtaButton } from "./CtaButton";

type LeadFormProps = {
  hookId: string;
  /** Absolute URL to the lead API endpoint on the master site. */
  leadApiUrl: string;
  ctaLabel: string;
  successTitle?: string;
  successBody?: string;
  accentColor?: string;
  /** After-lead deliverable name (e.g. "playbook", "audit checklist"). */
  deliverableLabel: string;
};

export function LeadForm({
  hookId,
  leadApiUrl,
  ctaLabel,
  successTitle = "Check your inbox.",
  successBody,
  accentColor = "#7a3b21",
  deliverableLabel,
}: LeadFormProps) {
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(leadApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hookId,
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          netWorthRange: data.get("netWorthRange"),
          stateCode: data.get("stateCode"),
          source: typeof window !== "undefined" ? window.location.hostname : null,
          referrer: typeof document !== "undefined" ? document.referrer : null,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setDone(true);
    } catch (err) {
      setError("Something went wrong. Please try again or email jeff.cline@me.com.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-sm border border-ink20 bg-cream p-8">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: accentColor }}>
          Confirmed
        </div>
        <h3 className="mb-3 font-serif text-2xl">{successTitle}</h3>
        <p className="font-sans text-sm leading-relaxed text-ink80">
          {successBody || `Your ${deliverableLabel} is on its way to your inbox. If you don't see it within 5 minutes, check spam or email jeff.cline@me.com directly.`}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field name="firstName" label="First name" required />
        <Field name="lastName" label="Last name" required />
      </div>
      <Field name="email" label="Email" type="email" required />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field name="phone" label="Phone" type="tel" />
        <Select
          name="stateCode"
          label="State of residence"
          options={US_STATES}
          required
        />
      </div>
      <Select
        name="netWorthRange"
        label="Investable net worth"
        options={NW_RANGES}
        required
      />

      {error && (
        <div className="rounded-sm bg-warn/10 px-4 py-3 text-sm text-warn">{error}</div>
      )}

      <div className="flex items-center gap-4 pt-2">
        <CtaButton type="submit" disabled={submitting}>
          {submitting ? "Sending…" : ctaLabel}
        </CtaButton>
        <span className="text-xs text-ink40">
          We respond within one business day. Your information stays private.
        </span>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink60">
        {label} {required && <span className="text-sienna">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border-b border-ink20 bg-transparent py-2 font-serif text-base text-ink outline-none transition focus:border-ink"
      />
    </label>
  );
}

function Select({
  name,
  label,
  options,
  required,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink60">
        {label} {required && <span className="text-sienna">*</span>}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full border-b border-ink20 bg-transparent py-2 font-serif text-base text-ink outline-none transition focus:border-ink"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

const NW_RANGES: { value: string; label: string }[] = [
  { value: "under-10m", label: "Under $10M" },
  { value: "10-25m", label: "$10M – $25M" },
  { value: "25-50m", label: "$25M – $50M" },
  { value: "50-100m", label: "$50M – $100M" },
  { value: "100m-plus", label: "$100M+" },
];

const US_STATES: { value: string; label: string }[] = [
  ["AL", "Alabama"],["AK", "Alaska"],["AZ", "Arizona"],["AR", "Arkansas"],["CA", "California"],
  ["CO", "Colorado"],["CT", "Connecticut"],["DE", "Delaware"],["FL", "Florida"],["GA", "Georgia"],
  ["HI", "Hawaii"],["ID", "Idaho"],["IL", "Illinois"],["IN", "Indiana"],["IA", "Iowa"],
  ["KS", "Kansas"],["KY", "Kentucky"],["LA", "Louisiana"],["ME", "Maine"],["MD", "Maryland"],
  ["MA", "Massachusetts"],["MI", "Michigan"],["MN", "Minnesota"],["MS", "Mississippi"],["MO", "Missouri"],
  ["MT", "Montana"],["NE", "Nebraska"],["NV", "Nevada"],["NH", "New Hampshire"],["NJ", "New Jersey"],
  ["NM", "New Mexico"],["NY", "New York"],["NC", "North Carolina"],["ND", "North Dakota"],["OH", "Ohio"],
  ["OK", "Oklahoma"],["OR", "Oregon"],["PA", "Pennsylvania"],["RI", "Rhode Island"],["SC", "South Carolina"],
  ["SD", "South Dakota"],["TN", "Tennessee"],["TX", "Texas"],["UT", "Utah"],["VT", "Vermont"],
  ["VA", "Virginia"],["WA", "Washington"],["WV", "West Virginia"],["WI", "Wisconsin"],["WY", "Wyoming"],
  ["DC", "District of Columbia"],
].map(([value, label]) => ({ value, label }));
