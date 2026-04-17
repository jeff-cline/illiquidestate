# illiquidestate

**Domain:** `illiquidestate.com`

**Part of:** [Illiquid Estate](https://illiquidestate.com) — a marketing wheel of 6 sites (1 master + 5 hook funnels) serving UHNW premium-financing advisory.

**Owner:** Jeff Cline · CEO · Illiquid Estate · 5 Cowboys Way, Frisco TX 75034 · 972-800-6670 · jeff.cline@me.com

**Stack:** Next.js 14 · TypeScript · Tailwind CSS


## Master site responsibilities

- Home page + 5 archetype silo pages
- `/admin` — lead management dashboard (Supabase Auth, email allow-list)
- `/api/leads` — lead intake for all 6 sites (CORS-allowlisted)
- Resend email delivery for playbook / audit deliverables
- Supabase database and Row-Level Security policies

## Setup

```bash
pnpm install  # or npm install
cp .env.example .env.local
# Fill in Supabase and Resend values in .env.local
pnpm dev      # http://localhost:3000
```

## Supabase

1. Create a project at supabase.com
2. In the SQL editor, paste and run `supabase/migrations/0001_leads.sql`
3. Set the admin-email setting:
   ```sql
   alter database postgres set "app.admin_emails" = 'jeff.cline@me.com';
   ```
4. Auth → Providers → enable Email (magic link)
5. Auth → URL Configuration:
   - Site URL: `https://illiquidestate.com`
   - Redirect URLs: `https://illiquidestate.com/admin`, `http://localhost:3000/admin`

## Resend

1. Create a Resend account
2. Add and verify `illiquidestate.com` sending domain (SPF + DKIM + DMARC per Resend)
3. Generate API key → `RESEND_API_KEY`

## Pre-launch gate

`NEXT_PUBLIC_PRELAUNCH=true` shows a banner on every page until counsel has signed off on the social graphics submission AND every landing page of all 6 sites. Flip to `false` only after sign-off.
