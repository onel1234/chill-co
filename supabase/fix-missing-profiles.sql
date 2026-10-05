-- ============================================================
-- FIX: Missing Profiles, Foreign Key (23503), & Order Creation
-- Run this in your Supabase SQL Editor (Database > SQL Editor)
-- ============================================================

-- 1. Ensure all auth.users have a corresponding profile in public.profiles
INSERT INTO public.profiles (id, email, full_name, avatar_url, is_loyalty_member)
SELECT
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data ->> 'full_name', au.raw_user_meta_data ->> 'name'),
  COALESCE(au.raw_user_meta_data ->> 'avatar_url', au.raw_user_meta_data ->> 'picture'),
  true
FROM auth.users au
LEFT JOIN public.profiles p ON p.id = au.id
WHERE p.id IS NULL
ON CONFLICT (id) DO UPDATE
SET
  email = EXCLUDED.email,
  full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
  avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url);

-- 2. Allow users to insert their own profile via RLS (prevents missing profile blocks)
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 3. Make user_id nullable on orders (allows guest checkout without FK errors)
ALTER TABLE public.orders ALTER COLUMN user_id DROP NOT NULL;

-- 4. Update orders RLS policy so both members and guests can insert orders
DROP POLICY IF EXISTS "Users can insert their own orders" ON public.orders;
CREATE POLICY "Users can insert their own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- 5. Update order_items RLS policy to support orders created by members or guests
DROP POLICY IF EXISTS "Users can insert their own order items" ON public.order_items;
CREATE POLICY "Users can insert their own order items"
  ON public.order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND (orders.user_id = auth.uid() OR orders.user_id IS NULL)
    )
  );

-- 6. Enhance handle_new_user() trigger for all future OAuth (Google) & email signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_affiliate_code text;
  v_affiliate_user_id uuid;
  v_points integer;
  v_name text;
  v_avatar text;
BEGIN
  v_name := COALESCE(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name');
  v_avatar := COALESCE(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture');

  -- Create or update profile
  INSERT INTO public.profiles (id, email, full_name, avatar_url, is_loyalty_member)
  VALUES (
    new.id,
    new.email,
    v_name,
    v_avatar,
    true
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url);

  -- Process affiliate code if provided during signup
  v_affiliate_code := new.raw_user_meta_data ->> 'affiliate_code';
  IF v_affiliate_code IS NOT NULL AND v_affiliate_code != '' THEN
    SELECT user_id INTO v_affiliate_user_id
    FROM public.affiliate_codes
    WHERE code = UPPER(v_affiliate_code) AND is_active = true;

    IF v_affiliate_user_id IS NOT NULL AND v_affiliate_user_id != new.id THEN
      SELECT points_per_referral INTO v_points
      FROM public.affiliate_settings LIMIT 1;
      v_points := COALESCE(v_points, 50);

      UPDATE public.profiles
      SET loyalty_points = loyalty_points + v_points
      WHERE id = v_affiliate_user_id;

      INSERT INTO public.affiliate_referrals
        (affiliate_user_id, referred_user_id, code_used, points_awarded)
      VALUES
        (v_affiliate_user_id, new.id, UPPER(v_affiliate_code), v_points);

      UPDATE public.affiliate_codes
      SET total_referrals = total_referrals + 1
      WHERE code = UPPER(v_affiliate_code);
    END IF;
  END IF;

  RETURN new;
END;
$$;

-- 7. Update SELECT policy on orders so users can view their orders by user_id OR customer_email
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id OR customer_email = auth.jwt()->>'email');

-- 8. Update SELECT policy on order_items so users can view order items
DROP POLICY IF EXISTS "Users can view their own order items" ON public.order_items;
CREATE POLICY "Users can view their own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND (orders.user_id = auth.uid() OR orders.customer_email = auth.jwt()->>'email')
    )
  );

