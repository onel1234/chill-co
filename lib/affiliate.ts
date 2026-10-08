import { SupabaseClient } from '@supabase/supabase-js';

export const AFFILIATE_POINTS_PER_REFERRAL = 5;

export interface AffiliateRewardResult {
  rewarded: boolean;
  pointsAwarded?: number;
  affiliateUserId?: string;
  code?: string;
  reason?: string;
}

/**
 * Awards 5 points to the owner of the affiliate code when a referred user
 * completes their FIRST purchase/payment.
 *
 * One-time deal per unique referred user (`affiliate_referrals.referred_user_id` is UNIQUE).
 * Multiple unique users signing up with the same affiliate code each award 5 points on their first purchase.
 */
export async function processFirstPurchaseAffiliateReward(
  supabase: SupabaseClient,
  referredUserId: string,
  currentOrderId?: string,
  fallbackCode?: string | null
): Promise<AffiliateRewardResult> {
  try {
    if (!referredUserId) {
      return { rewarded: false, reason: 'missing_user_id' };
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Check if reward was already processed for this user in metadata
    if (user && user.id === referredUserId && user.user_metadata?.affiliate_reward_processed === true) {
      return { rewarded: false, reason: 'already_processed' };
    }

    // Resolve the affiliate code provided during signup
    const metadataCode =
      user && user.id === referredUserId
        ? (user.user_metadata?.pending_affiliate_code as string | undefined) ||
          (user.user_metadata?.affiliate_code as string | undefined)
        : undefined;

    const rawCode = metadataCode || fallbackCode;
    if (!rawCode || typeof rawCode !== 'string' || !rawCode.trim()) {
      return { rewarded: false, reason: 'no_affiliate_code' };
    }

    const affiliateCode = rawCode.trim().toUpperCase();

    // Ensure this is the referred user's first purchase
    let ordersQuery = supabase
      .from('orders')
      .select('id, status')
      .eq('user_id', referredUserId)
      .in('status', ['confirmed', 'pending', 'processing', 'delivered', 'completed']);

    if (currentOrderId) {
      ordersQuery = ordersQuery.neq('id', currentOrderId);
    }

    const { data: previousOrders } = await ordersQuery;
    if (previousOrders && previousOrders.length > 0) {
      if (user && user.id === referredUserId) {
        await supabase.auth.updateUser({
          data: {
            pending_affiliate_code: null,
            affiliate_reward_processed: true,
          },
        });
      }
      return { rewarded: false, reason: 'not_first_purchase' };
    }

    // Look up the active affiliate code and its owner
    const { data: codeData, error: codeError } = await supabase
      .from('affiliate_codes')
      .select('user_id, code, is_active')
      .eq('code', affiliateCode)
      .eq('is_active', true)
      .maybeSingle();

    if (codeError || !codeData) {
      return { rewarded: false, reason: 'invalid_code' };
    }

    // Prevent self-referral
    if (codeData.user_id === referredUserId) {
      if (user && user.id === referredUserId) {
        await supabase.auth.updateUser({
          data: {
            pending_affiliate_code: null,
            affiliate_reward_processed: true,
          },
        });
      }
      return { rewarded: false, reason: 'self_referral' };
    }

    // Check if a referral record already exists for this referred user
    const { data: existingReferral } = await supabase
      .from('affiliate_referrals')
      .select('id')
      .eq('referred_user_id', referredUserId)
      .maybeSingle();

    if (existingReferral) {
      if (user && user.id === referredUserId) {
        await supabase.auth.updateUser({
          data: {
            pending_affiliate_code: null,
            affiliate_reward_processed: true,
          },
        });
      }
      return { rewarded: false, reason: 'already_referred' };
    }

    // Execute SECURITY DEFINER RPC to award 5 points to affiliate owner,
    // insert into affiliate_referrals (enforcing UNIQUE on referred_user_id),
    // and increment affiliate_codes.total_referrals.
    const { error: rpcError } = await supabase.rpc('process_affiliate_referral', {
      p_affiliate_user_id: codeData.user_id,
      p_referred_user_id: referredUserId,
      p_code: affiliateCode,
      p_points: AFFILIATE_POINTS_PER_REFERRAL,
    });

    if (rpcError) {
      // 23505 = unique_violation on affiliate_referrals.referred_user_id (already rewarded)
      if (rpcError.code === '23505' || rpcError.message?.toLowerCase().includes('unique')) {
        if (user && user.id === referredUserId) {
          await supabase.auth.updateUser({
            data: {
              pending_affiliate_code: null,
              affiliate_reward_processed: true,
            },
          });
        }
        return { rewarded: false, reason: 'already_referred' };
      }

      console.error('[Affiliate] RPC process_affiliate_referral error:', rpcError);
      return { rewarded: false, reason: 'rpc_error' };
    }

    // Mark the referral reward as processed on the user's metadata
    if (user && user.id === referredUserId) {
      await supabase.auth.updateUser({
        data: {
          pending_affiliate_code: null,
          referred_by_code: affiliateCode,
          affiliate_reward_processed: true,
        },
      });
    }

    return {
      rewarded: true,
      pointsAwarded: AFFILIATE_POINTS_PER_REFERRAL,
      affiliateUserId: codeData.user_id,
      code: affiliateCode,
    };
  } catch (error) {
    console.error('[Affiliate] Failed to process first-purchase affiliate reward:', error);
    return { rewarded: false, reason: 'unexpected_error' };
  }
}
