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

    if (paymentStatus === 'COMPLETED') {
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
        // Calculate points from order items (matching existing checkout pattern)
        if (orderItems) {
          pointsEarned = orderItems.reduce(
            (sum: number, item: { quantity: number }) => sum + item.quantity,
            0
          );
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('loyalty_points, is_loyalty_member')
          .eq('id', order.user_id)
          .single();

        if (profile?.is_loyalty_member && pointsEarned > 0) {
          await supabase
            .from('profiles')
            .update({ loyalty_points: (profile.loyalty_points || 0) + pointsEarned })
            .eq('id', order.user_id);
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
    } else if (paymentStatus === 'PENDING') {
      return NextResponse.json({ success: false, paymentStatus, orderId });
    } else {
      // FAILED or CANCELLED
      await supabase
        .from('orders')
        .update({ status: 'payment_failed' })
        .eq('id', orderId);

      return NextResponse.json({ success: false, paymentStatus, orderId });
    }
  } catch (error) {
    console.error('Payment verify error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

