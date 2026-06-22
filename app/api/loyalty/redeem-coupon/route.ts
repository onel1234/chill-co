import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    const { coupon_id } = await request.json();

    if (!coupon_id) {
      return NextResponse.json({ error: 'Missing coupon_id' }, { status: 400 });
    }

    // Mark coupon as used
    const { error } = await supabase
      .from('discount_coupons')
      .update({ is_used: true })
      .eq('id', coupon_id)
      .eq('is_used', false); // safety check: only mark unused coupons

    if (error) {
      console.error('Error redeeming coupon:', error);
      return NextResponse.json({ error: 'Failed to redeem coupon' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
