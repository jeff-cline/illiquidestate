-- ──────────────────────────────────────────────────────────────
-- Illiquid Estate — Supabase schema
-- Tables: leads, lead_events, admin_users
-- Auth: Supabase Auth handles admin login
-- RLS: public anon can INSERT leads only; admins read everything
-- ──────────────────────────────────────────────────────────────

create extension if not exists "uuid-ossp";

-- ─── LEADS ───────────────────────────────────────────────────────
create table if not exists public.leads (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Hook / archetype classification
  hook text not null check (hook in ('M1', 'E1', 'O1', 'X1', 'G1', 'C1')),
  archetype text not null check (archetype in ('entrepreneur','owner','executive','generational','charitable','unknown')),

  -- Contact
  email text not null,
  full_name text,

  -- Qualification
  net_worth_band text check (net_worth_band in ('10-25M','25-50M','50-100M','100M+')),
  state text,
  primary_concern text,

  -- Source / attribution
  source_domain text,
  source_path text,
  referrer text,
  utm jsonb default '{}'::jsonb,
  context jsonb default '{}'::jsonb,

  -- Lifecycle
  status text not null default 'new' check (status in ('new','contacted','qualified','disqualified','client','lost')),
  owner_user_id uuid references auth.users(id) on delete set null,

  -- Deliverable tracking
  deliverable_sent_at timestamptz,
  deliverable_url text
);

create index if not exists leads_hook_idx on public.leads (hook);
create index if not exists leads_archetype_idx on public.leads (archetype);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create unique index if not exists leads_email_hook_idx on public.leads (lower(email), hook);

-- ─── LEAD EVENTS (activity timeline) ─────────────────────────────
create table if not exists public.lead_events (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  created_at timestamptz not null default now(),
  actor_user_id uuid references auth.users(id) on delete set null,
  kind text not null,
  -- kinds: created, deliverable_sent, opened, replied, status_changed, note
  payload jsonb default '{}'::jsonb
);

create index if not exists lead_events_lead_idx on public.lead_events (lead_id, created_at desc);

-- ─── ADMIN USERS (extends auth.users with role metadata) ─────────
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  role text not null default 'admin' check (role in ('admin','viewer','owner')),
  created_at timestamptz not null default now()
);

-- ─── RLS POLICIES ────────────────────────────────────────────────
alter table public.leads enable row level security;
alter table public.lead_events enable row level security;
alter table public.admin_users enable row level security;

-- Anon (from hook sites) can INSERT leads only
drop policy if exists "anon_insert_leads" on public.leads;
create policy "anon_insert_leads" on public.leads
  for insert to anon
  with check (true);

-- Authenticated admins can read/update leads
drop policy if exists "admin_read_leads" on public.leads;
create policy "admin_read_leads" on public.leads
  for select to authenticated
  using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

drop policy if exists "admin_update_leads" on public.leads;
create policy "admin_update_leads" on public.leads
  for update to authenticated
  using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

-- Admins can read/insert events
drop policy if exists "admin_read_events" on public.lead_events;
create policy "admin_read_events" on public.lead_events
  for select to authenticated
  using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

drop policy if exists "admin_insert_events" on public.lead_events;
create policy "admin_insert_events" on public.lead_events
  for insert to authenticated
  with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

-- Admin users table self-readable
drop policy if exists "admin_read_self" on public.admin_users;
create policy "admin_read_self" on public.admin_users
  for select to authenticated
  using (user_id = auth.uid());

-- ─── Updated-at trigger ──────────────────────────────────────────
create or replace function public.tg_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end
$$ language plpgsql;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.tg_set_updated_at();

-- ─── Event logger trigger on lead insert ─────────────────────────
create or replace function public.tg_log_lead_created()
returns trigger as $$
begin
  insert into public.lead_events (lead_id, kind, payload)
  values (new.id, 'created', jsonb_build_object('hook', new.hook, 'archetype', new.archetype));
  return new;
end
$$ language plpgsql;

drop trigger if exists leads_log_created on public.leads;
create trigger leads_log_created
  after insert on public.leads
  for each row execute function public.tg_log_lead_created();
