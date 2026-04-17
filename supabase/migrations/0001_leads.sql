-- Illiquid Estate — core leads + admin schema
-- Runs on Supabase postgres. Apply via: npx supabase db push (or paste into SQL editor).

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- =====================================================
-- leads table — every hook funnel drops here
-- =====================================================
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- which hook funnel submitted the lead
  hook_id text not null check (hook_id in (
    'M1_silent_tax',
    'E1_post_exit',
    'O1_illiquid_estate',
    'X1_preipo_clock',
    'G1_family_office_audit',
    'C1_charitable_leak'
  )),

  -- contact
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  state_code text not null,

  -- qualification
  net_worth_range text not null check (net_worth_range in (
    'under-10m', '10-25m', '25-50m', '50-100m', '100m-plus'
  )),

  -- attribution
  source text,
  referrer text,

  -- lifecycle
  status text not null default 'new' check (status in (
    'new', 'contacted', 'qualified', 'closed_won', 'closed_lost'
  )),
  email_delivered_at timestamptz,
  notes text,

  -- compliance
  ip_hash text,
  user_agent text,
  consent_at timestamptz default now()
);

create index if not exists leads_hook_id_idx on public.leads (hook_id);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (lower(email));

-- =====================================================
-- audit_log — every admin action
-- =====================================================
create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  at timestamptz not null default now(),
  user_id uuid,
  user_email text,
  action text not null,
  target_type text,
  target_id text,
  details jsonb
);

create index if not exists audit_log_at_idx on public.audit_log (at desc);

-- =====================================================
-- Row Level Security
-- =====================================================
alter table public.leads enable row level security;
alter table public.audit_log enable row level security;

-- Public anon: NO direct access. All writes come from the master site's service-role key
-- via the /api/leads endpoint. All reads are admin-only.
drop policy if exists leads_service_only on public.leads;
create policy leads_service_only on public.leads
  for all
  using (false)
  with check (false);

-- Authenticated admin users can read and update leads
drop policy if exists leads_admin_read on public.leads;
create policy leads_admin_read on public.leads
  for select
  to authenticated
  using (
    exists (
      select 1 from auth.users
      where auth.users.id = auth.uid()
        and auth.users.email = any (string_to_array(current_setting('app.admin_emails', true), ','))
    )
  );

drop policy if exists leads_admin_update on public.leads;
create policy leads_admin_update on public.leads
  for update
  to authenticated
  using (
    exists (
      select 1 from auth.users
      where auth.users.id = auth.uid()
        and auth.users.email = any (string_to_array(current_setting('app.admin_emails', true), ','))
    )
  );

-- Audit log is append-only from the server
drop policy if exists audit_service_only on public.audit_log;
create policy audit_service_only on public.audit_log
  for all
  using (false)
  with check (false);

drop policy if exists audit_admin_read on public.audit_log;
create policy audit_admin_read on public.audit_log
  for select
  to authenticated
  using (
    exists (
      select 1 from auth.users
      where auth.users.id = auth.uid()
        and auth.users.email = any (string_to_array(current_setting('app.admin_emails', true), ','))
    )
  );

-- To configure admin emails in Supabase SQL editor:
-- alter database postgres set "app.admin_emails" = 'jeff.cline@me.com';
