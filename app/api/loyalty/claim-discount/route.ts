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

  if (!profile.is_loyalty_member) {
    return NextResponse.json({ error: 'Not a loyalty member' }, { status: 403 });
  }

  // Fetch all tiers sorted by required_points DESC to find the best eligible tier
  const { data: tiers, error: tiersError } = await supabase
    .from('loyalty_tiers')
    .select('*')
    .order('required_points', { ascending: false });

  if (tiersError || !tiers) {
    return NextResponse.json({ error: 'Could not fetch tiers' }, { status: 500 });
  }

  const eligibleTier = tiers.find(t => (profile.loyalty_points || 0) >= t.required_points);

  if (!eligibleTier) {
    return NextResponse.json({ error: 'No eligible tier for your current points' }, { status: 400 });
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

  // Insert coupon into DB
  const { error: insertError } = await supabase
    .from('discount_coupons')
    .insert({
      code,
      user_id: user.id,
      discount_percentage: eligibleTier.discount_percentage,
      tier_name: eligibleTier.name,
      is_used: false,
    });

  if (insertError) {
    console.error('Error inserting coupon:', insertError);
    return NextResponse.json({ error: 'Failed to generate coupon' }, { status: 500 });
  }

  // Reset user loyalty points to 0
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ loyalty_points: 0 })
    .eq('id', user.id);

  if (updateError) {
    console.error('Error resetting points:', updateError);
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
