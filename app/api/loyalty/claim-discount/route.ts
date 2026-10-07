import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { sendDiscountCouponEmail } from '@/lib/mail';

export const dynamic = 'force-dynamic';

function generateCouponCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segment = (len: number) =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `CHLL-${segment(4)}-${segment(4)}`;
}

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  // Fetch all tiers sorted by required_points DESC to find the best eligible tier
  const { data: tiers, error: tiersError } = await supabase
    .from('loyalty_tiers')
    .select('*')
    .order('required_points', { ascending: false });

  if (tiersError || !tiers) {
    return NextResponse.json({ error: 'Could not fetch tiers' }, { status: 500 });
  }

  // Fetch already-claimed tier discounts in the current cycle
  const { data: claimedCoupons } = await supabase
    .from('discount_coupons')
    .select('tier_name')
    .eq('user_id', user.id)
    .is('expires_at', null);

  const currentPts = Math.min(100, profile.loyalty_points || 0);
  const claimedNames = (claimedCoupons || [])
    .map((c: { tier_name: string }) => c.tier_name)
    .filter((name: string) => {
      const t = tiers.find(tier => tier.name.toLowerCase() === name.toLowerCase());
      return t ? currentPts >= t.required_points : false;
    });

  const eligibleTier = tiers.find(
    t =>
      currentPts >= t.required_points &&
      !claimedNames.some((c: string) => c.toLowerCase() === t.name.toLowerCase())
  );

  if (!eligibleTier) {
    return NextResponse.json({ error: 'No eligible unclaimed tier discount for your current points' }, { status: 400 });
  }

  // Generate a unique coupon code
  let code = generateCouponCode();
  let attempts = 0;
  while (attempts < 5) {
    const { data: existing } = await supabase
      .from('discount_coupons')
      .select('id')
      .eq('code', code)
      .maybeSingle();
    if (!existing) break;
    code = generateCouponCode();
    attempts++;
  }

  const isCulturalist =
    eligibleTier.name.toLowerCase() === 'culturalist' ||
    eligibleTier.required_points >= 100 ||
    eligibleTier.discount_percentage >= 100;

  // Insert coupon into DB
  const { error: insertError } = await supabase
    .from('discount_coupons')
    .insert({
      code,
      user_id: user.id,
      discount_percentage: eligibleTier.discount_percentage,
      tier_name: eligibleTier.name,
      is_used: false,
      expires_at: null,
    });

  if (insertError) {
    console.error('Error inserting coupon:', insertError);
    return NextResponse.json({ error: 'Failed to generate coupon' }, { status: 500 });
  }

  // Points revert back to 0 ONLY when reaching 100 points (Culturalist) and unlocking/claiming the 100% discount
  if (isCulturalist) {
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ loyalty_points: 0, loyalty_tier: null })
      .eq('id', user.id);

    if (updateError) {
      console.error('Error resetting points:', updateError);
    }

    await supabase
      .from('discount_coupons')
      .update({ expires_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .neq('code', code)
      .is('expires_at', null);
  }

  // Send email with the coupon code (async, non-blocking)
  const userEmail = profile.email || user.email;
  if (userEmail) {
    sendDiscountCouponEmail(
      userEmail,
      profile.full_name,
      code,
      eligibleTier.name,
      eligibleTier.discount_percentage,
    ).catch(err => console.error('Failed to send coupon email:', err));
  }

  return NextResponse.json({
    success: true,
    code,
    tier_name: eligibleTier.name,
    discount_percentage: eligibleTier.discount_percentage,
  });
}
