import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createGenieTransaction } from '@/lib/genie';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, email, phone, shippingAddress, appliedTier, discountAmount, userId } = body;

    if (!items || items.length === 0 || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = await createClient();

    // Recalculate totals server-side from item data
    // Products are static data in this app (not stored in Supabase),
    // so we follow the same pattern as the existing COD checkout flow
    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
      0
    );

    const finalSubtotal = subtotal - (discountAmount || 0);
    const shippingCost = finalSubtotal >= 15000 || items.length === 0 ? 0 : 350;
    const total = finalSubtotal + shippingCost;

    const orderId = crypto.randomUUID();

    // Insert order — mirrors the existing COD checkout pattern
    const orderData = {
      id: orderId,
      user_id: userId || null,
      status: 'payment_pending',
      subtotal: finalSubtotal,
      shipping: shippingCost,
      total,
      customer_email: email,
      customer_phone: phone,
      shipping_address: shippingAddress,
      payment_method: 'online',
    };

    const { error: orderError } = await supabase
      .from('orders')
      .insert(orderData);

    if (orderError) {
      console.error('Failed to create order:', JSON.stringify(orderError, null, 2));
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    // Insert order items — same schema as existing order_items table
    const orderItems = items.map((item: {
      productId: string;
      name: string;
      price: number;
      image: string;
      color: string;
      size: string;
      quantity: number;
    }) => ({
      order_id: orderId,
      product_id: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Failed to insert order items:', itemsError);
      return NextResponse.json({ error: 'Failed to create order items' }, { status: 500 });
    }

    // Create Genie payment transaction
    const companyId = process.env.GENIE_MERCHANT_ID;
    if (!companyId) {
      console.error('[Payment] GENIE_MERCHANT_ID not configured');
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 500 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const genieRes = await createGenieTransaction({
      companyId,
      orderId,
      amount: total,
      currency: 'LKR',
      redirectUrl: `${siteUrl}/checkout/callback`,
      webhookUrl: `${siteUrl}/api/payment/webhook`,
      customerReference: email,
      description: `Chill Co. Order #${orderId.slice(0, 8).toUpperCase()}`,
    });

    const { transactionId, paymentUrl } = genieRes.data;

    // Store the Genie transaction ID on the order
    await supabase
      .from('orders')
      .update({ payment_transaction_id: transactionId })
      .eq('id', orderId);

    return NextResponse.json({
      paymentUrl,
      orderId,
      transactionId,
    });

  } catch (error) {
    console.error('Payment create error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
