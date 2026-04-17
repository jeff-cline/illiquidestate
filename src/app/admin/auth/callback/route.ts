import { NextRequest, NextResponse } from "next/server";
import { supabaseFromCookies } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (code) {
    const sb = await supabaseFromCookies();
    await sb.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(new URL("/admin", req.url));
}
