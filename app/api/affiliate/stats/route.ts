import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch affiliate referrals for user
    const { data: referrals, error: referralsError } = await supabase
      .from('affiliate_referrals')
      .select('id, code_used, points_awarded, created_at')
      .eq('affiliate_user_id', user.id)
      .order('created_at', { ascending: false });

    if (referralsError) {
      return NextResponse.json({ error: referralsError.message }, { status: 500 });
    }

    // Fetch affiliate codes for user
    const { data: codes, error: codesError } = await supabase
      .from('affiliate_codes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (codesError) {
      return NextResponse.json({ error: codesError.message }, { status: 500 });
    }

    const total_referrals = referrals ? referrals.length : 0;
    const total_points_earned = referrals
      ? referrals.reduce((sum, r) => sum + (r.points_awarded || 0), 0)
      : 0;

    const recent_referrals = referrals ? referrals.slice(0, 10) : [];

    return NextResponse.json({
      total_referrals,
      total_points_earned,
      recent_referrals,
      codes: codes || [],
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
