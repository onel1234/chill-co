-- ============================================================
-- Loyalty Tiers Migration
-- Run this in your Supabase SQL Editor (Database > SQL Editor)
-- ============================================================

-- 1. Add loyalty_tier column to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS loyalty_tier text DEFAULT NULL;

-- 2. Clear old tiers and insert the 3 new tiers
DELETE FROM public.loyalty_tiers;

INSERT INTO public.loyalty_tiers (name, required_points, discount_percentage) VALUES
  ('Explorer', 30, 25),
  ('Curator', 60, 50),
  ('Culturalist', 100, 100);

-- 3. Create a function to auto-assign tier based on points
CREATE OR REPLACE FUNCTION public.update_loyalty_tier()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_tier_name text;
BEGIN
  -- Find the highest tier the user qualifies for
  SELECT name INTO v_tier_name
  FROM public.loyalty_tiers
  WHERE NEW.loyalty_points >= required_points
  ORDER BY required_points DESC
  LIMIT 1;

  -- Update the tier (NULL if no tier reached)
  NEW.loyalty_tier := v_tier_name;

  RETURN NEW;
END;
$$;

-- 4. Create trigger to auto-update tier when loyalty_points change
DROP TRIGGER IF EXISTS on_loyalty_points_changed ON public.profiles;

CREATE TRIGGER on_loyalty_points_changed
  BEFORE UPDATE OF loyalty_points ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_loyalty_tier();

-- 5. Backfill existing users: assign tier based on current points
UPDATE public.profiles
SET loyalty_tier = (
  SELECT name
  FROM public.loyalty_tiers
  WHERE public.profiles.loyalty_points >= required_points
  ORDER BY required_points DESC
  LIMIT 1
)
WHERE loyalty_points > 0;
