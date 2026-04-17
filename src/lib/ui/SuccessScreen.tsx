import * as React from "react";

/**
 * Standalone success screen — optional; mostly LeadForm handles its own success state.
 * Keep for post-submit landing routes (e.g., /thank-you) if desired.
 */
export function SuccessScreen({
  title,
  body,
  deliverableUrl,
}: {
  title: string;
  body: React.ReactNode;
  deliverableUrl?: string;
}) {
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-10 py-24 text-center">
      <div className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-sienna mb-4">
        Submitted — thank you
      </div>
      <h1 className="font-serif text-4xl md:text-5xl text-ink mb-6 leading-tight">
        {title}
      </h1>
      <div className="text-ink-60 text-lg leading-relaxed mb-8">{body}</div>
      {deliverableUrl ? (
        <a
          href={deliverableUrl}
          className="inline-block bg-ink text-cream font-serif text-lg px-8 py-4 rounded-sm hover:bg-sienna transition"
        >
          Open your deliverable →
        </a>
      ) : null}
    </section>
  );
}
