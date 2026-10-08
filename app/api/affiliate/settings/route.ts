import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { AFFILIATE_POINTS_PER_REFERRAL } from '@/lib/affiliate';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: settings, error } = await supabase
      .from('affiliate_settings')
      .select('points_per_referral, max_codes_per_user')
      .limit(1)
      .single();

    if (error) {
      return NextResponse.json({
        points_per_referral: AFFILIATE_POINTS_PER_REFERRAL,
        max_codes_per_user: 3,
      });
    }

    return NextResponse.json({
      ...settings,
      points_per_referral: AFFILIATE_POINTS_PER_REFERRAL,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
