import { NextResponse } from 'next/server';
import {
  sendCustomPrintRequestEmail,
  sendCustomPrintAckEmail,
  CustomPrintEmailData,
} from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      color,
      colorName,
      size,
      frontPrintSize,
      backPrintSize,
      frontImageBase64,
      backImageBase64,
    } = body as CustomPrintEmailData;

    // Validate required fields
    if (!name || !email || !color || !size || !frontPrintSize || !backPrintSize) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, color, size, frontPrintSize, backPrintSize' },
        { status: 400 }
      );
    }

    // Validate that at least one design image was provided
    if (!frontImageBase64 && !backImageBase64) {
      return NextResponse.json(
        { error: 'At least one design image (front or back) is required' },
        { status: 400 }
      );
    }

    const adminEmail = process.env.GMAIL_USER;
    if (!adminEmail) {
      return NextResponse.json(
        { error: 'Server configuration error: GMAIL_USER not set' },
        { status: 500 }
      );
    }

    const emailData: CustomPrintEmailData = {
      name,
      email,
      color,
      colorName: colorName || color,
      size,
      frontPrintSize,
      backPrintSize,
      frontImageBase64,
      backImageBase64,
    };

    // Send both emails concurrently
    await Promise.all([
      sendCustomPrintRequestEmail(adminEmail, emailData),
      sendCustomPrintAckEmail(email, name),
    ]);

    return NextResponse.json(
      { success: true, message: 'Custom print request submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing custom print email request:', error);
    return NextResponse.json(
      { error: 'Internal server error while sending email' },
      { status: 500 }
    );
  }
}
