import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/account';
  const affiliateRef = searchParams.get('affiliate_ref');

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Ensure profile exists for OAuth users
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from('profiles')
            .upsert({
              id: user.id,
              email: user.email,
              full_name: (user.user_metadata?.full_name || user.user_metadata?.name || null),
              avatar_url: (user.user_metadata?.avatar_url || user.user_metadata?.picture || null),
              is_loyalty_member: true,
            }, { onConflict: 'id' });
        }
      } catch (profileErr) {
        console.error('Failed to ensure profile in OAuth callback:', profileErr);
      }

      // If there's an affiliate referral code on OAuth signup, store it as pending
      // so the affiliate owner receives 5 points once this user completes their first purchase.
      if (affiliateRef) {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user && !user.user_metadata?.affiliate_reward_processed) {
            const affiliateCode = affiliateRef.trim().toUpperCase();

            // Validate that the affiliate code exists, is active, and does not belong to the user
            const { data: codeData } = await supabase
              .from('affiliate_codes')
              .select('user_id')
              .eq('code', affiliateCode)
              .eq('is_active', true)
              .maybeSingle();

            if (codeData && codeData.user_id !== user.id) {
              // Check if this user has already made any purchases
              const { data: existingOrders } = await supabase
                .from('orders')
                .select('id')
                .eq('user_id', user.id)
                .in('status', ['confirmed', 'pending', 'processing', 'delivered', 'completed'])
                .limit(1);

              if (!existingOrders || existingOrders.length === 0) {
                await supabase.auth.updateUser({
                  data: {
                    pending_affiliate_code: affiliateCode,
                  },
                });
              }
            }
          }
        } catch (e) {
          // Don't block the redirect if affiliate code persistence fails
          console.error('Affiliate code persistence error:', e);
        }
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Redirect to error page on failure
  return NextResponse.redirect(`${origin}/account/login?error=oauth_failed`);
}
