import * as React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const metadata = { title: "Admin · Illiquid Estate" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: () => {},
        remove: () => {},
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const adminEmails = (process.env.ADMIN_EMAILS ?? "").split(",").map((s) => s.trim().toLowerCase());
  const isAdmin = user && adminEmails.includes((user.email ?? "").toLowerCase());

  if (!user) redirect("/admin/login");
  if (!isAdmin) redirect("/admin/login?error=not-authorized");

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-ink10 bg-cream">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <div>
            <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-sienna">Illiquid Estate · Admin</div>
            <div className="font-serif text-lg">Lead management</div>
          </div>
          <nav className="flex items-center gap-6 font-sans text-sm">
            <Link href="/admin" className="hover:text-sienna">Leads</Link>
            <Link href="/admin/reports" className="hover:text-sienna">Reports</Link>
            <form action="/admin/signout" method="post">
              <button className="text-ink60 hover:text-sienna">Sign out</button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">{children}</main>
    </div>
  );
}
