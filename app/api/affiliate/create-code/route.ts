import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { code } = body || {};

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const trimmedCode = code.trim();
    const codeRegex = /^[A-Za-z0-9]{4,20}$/;

    if (!codeRegex.test(trimmedCode)) {
      return NextResponse.json(
        { error: 'Code must be between 4 and 20 alphanumeric characters.' },
        { status: 400 }
      );
    }

    const uppercaseCode = trimmedCode.toUpperCase();

    // Query affiliate_settings for max_codes_per_user
    const { data: settings } = await supabase
      .from('affiliate_settings')
      .select('max_codes_per_user')
      .limit(1)
      .single();

    const maxCodes = settings?.max_codes_per_user ?? 3;

    // Count current user's existing codes
    const { count, error: countError } = await supabase
      .from('affiliate_codes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    if (countError) {
      return NextResponse.json({ error: countError.message }, { status: 500 });
    }

    if ((count ?? 0) >= maxCodes) {
      return NextResponse.json(
        { error: `Maximum limit of ${maxCodes} code(s) reached` },
        { status: 400 }
      );
    }

    // Check if code already exists
    const { data: existingCode } = await supabase
      .from('affiliate_codes')
      .select('id')
      .eq('code', uppercaseCode)
      .maybeSingle();

    if (existingCode) {
      return NextResponse.json(
        { error: 'Affiliate code already exists' },
        { status: 400 }
      );
    }

    // Insert new affiliate code
    const { data: createdCode, error: insertError } = await supabase
      .from('affiliate_codes')
      .insert({
        user_id: user.id,
        code: uppercaseCode,
      })
      .select()
      .single();

    if (insertError) {
      if (insertError.code === '23505') {
        return NextResponse.json(
          { error: 'Affiliate code already exists' },
          { status: 400 }
        );
      }
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json(createdCode);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
