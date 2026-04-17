import * as React from "react";
import { listLeads } from "@/lib/crm/server";
import { HOOK_META } from "@/lib/crm";

export default async function AdminHome() {
  const leads = await listLeads({ limit: 200 });

  const byHook = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.hookId] = (acc[l.hookId] ?? 0) + 1;
    return acc;
  }, {});
  const byNW = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.netWorthRange] = (acc[l.netWorthRange] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Total leads" value={leads.length} />
        <Stat label="New (24h)" value={leads.filter((l) => isRecent(l.createdAt, 24)).length} />
        <Stat label="New (7d)" value={leads.filter((l) => isRecent(l.createdAt, 24 * 7)).length} />
        <Stat label="$100M+" value={byNW["100m-plus"] ?? 0} />
      </div>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Panel title="Leads by hook">
          <ul className="space-y-2 font-sans text-sm">
            {Object.entries(HOOK_META).map(([id, meta]) => (
              <li key={id} className="flex justify-between border-b border-ink10 py-2">
                <span className="text-ink80">{meta.name}</span>
                <span className="font-mono text-ink">{byHook[id] ?? 0}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Leads by net worth">
          <ul className="space-y-2 font-sans text-sm">
            {[
              ["under-10m", "Under $10M"],
              ["10-25m", "$10M – $25M"],
              ["25-50m", "$25M – $50M"],
              ["50-100m", "$50M – $100M"],
              ["100m-plus", "$100M+"],
            ].map(([k, label]) => (
              <li key={k} className="flex justify-between border-b border-ink10 py-2">
                <span className="text-ink80">{label}</span>
                <span className="font-mono text-ink">{byNW[k] ?? 0}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Recent leads">
        <div className="overflow-x-auto">
          <table className="w-full font-sans text-sm">
            <thead>
              <tr className="border-b border-ink20">
                <Th>Created</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Hook</Th>
                <Th>NW</Th>
                <Th>State</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 50).map((l) => (
                <tr key={l.id} className="border-b border-ink10 hover:bg-creamDeep/40">
                  <Td><span className="text-ink60">{fmtDate(l.createdAt)}</span></Td>
                  <Td>{l.firstName} {l.lastName}</Td>
                  <Td><a href={`mailto:${l.email}`} className="hover:text-sienna">{l.email}</a></Td>
                  <Td>{HOOK_META[l.hookId].name}</Td>
                  <Td>{l.netWorthRange}</Td>
                  <Td>{l.stateCode}</Td>
                  <Td>{l.status}</Td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr><Td colSpan={7}><span className="text-ink40">No leads yet. Ship the landing pages (after counsel review) and they'll populate here.</span></Td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="border-l-2 border-sienna bg-white p-4">
      <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-ink40">{label}</div>
      <div className="mt-1 font-serif text-3xl">{value}</div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-ink10 bg-white">
      <div className="border-b border-ink10 px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-ink60">{title}</div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="pb-2 pr-4 text-left font-semibold uppercase tracking-[0.1em] text-[10px] text-ink40">{children}</th>;
}
function Td({ children, colSpan }: { children: React.ReactNode; colSpan?: number }) {
  return <td colSpan={colSpan} className="py-3 pr-4 align-top">{children}</td>;
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  });
}
function isRecent(iso: string, hours: number): boolean {
  return Date.now() - new Date(iso).getTime() < hours * 3600 * 1000;
}
