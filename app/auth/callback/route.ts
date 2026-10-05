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

      // If there's an affiliate referral code, process it after OAuth signup
      if (affiliateRef) {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            // Update user metadata with affiliate code so the trigger-based 
            // approach can be supplemented with a direct API call for OAuth users
            const affiliateCode = affiliateRef.toUpperCase();
            
            // Look up the affiliate code
            const { data: codeData } = await supabase
              .from('affiliate_codes')
              .select('user_id')
              .eq('code', affiliateCode)
              .eq('is_active', true)
              .single();

            if (codeData && codeData.user_id !== user.id) {
              // Check if this user was already referred
              const { data: existingReferral } = await supabase
                .from('affiliate_referrals')
                .select('id')
                .eq('referred_user_id', user.id)
                .single();

              if (!existingReferral) {
                // Get reward points from settings
                const { data: settings } = await supabase
                  .from('affiliate_settings')
                  .select('points_per_referral')
                  .single();
                const points = settings?.points_per_referral ?? 50;

                // Award points to affiliate (using service-level operations)
                await supabase.rpc('process_affiliate_referral', {
                  p_affiliate_user_id: codeData.user_id,
                  p_referred_user_id: user.id,
                  p_code: affiliateCode,
                  p_points: points,
                });
              }
            }
          }
        } catch (e) {
          // Don't block the redirect if affiliate processing fails
          console.error('Affiliate processing error:', e);
        }
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Redirect to error page on failure
  return NextResponse.redirect(`${origin}/account/login?error=oauth_failed`);
}
