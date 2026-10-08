import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { processFirstPurchaseAffiliateReward } from '@/lib/affiliate';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const { orderId, affiliateCode } = body;

    const result = await processFirstPurchaseAffiliateReward(
      supabase,
      user.id,
      orderId,
      affiliateCode
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('[Affiliate] reward-first-purchase API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
