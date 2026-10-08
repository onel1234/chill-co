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
  loyalty_tier text default null,
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
-- Affiliate points (5 pts) are awarded only after the user's first purchase, not at signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  -- Create profile
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

-- ============================================================
-- 8. DISCOUNT COUPONS TABLE
-- Stores generated coupon codes when users redeem loyalty points
-- ============================================================
create table if not exists public.discount_coupons (
  id uuid default gen_random_uuid() primary key,
  code text unique not null,
  user_id uuid references public.profiles on delete cascade not null,
  discount_percentage numeric not null,
  tier_name text not null,
  is_used boolean default false,
  created_at timestamptz default now(),
  expires_at timestamptz
);

-- Enable RLS
alter table public.discount_coupons enable row level security;

-- Users can view their own coupons
create policy "Users can view their own coupons"
  on public.discount_coupons for select
  using (auth.uid() = user_id);

-- Users can insert their own coupons (via API)
create policy "Users can insert their own coupons"
  on public.discount_coupons for insert
  with check (auth.uid() = user_id);

-- Users can update their own coupons (to mark as used)
create policy "Users can update their own coupons"
  on public.discount_coupons for update
  using (auth.uid() = user_id);

-- Anyone can select coupons for validation at checkout (needed for guest validation)
-- Restricted to only checking code+is_used, not exposing user_id etc.
-- We handle this securely in the API route instead with service role.


-- ============================================================
-- 9. AFFILIATE SETTINGS TABLE
-- Single-row config for customizable affiliate rewards
-- ============================================================
create table if not exists public.affiliate_settings (
  id uuid default gen_random_uuid() primary key,
  points_per_referral integer not null default 5,
  max_codes_per_user integer not null default 3,
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.affiliate_settings enable row level security;

-- Anyone can read settings (needed for display)
create policy "Anyone can view affiliate settings"
  on public.affiliate_settings for select
  using (true);

-- Seed default settings row (5 points per unique referred user's first purchase)
insert into public.affiliate_settings (points_per_referral, max_codes_per_user)
values (5, 3)
on conflict do nothing;

update public.affiliate_settings set points_per_referral = 5;


-- ============================================================
-- 10. AFFILIATE CODES TABLE
-- User-created referral codes
-- ============================================================
create table if not exists public.affiliate_codes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  code text unique not null,
  is_active boolean default true,
  total_referrals integer default 0,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.affiliate_codes enable row level security;

-- Users can view their own codes
create policy "Users can view their own affiliate codes"
  on public.affiliate_codes for select
  using (auth.uid() = user_id);

-- Users can insert their own codes
create policy "Users can insert their own affiliate codes"
  on public.affiliate_codes for insert
  with check (auth.uid() = user_id);

-- Users can update their own codes (toggle active)
create policy "Users can update their own affiliate codes"
  on public.affiliate_codes for update
  using (auth.uid() = user_id);

-- Anyone can validate codes (needed during signup, read-only)
create policy "Anyone can validate affiliate codes"
  on public.affiliate_codes for select
  using (true);


-- ============================================================
-- 11. AFFILIATE REFERRALS TABLE
-- Audit log of successful referrals (unique per referred_user_id)
-- ============================================================
create table if not exists public.affiliate_referrals (
  id uuid default gen_random_uuid() primary key,
  affiliate_user_id uuid references public.profiles on delete cascade not null,
  referred_user_id uuid references public.profiles on delete cascade not null unique,
  code_used text not null,
  points_awarded integer not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.affiliate_referrals enable row level security;

-- Users can view referrals where they are the affiliate or the referred user
create policy "Users can view their own referrals"
  on public.affiliate_referrals for select
  using (auth.uid() = affiliate_user_id or auth.uid() = referred_user_id);

-- Insert handled by process_affiliate_referral (security definer), not by users directly


-- ============================================================
-- 12. AFFILIATE REFERRAL RPC FUNCTION
-- Awards 5 points to the affiliate owner upon the referred user's FIRST purchase
-- One-time deal per unique referred user
-- ============================================================
create or replace function public.process_affiliate_referral(
  p_affiliate_user_id uuid,
  p_referred_user_id uuid,
  p_code text,
  p_points integer default 5
)
returns void
language plpgsql
security definer set search_path = ''
as $$
begin
  -- Enforce one-time reward per unique referred user and prevent self-referral
  if p_affiliate_user_id = p_referred_user_id then
    return;
  end if;

  if exists (
    select 1 from public.affiliate_referrals
    where referred_user_id = p_referred_user_id
  ) then
    return;
  end if;

  -- Record the referral first (referred_user_id is UNIQUE)
  insert into public.affiliate_referrals
    (affiliate_user_id, referred_user_id, code_used, points_awarded)
  values
    (p_affiliate_user_id, p_referred_user_id, upper(p_code), coalesce(p_points, 5));

  -- Award points to affiliate owner
  update public.profiles
  set loyalty_points = loyalty_points + coalesce(p_points, 5)
  where id = p_affiliate_user_id;

  -- Increment code counter
  update public.affiliate_codes
  set total_referrals = total_referrals + 1
  where code = upper(p_code);
end;
$$;

-- Add payment columns to orders table
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS payment_transaction_id text,
ADD COLUMN IF NOT EXISTS payment_method text;
