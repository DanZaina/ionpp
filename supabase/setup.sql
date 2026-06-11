-- ============================================================
-- ION Print + Promo — Client Portal
-- Adapts your existing schema for Supabase Auth + multi-file uploads.
-- Run this in the Supabase SQL Editor (once).
-- ============================================================


-- ── 1. Link client_users to Supabase Auth ───────────────────
-- Auth handles passwords; password_hash stays but won't be used.

alter table client_users
  add column if not exists auth_user_id uuid unique references auth.users(id) on delete cascade;

-- Automatically create a client_users profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.client_users (auth_user_id, email, role, is_active)
  values (new.id, new.email, 'client', true)
  on conflict (auth_user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ── 2. Add artwork_request_id to uploads (multi-file support) ─

alter table uploads
  add column if not exists artwork_request_id uuid references artwork_requests(id) on delete cascade;

-- Add user_id to artwork_requests so RLS can filter by owner
alter table artwork_requests
  add column if not exists user_id uuid references auth.users(id) on delete cascade;


-- ── 3. Storage Bucket ─────────────────────────────────────────

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'artwork',
  'artwork',
  false,              -- private
  107374182400,       -- 100 GB in bytes
  null                -- all MIME types accepted
)
on conflict (id) do nothing;


-- ── 4. Row Level Security ──────────────────────────────────────

-- client_users: users can read/update their own profile
alter table client_users enable row level security;

create policy "client_users: own row"
  on client_users for all
  using  (auth_user_id = auth.uid())
  with check (auth_user_id = auth.uid());

-- artwork_requests: clients see only their own jobs
alter table artwork_requests enable row level security;

create policy "artwork_requests: own rows"
  on artwork_requests for all
  using  (user_id = auth.uid())
  with check (user_id = auth.uid());

-- uploads: portal_user_id stores auth uid as text
alter table uploads enable row level security;

create policy "uploads: own rows"
  on uploads for all
  using  (portal_user_id = auth.uid()::text)
  with check (portal_user_id = auth.uid()::text);

-- Storage: clients read/write only inside their own uid folder
create policy "artwork: insert own folder"
  on storage.objects for insert
  with check (
    bucket_id = 'artwork'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "artwork: select own folder"
  on storage.objects for select
  using (
    bucket_id = 'artwork'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "artwork: delete own folder"
  on storage.objects for delete
  using (
    bucket_id = 'artwork'
    and auth.uid()::text = (storage.foldername(name))[1]
  );


-- ── 5. Disable email confirmation (optional but recommended for easier setup)
-- Do this in the Supabase dashboard instead:
--   Authentication → Email → uncheck "Confirm email"
-- You can re-enable it later once you've configured an SMTP provider.
