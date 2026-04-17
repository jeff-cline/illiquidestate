import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { supabaseFromCookies, supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sb = await supabaseFromCookies();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) redirect("/admin/login");

  const admin = supabaseAdmin();
  const { data: lead } = await admin
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();
  if (!lead) notFound();

  const { data: events = [] } = await admin
    .from("lead_events")
    .select("*")
    .eq("lead_id", id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-cream">
      <header className="border-b border-ink-20 bg-cream-2">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/admin" className="text-sienna hover:text-ink text-sm">
            ← All leads
          </Link>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <div className="font-sans text-xs tracking-wider uppercase text-ink-60 mb-2">
              Lead · {lead.hook} · {lead.archetype}
            </div>
            <h1 className="font-serif text-3xl text-ink mb-2">
              {lead.full_name || lead.email}
            </h1>
            <p className="text-ink-60">
              <a href={`mailto:${lead.email}`} className="underline">
                {lead.email}
              </a>
            </p>
          </div>

          <div className="bg-cream-2 border border-ink-20 rounded-sm p-5">
            <h2 className="font-sans text-xs tracking-wider uppercase text-ink-60 mb-4">
              Qualification
            </h2>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <Row label="Net worth" value={lead.net_worth_band} />
              <Row label="State" value={lead.state} />
              <Row label="Source domain" value={lead.source_domain} />
              <Row label="Source path" value={lead.source_path} />
              <Row label="Referrer" value={lead.referrer} />
              <Row label="Status" value={lead.status} />
            </dl>
            {lead.primary_concern ? (
              <div className="mt-4 pt-4 border-t border-ink-20">
                <div className="font-sans text-xs uppercase text-ink-60 mb-1">
                  Primary concern
                </div>
                <p className="text-sm text-ink">{lead.primary_concern}</p>
              </div>
            ) : null}
          </div>

          <div>
            <h2 className="font-sans text-xs tracking-wider uppercase text-ink-60 mb-3">
              Activity
            </h2>
            <ul className="space-y-3">
              {(events || []).map((e) => (
                <li
                  key={e.id}
                  className="bg-cream-2 border border-ink-20 rounded-sm p-3 text-sm"
                >
                  <div className="text-xs text-ink-40 mb-1">
                    {new Date(e.created_at).toLocaleString()} · {e.kind}
                  </div>
                  <pre className="text-xs whitespace-pre-wrap text-ink-60">
                    {JSON.stringify(e.payload, null, 2)}
                  </pre>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-cream-2 border border-ink-20 rounded-sm p-5">
            <h3 className="font-sans text-xs tracking-wider uppercase text-ink-60 mb-3">
              Deliverable
            </h3>
            {lead.deliverable_sent_at ? (
              <>
                <p className="text-sm text-ink">
                  Sent {new Date(lead.deliverable_sent_at).toLocaleString()}
                </p>
                {lead.deliverable_url ? (
                  <a
                    href={lead.deliverable_url}
                    className="text-sienna underline text-sm"
                  >
                    Open playbook →
                  </a>
                ) : null}
              </>
            ) : (
              <p className="text-sm text-ink-60">Not yet sent.</p>
            )}
          </div>

          <form
            action={`/admin/leads/${lead.id}/status`}
            method="post"
            className="bg-cream-2 border border-ink-20 rounded-sm p-5 space-y-3"
          >
            <h3 className="font-sans text-xs tracking-wider uppercase text-ink-60">
              Update status
            </h3>
            <select
              name="status"
              defaultValue={lead.status}
              className="w-full border border-ink-20 bg-cream px-3 py-2 rounded-sm text-sm"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="disqualified">Disqualified</option>
              <option value="client">Client</option>
              <option value="lost">Lost</option>
            </select>
            <button className="w-full bg-ink text-cream text-sm py-2 rounded-sm hover:bg-sienna">
              Save
            </button>
          </form>
        </aside>
      </section>
    </main>
  );
}

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <dt className="font-sans text-[10px] tracking-wider uppercase text-ink-60">
        {label}
      </dt>
      <dd className="text-ink text-sm mt-1">{value || "—"}</dd>
    </div>
  );
}
