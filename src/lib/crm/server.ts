// Server-only Supabase helpers.
// DO NOT import from client components. The service-role key lives in env vars on the master
// only — no hook site should ever import this module.

import { createClient } from "@supabase/supabase-js";
import type { Lead, LeadInput } from "./index";

function env(name: string): string {
  const raw = process.env[name] ?? "";
  const cleaned = raw.replace(/\s+#.*$/, "").trim();
  if (!cleaned || cleaned.includes("YOUR_PROJECT_REF")) {
    throw new Error(`Missing required env var ${name}`);
  }
  return cleaned;
}

function serverClient() {
  return createClient(env("SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { persistSession: false },
  });
}

export async function insertLead(input: LeadInput): Promise<Lead> {
  const client = serverClient();
  const { data, error } = await client
    .from("leads")
    .insert({
      hook_id: input.hookId,
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      phone: input.phone ?? null,
      net_worth_range: input.netWorthRange,
      state_code: input.stateCode,
      source: input.source ?? null,
      referrer: input.referrer ?? null,
      status: "new",
    })
    .select("*")
    .single();
  if (error) throw error;
  return rowToLead(data);
}

export async function listLeads(opts: { limit?: number; hookId?: string } = {}): Promise<Lead[]> {
  const client = serverClient();
  let q = client.from("leads").select("*").order("created_at", { ascending: false }).limit(opts.limit ?? 100);
  if (opts.hookId) q = q.eq("hook_id", opts.hookId);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []).map(rowToLead);
}

export async function markEmailDelivered(leadId: string): Promise<void> {
  const client = serverClient();
  const { error } = await client
    .from("leads")
    .update({ email_delivered_at: new Date().toISOString() })
    .eq("id", leadId);
  if (error) throw error;
}

function rowToLead(r: Record<string, unknown>): Lead {
  return {
    id: String(r.id),
    createdAt: String(r.created_at),
    hookId: r.hook_id as Lead["hookId"],
    firstName: String(r.first_name),
    lastName: String(r.last_name),
    email: String(r.email),
    phone: r.phone == null ? null : String(r.phone),
    netWorthRange: r.net_worth_range as Lead["netWorthRange"],
    stateCode: String(r.state_code),
    source: r.source == null ? null : String(r.source),
    referrer: r.referrer == null ? null : String(r.referrer),
    status: r.status as Lead["status"],
    emailDeliveredAt: r.email_delivered_at == null ? null : String(r.email_delivered_at),
    notes: r.notes == null ? null : String(r.notes),
  };
}
