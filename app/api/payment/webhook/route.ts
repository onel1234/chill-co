import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getGenieTransactionStatus } from '@/lib/genie';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { transactionId, orderId, paymentStatus } = payload;

    if (!transactionId || !orderId) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const genieRes = await getGenieTransactionStatus(transactionId);
    const actualStatus = genieRes.data.paymentStatus;

    const supabase = await createClient();

    if (actualStatus === 'COMPLETED') {
      await supabase
        .from('orders')
        .update({ status: 'confirmed' })
        .eq('id', orderId);
    } else if (actualStatus === 'FAILED' || actualStatus === 'CANCELLED') {
      await supabase
        .from('orders')
        .update({ status: 'payment_failed' })
        .eq('id', orderId);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
