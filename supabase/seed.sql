-- Seed the admin user after creating the Supabase Auth user for jeff.cline@me.com.
-- Run this AFTER you've signed up / been invited in the Supabase Auth dashboard.

insert into public.admin_users (user_id, email, display_name, role)
select id, email, 'Jeff Cline', 'owner'
from auth.users
where email = 'jeff.cline@me.com'
on conflict (user_id) do update set role = excluded.role;
