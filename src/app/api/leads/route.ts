import { NextResponse } from "next/server";
import { insertLead, markEmailDelivered } from "@/lib/crm/server";
import { HOOK_META, ALLOWED_ORIGINS, type LeadInput } from "@/lib/crm";
import { sendPlaybookEmail } from "@/lib/email";

const ALLOWED = new Set(ALLOWED_ORIGINS);

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": ALLOWED.has(origin) ? origin : "",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  if (!ALLOWED.has(origin) && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
  }

  let body: LeadInput;
  try {
    body = (await req.json()) as LeadInput;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validation = validate(body);
  if (validation) {
    return NextResponse.json({ error: validation }, { status: 400 });
  }

  const lead = await insertLead(body);

  try {
    const meta = HOOK_META[body.hookId];
    await sendPlaybookEmail({
      to: body.email,
      firstName: body.firstName,
      playbookName: meta.playbook,
      hookId: body.hookId,
      leadId: lead.id,
    });
    await markEmailDelivered(lead.id);
  } catch (err) {
    console.error("Email delivery failed", err);
  }

  return NextResponse.json(
    { ok: true, leadId: lead.id },
    {
      headers: ALLOWED.has(origin)
        ? { "Access-Control-Allow-Origin": origin }
        : {},
    }
  );
}

function validate(b: Partial<LeadInput>): string | null {
  if (!b.hookId || !HOOK_META[b.hookId as keyof typeof HOOK_META]) return "hookId invalid";
  if (!b.firstName || typeof b.firstName !== "string") return "firstName required";
  if (!b.lastName || typeof b.lastName !== "string") return "lastName required";
  if (!b.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)) return "valid email required";
  if (!b.netWorthRange) return "netWorthRange required";
  if (!b.stateCode || !/^[A-Z]{2}$/.test(b.stateCode)) return "stateCode required (2-letter)";
  return null;
}
