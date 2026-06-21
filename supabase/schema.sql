-- ============================================================
-- Chill Co. Supabase Schema
-- Run this in your Supabase SQL Editor (Database > SQL Editor)
-- ============================================================

-- ============================================================
-- 1. PROFILES TABLE
-- Extends auth.users with app-specific data
-- ============================================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  is_admin boolean default false,
  loyalty_points integer default 0,
  is_loyalty_member boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

create policy "Admins can update all profiles"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

-- ============================================================
-- 2. CART ITEMS TABLE
-- Persistent cart per user
-- ============================================================
create table if not exists public.cart_items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  product_id text not null,
  name text not null,
  price numeric not null,
  image text not null,
  color text not null,
  size text not null,
  quantity integer not null default 1,
  created_at timestamptz default now(),
  unique(user_id, product_id, color, size)
);

-- Enable RLS
alter table public.cart_items enable row level security;

-- Policies
create policy "Users can view their own cart"
  on public.cart_items for select
  using (auth.uid() = user_id);

create policy "Users can insert their own cart items"
  on public.cart_items for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own cart items"
  on public.cart_items for update
  using (auth.uid() = user_id);

create policy "Users can delete their own cart items"
  on public.cart_items for delete
  using (auth.uid() = user_id);

-- ============================================================
-- 3. ORDERS TABLE
-- ============================================================
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  status text default 'confirmed',
  subtotal numeric not null,
  shipping numeric not null default 0,
  total numeric not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.orders enable row level security;

-- Policies
create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can insert their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- ============================================================
-- 4. ORDER ITEMS TABLE
-- ============================================================
create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders on delete cascade not null,
  product_id text not null,
  name text not null,
  price numeric not null,
  image text not null,
  color text not null,
  size text not null,
  quantity integer not null
);

-- Enable RLS
alter table public.order_items enable row level security;

-- Policies (users access via orders join)
create policy "Users can view their own order items"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

create policy "Users can insert their own order items"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- ============================================================
-- 5. AUTO-CREATE PROFILE ON SIGN UP
-- Trigger fires after a new user is inserted into auth.users
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

-- Create trigger
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- 6. UPDATE PROFILE ON EMAIL CHANGE
-- ============================================================
create or replace function public.handle_user_update()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  update public.profiles
  set
    email = new.email,
    full_name = coalesce(new.raw_user_meta_data ->> 'full_name', public.profiles.full_name),
    avatar_url = coalesce(new.raw_user_meta_data ->> 'avatar_url', public.profiles.avatar_url),
    updated_at = now()
  where id = new.id;
  return new;
end;
$$;

create or replace trigger on_auth_user_updated
  after update on auth.users
  for each row execute procedure public.handle_user_update();

-- ============================================================
-- 7. LOYALTY TIERS TABLE
-- ============================================================
create table if not exists public.loyalty_tiers (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  required_points integer not null,
  discount_percentage numeric not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.loyalty_tiers enable row level security;

-- Policies
-- Anyone can view tiers (needed for checkout/account logic)
create policy "Anyone can view loyalty tiers"
  on public.loyalty_tiers for select
  using (true);

-- Only admins can insert/update/delete tiers (handled via service role in API, or we can add RLS if needed, but for now service role overrides RLS so it's fine).

