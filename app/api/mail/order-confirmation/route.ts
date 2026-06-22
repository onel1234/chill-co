import { NextResponse } from 'next/server';
import { sendOrderConfirmationEmail } from '@/lib/mail';
import { CartItem } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, orderId, items, total } = body;

    if (!email || !orderId || !items || typeof total !== 'number') {
      return NextResponse.json(
        { error: 'Missing required fields: email, orderId, items, or total' },
        { status: 400 }
      );
    }

    // Call the mail service
    await sendOrderConfirmationEmail(email, orderId, items as CartItem[], total);

    return NextResponse.json({ success: true, message: 'Order confirmation email queued' }, { status: 200 });
  } catch (error) {
    console.error('Error processing order confirmation email request:', error);
    return NextResponse.json(
      { error: 'Internal server error while sending email' },
      { status: 500 }
    );
  }
}
