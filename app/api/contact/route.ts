import { NextResponse } from 'next/server';
import { sendContactFormEmail, ContactFormEmailData } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body as ContactFormEmailData;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Please enter your name.' },
        { status: 400 }
      );
    }

    if (!email || !email.trim() || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Please enter your message.' },
        { status: 400 }
      );
    }

    await sendContactFormEmail({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully!' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Error in /api/contact:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
