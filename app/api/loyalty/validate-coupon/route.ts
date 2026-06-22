import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    const { code } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ valid: false, error: 'No code provided' }, { status: 400 });
    }

    const normalizedCode = code.trim().toUpperCase();

    // Look up the coupon — no auth required, anyone can validate a code at checkout
    const { data: coupon, error } = await supabase
      .from('discount_coupons')
      .select('id, code, discount_percentage, tier_name, is_used')
      .eq('code', normalizedCode)
      .maybeSingle();

    if (error) {
      console.error('Coupon lookup error:', error);
      return NextResponse.json({ valid: false, error: 'Server error' }, { status: 500 });
    }

    if (!coupon) {
      return NextResponse.json({ valid: false, error: 'Invalid coupon code' });
    }

    if (coupon.is_used) {
      return NextResponse.json({ valid: false, error: 'This code has already been used' });
    }

    return NextResponse.json({
      valid: true,
      coupon_id: coupon.id,
      discount_percentage: coupon.discount_percentage,
      tier_name: coupon.tier_name,
    });
  } catch {
    return NextResponse.json({ valid: false, error: 'Invalid request' }, { status: 400 });
  }
}
