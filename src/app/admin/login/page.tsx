"use client";

import * as React from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Logo } from "@/lib/brand";

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [mode, setMode] = React.useState<"magic" | "password">("magic");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(searchParams.error === "not-authorized" ? "Your email is not in the admin allow-list." : null);

  const client = React.useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  ), []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "magic") {
        const { error } = await client.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setSent(true);
      } else {
        const { error } = await client.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = "/admin";
      }
    } catch (err: any) {
      setError(err?.message ?? "Sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream px-6 py-16">
      <div className="mx-auto max-w-md">
        <div className="mb-10 flex justify-center">
          <Logo variant="stacked" className="h-24" />
        </div>
        <div className="border border-ink10 bg-white p-8">
          <div className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-sienna">Admin sign-in</div>
          <h1 className="mb-6 font-serif text-2xl">Illiquid Estate</h1>

          <div className="mb-4 flex gap-3 font-sans text-xs">
            <button
              onClick={() => setMode("magic")}
              className={`border px-3 py-1.5 transition ${mode === "magic" ? "border-ink bg-ink text-cream" : "border-ink20 text-ink60 hover:border-ink"}`}
            >
              Magic link (recommended)
            </button>
            <button
              onClick={() => setMode("password")}
              className={`border px-3 py-1.5 transition ${mode === "password" ? "border-ink bg-ink text-cream" : "border-ink20 text-ink60 hover:border-ink"}`}
            >
              Password
            </button>
          </div>

          {sent ? (
            <div className="rounded-sm bg-ok/10 p-4 text-sm text-ok">
              Check your email. Click the link to sign in.
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-1 block font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink60">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  className="w-full border-b border-ink20 bg-transparent py-2 font-serif text-base outline-none focus:border-ink"
                />
              </label>
              {mode === "password" && (
                <label className="block">
                  <span className="mb-1 block font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink60">Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border-b border-ink20 bg-transparent py-2 font-serif text-base outline-none focus:border-ink"
                  />
                </label>
              )}
              {error && <div className="rounded-sm bg-warn/10 p-3 text-xs text-warn">{error}</div>}
              <button
                type="submit"
                disabled={busy}
                className="w-full bg-ink px-6 py-3 font-serif text-base text-cream transition hover:bg-ink80 disabled:opacity-60"
              >
                {busy ? "Sending…" : mode === "magic" ? "Send magic link" : "Sign in"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center font-sans text-xs text-ink40">
          Only emails in the admin allow-list can access the dashboard.
        </p>
      </div>
    </div>
  );
}
