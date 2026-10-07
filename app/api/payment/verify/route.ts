import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getGenieTransactionStatus } from '@/lib/genie';

export async function POST(request: Request) {
  try {
    const { transactionId, orderId } = await request.json();

    if (!transactionId || !orderId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const genieRes = await getGenieTransactionStatus(transactionId);
    const paymentStatus = genieRes.data.paymentStatus;

    const supabase = await createClient();

    const isSuccess = ['COMPLETED', 'CONFIRMED', 'SUCCESS'].includes(paymentStatus);
    const isFailure = ['FAILED', 'CANCELLED', 'DECLINED', 'EXPIRED'].includes(paymentStatus);

    if (isSuccess) {
      // Update order status to confirmed
      await supabase
        .from('orders')
        .update({ status: 'confirmed' })
        .eq('id', orderId);

      // Fetch order details for loyalty points and email
      const { data: order } = await supabase
        .from('orders')
        .select('user_id, total, customer_email')
        .eq('id', orderId)
        .single();

      // Fetch order items for email and points calculation
      const { data: orderItems } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId);

      // Update loyalty points for logged-in users
      let pointsEarned = 0;
      if (order?.user_id) {
        // Calculate points from order items: 10 points per T-shirt purchased
        if (orderItems) {
          pointsEarned = orderItems.reduce(
            (sum: number, item: { quantity: number }) => sum + (10 * item.quantity),
            0
          );
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('loyalty_points, is_loyalty_member')
          .eq('id', order.user_id)
          .single();

        const orderCouponCode = `ORDER-${orderId.slice(0, 8).toUpperCase()}`;
        const { data: orderCoupon } = await supabase
          .from('discount_coupons')
          .select('id, tier_name, discount_percentage')
          .eq('code', orderCouponCode)
          .eq('user_id', order.user_id)
          .maybeSingle();

        const isCulturalistClaim =
          orderCoupon &&
          (orderCoupon.tier_name.toLowerCase() === 'culturalist' ||
            Number(orderCoupon.discount_percentage) >= 100);

        if (isCulturalistClaim) {
          // Points revert back to 0 only when reaching 100 points (Culturalist) and claiming the 100% discount
          await supabase
            .from('profiles')
            .update({ loyalty_points: 0, loyalty_tier: null, is_loyalty_member: true })
            .eq('id', order.user_id);

          await supabase
            .from('discount_coupons')
            .update({ is_used: true, expires_at: new Date().toISOString() })
            .eq('user_id', order.user_id)
            .is('expires_at', null);

          pointsEarned = 0;
        } else {
          if (orderCoupon) {
            await supabase
              .from('discount_coupons')
              .update({ is_used: true, expires_at: null })
              .eq('id', orderCoupon.id);
          }

          if (pointsEarned > 0) {
            const newPoints = Math.min(100, (profile?.loyalty_points || 0) + pointsEarned);

            // Determine the tier based on new points total
            const { data: tiers } = await supabase
              .from('loyalty_tiers')
              .select('name, required_points')
              .lte('required_points', newPoints)
              .order('required_points', { ascending: false })
              .limit(1);

            const newTier =
              tiers && tiers.length > 0
                ? tiers[0].name
                : newPoints >= 100
                  ? 'Culturalist'
                  : newPoints >= 60
                    ? 'Curator'
                    : newPoints >= 30
                      ? 'Explorer'
                      : null;

            await supabase
              .from('profiles')
              .update({ loyalty_points: newPoints, loyalty_tier: newTier, is_loyalty_member: true })
              .eq('id', order.user_id);
          }
        }
      }

      // Trigger order confirmation email asynchronously
      if (order?.customer_email && orderItems) {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        fetch(`${siteUrl}/api/mail/order-confirmation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: order.customer_email,
            orderId,
            items: orderItems,
            total: order.total,
          }),
        }).catch(err => console.error('Failed to trigger order confirmation email:', err));
      }

      return NextResponse.json({ success: true, paymentStatus, orderId, pointsEarned });
    } else if (isFailure) {
      // FAILED, CANCELLED, DECLINED, EXPIRED
      await supabase
        .from('orders')
        .update({ status: 'payment_failed' })
        .eq('id', orderId);

      return NextResponse.json({ success: false, paymentStatus, orderId });
    } else {
      // PENDING, INITIATED, or any other in-progress state
      return NextResponse.json({ success: false, paymentStatus, orderId });
    }
  } catch (error) {
    console.error('Payment verify error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

