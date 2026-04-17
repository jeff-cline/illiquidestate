import { NextResponse } from "next/server";
import { supabaseFromCookies } from "@/lib/supabase";

export async function POST() {
  const supabase = await supabaseFromCookies();
  await supabase.auth.signOut();
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://illiquidestate.com";
  return NextResponse.redirect(new URL("/admin/login", appUrl));
}
