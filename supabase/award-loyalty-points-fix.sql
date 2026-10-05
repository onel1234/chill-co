-- ============================================================
-- FIX: Loyalty Points & Auto-Tier Induction for Existing & Future Orders
-- Run this in your Supabase SQL Editor (Database > SQL Editor)
-- ============================================================

-- 1. Ensure all users are marked as loyalty members
ALTER TABLE public.profiles 
  ALTER COLUMN is_loyalty_member SET DEFAULT true;

UPDATE public.profiles 
SET is_loyalty_member = true;

-- 2. Recalculate loyalty points for all users from their existing orders (10 points per item purchased)
UPDATE public.profiles p
SET loyalty_points = COALESCE(
  (
    SELECT SUM(oi.quantity * 10)
    FROM public.orders o
    JOIN public.order_items oi ON oi.order_id = o.id
    WHERE o.user_id = p.id
  ),
  0
);

-- 3. Update every user's loyalty tier based on their recalculated points
UPDATE public.profiles p
SET loyalty_tier = (
  SELECT name
  FROM public.loyalty_tiers
  WHERE p.loyalty_points >= required_points
  ORDER BY required_points DESC
  LIMIT 1
);

-- 4. Create an automatic trigger on order_items:
-- Whenever items are inserted for an order, automatically credit 10 points per item to the user's profile
CREATE OR REPLACE FUNCTION public.award_loyalty_points_on_order()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_user_id uuid;
  v_points integer;
  v_new_points integer;
  v_tier_name text;
BEGIN
  -- Get the user_id from the parent order
  SELECT user_id INTO v_user_id
  FROM public.orders
  WHERE id = NEW.order_id;

  IF v_user_id IS NOT NULL THEN
    v_points := COALESCE(NEW.quantity * 10, 10);

    -- Add points to user profile and ensure they are a loyalty member
    UPDATE public.profiles
    SET 
      loyalty_points = COALESCE(loyalty_points, 0) + v_points,
      is_loyalty_member = true
    WHERE id = v_user_id
    RETURNING loyalty_points INTO v_new_points;

    -- Update tier based on new points
    IF v_new_points IS NOT NULL THEN
      SELECT name INTO v_tier_name
      FROM public.loyalty_tiers
      WHERE v_new_points >= required_points
      ORDER BY required_points DESC
      LIMIT 1;

      UPDATE public.profiles
      SET loyalty_tier = v_tier_name
      WHERE id = v_user_id;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_award_loyalty_points ON public.order_items;

CREATE TRIGGER trg_award_loyalty_points
  AFTER INSERT ON public.order_items
  FOR EACH ROW
  EXECUTE FUNCTION public.award_loyalty_points_on_order();

-- 5. Verification query: view current profiles and their updated points & tiers
SELECT id, email, full_name, loyalty_points, loyalty_tier, is_loyalty_member
FROM public.profiles;
