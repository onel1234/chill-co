import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code || !code.trim()) {
      return NextResponse.json({ valid: false });
    }

    const uppercaseCode = code.trim().toUpperCase();

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('affiliate_codes')
      .select('is_active')
      .eq('code', uppercaseCode)
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json({ valid: false });
    }

    return NextResponse.json({ valid: Boolean(data.is_active) });
  } catch {
    return NextResponse.json({ valid: false });
  }
}
