import nodemailer from 'nodemailer';
import { CartItem } from '@/lib/types';

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendOrderConfirmationEmail = async (
  email: string,
  orderId: string,
  items: CartItem[],
  total: number
) => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment variables');
    return;
  }

  const itemsHtml = items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">
        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" />
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">
        <strong>${item.name}</strong><br />
        <span style="color: #666; font-size: 12px;">Color: ${item.color} | Size: ${item.size}</span>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">
        $${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `
    )
    .join('');

  const mailOptions = {
    from: `"Chill Co" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Order Confirmation - #${orderId.slice(0, 8).toUpperCase()}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h1 style="color: #FF5A00; text-align: center; text-transform: uppercase; letter-spacing: -1px;">Chill Co</h1>
        <h2 style="text-align: center; margin-bottom: 30px;">Thanks for your order!</h2>
        
        <p>Hi there,</p>
        <p>We've received your order <strong>#${orderId.slice(0, 8).toUpperCase()}</strong> and are getting it ready to ship.</p>
        
        <h3 style="margin-top: 30px; border-bottom: 2px solid #FF5A00; padding-bottom: 5px;">Order Summary</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background-color: #f9f9f9; text-align: left;">
              <th style="padding: 10px;">Item</th>
              <th style="padding: 10px;">Details</th>
              <th style="padding: 10px; text-align: center;">Qty</th>
              <th style="padding: 10px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
              <td style="padding: 10px; text-align: right; font-weight: bold;">$${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        
        <p style="margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
          If you have any questions, reply to this email or contact our support team.
        </p>
        <p style="text-align: center; margin-top: 20px;">
          <a href="https://chill-co.vercel.app/account/orders/${orderId}" style="display: inline-block; background-color: #FF5A00; color: white; padding: 10px 20px; text-decoration: none; font-weight: bold; text-transform: uppercase;">View Order Status</a>
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
};

export const sendDiscountEligibilityEmail = async (
  email: string,
  name: string | null,
  tierName: string,
  discountPercentage: number,
  points: number
) => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment variables');
    return;
  }

  const displayName = name || 'there';

  const mailOptions = {
    from: `"Chill Co" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `You've unlocked a new discount tier! (${discountPercentage}% OFF)`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <h1 style="color: #FF5A00; text-align: center; text-transform: uppercase; letter-spacing: -1px; margin-bottom: 5px;">Chill Co</h1>
        <h2 style="text-align: center; margin-top: 0; color: #555;">Loyalty Rewards</h2>
        
        <p>Hi ${displayName},</p>
        <p>Great news! With <strong>${points} points</strong>, you have reached the <strong>${tierName}</strong>.</p>
        <p>This means you are now eligible for a <strong>${discountPercentage}% discount</strong> on your future purchases!</p>
        
        <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; color: #333;">Your Current Tier</h3>
          <p style="font-size: 24px; font-weight: bold; color: #FF5A00; margin: 0;">${tierName}</p>
          <p style="font-size: 16px; margin: 10px 0 0 0;">${discountPercentage}% OFF</p>
        </div>
        
        <p style="text-align: center;">
          <a href="https://chill-co.vercel.app/" style="display: inline-block; background-color: #FF5A00; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px; text-transform: uppercase;">Shop Now</a>
        </p>
        
        <p style="margin-top: 30px; text-align: center; color: #999; font-size: 12px;">
          Thank you for being a loyal customer of Chill Co!
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Discount eligibility email sent to ${email} for tier ${tierName}`);
  } catch (error) {
    console.error('Error sending discount eligibility email:', error);
  }
};

export const sendDiscountCouponEmail = async (
  email: string,
  name: string | null,
  code: string,
  tierName: string,
  discountPercentage: number,
) => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment variables');
    return;
  }

  const displayName = name || 'there';

  const mailOptions = {
    from: `"Chill Co" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Your ${discountPercentage}% discount code is here! 🎉`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #FF5A00, #e04e00); padding: 32px 24px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: -1px; text-transform: uppercase;">Chill Co</h1>
          <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Loyalty Rewards</p>
        </div>

        <!-- Body -->
        <div style="padding: 32px 24px; background: #fff; border: 1px solid #eee;">
          <p style="font-size: 16px; margin: 0 0 8px;">Hi ${displayName},</p>
          <p style="font-size: 15px; color: #555; margin: 0 0 24px;">
            You've successfully redeemed your loyalty points! Here is your exclusive discount code:
          </p>

          <!-- Coupon Code Box -->
          <div style="background: #fff8f5; border: 2px dashed #FF5A00; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 24px;">
            <p style="margin: 0 0 6px; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #999;">Your Discount Code</p>
            <p style="margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #FF5A00; font-family: 'Courier New', monospace;">${code}</p>
            <p style="margin: 10px 0 0; font-size: 13px; color: #777;">${tierName} &mdash; <strong>${discountPercentage}% OFF</strong> your next order</p>
          </div>

          <p style="font-size: 13px; color: #888; margin: 0 0 24px;">
            Enter this code at checkout to apply your discount. This code is <strong>single-use</strong> and will expire once applied to an order.
          </p>

          <div style="text-align: center;">
            <a href="https://chill-co.vercel.app/checkout" style="display: inline-block; background-color: #FF5A00; color: white; padding: 14px 32px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-radius: 2px;">
              Shop Now
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 16px 24px; text-align: center; color: #bbb; font-size: 12px;">
          Thank you for being a loyal customer of Chill Co.
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Discount coupon email sent to ${email} — code: ${code}`);
  } catch (error) {
    console.error('Error sending discount coupon email:', error);
  }
};

export interface CustomPrintEmailData {
  name: string;
  email: string;
  color: string;
  colorName: string;
  size: string;
  frontPrintSize: string;
  backPrintSize: string;
  frontImageBase64?: string; // data:image/...;base64,...
  backImageBase64?: string;
}

/**
 * Sends a detailed custom print request notification to the store admin.
 * Design images are embedded inline via CID so they render in the email body.
 */
export const sendCustomPrintRequestEmail = async (
  adminEmail: string,
  data: CustomPrintEmailData
) => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment variables');
    return;
  }

  const attachments: nodemailer.SendMailOptions['attachments'] = [];

  if (data.frontImageBase64) {
    const base64Data = data.frontImageBase64.replace(/^data:image\/\w+;base64,/, '');
    attachments.push({
      filename: 'front-design.png',
      content: base64Data,
      encoding: 'base64',
      cid: 'front-design',
    });
  }

  if (data.backImageBase64) {
    const base64Data = data.backImageBase64.replace(/^data:image\/\w+;base64,/, '');
    attachments.push({
      filename: 'back-design.png',
      content: base64Data,
      encoding: 'base64',
      cid: 'back-design',
    });
  }

  const frontImageHtml = data.frontImageBase64
    ? `<img src="cid:front-design" alt="Front Design" style="width:240px;height:240px;object-fit:contain;border-radius:8px;border:1px solid #333;background:#f5f5f5;" />`
    : `<div style="width:240px;height:240px;display:flex;align-items:center;justify-content:center;border-radius:8px;border:1px dashed #555;color:#888;font-size:13px;">No front design</div>`;

  const backImageHtml = data.backImageBase64
    ? `<img src="cid:back-design" alt="Back Design" style="width:240px;height:240px;object-fit:contain;border-radius:8px;border:1px solid #333;background:#f5f5f5;" />`
    : `<div style="width:240px;height:240px;display:flex;align-items:center;justify-content:center;border-radius:8px;border:1px dashed #555;color:#888;font-size:13px;">No back design</div>`;

  const mailOptions: nodemailer.SendMailOptions = {
    from: `"Chill Co Studio" <${process.env.GMAIL_USER}>`,
    to: adminEmail,
    replyTo: data.email,
    subject: `🎨 New Custom Print Request — ${data.name}`,
    attachments,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #f0e6d3; background: #0d0a07;">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1a1208, #0d0a07); padding: 32px 24px; text-align: center; border-bottom: 1px solid #7d5b31;">
          <h1 style="color: #c9a96e; margin: 0; font-size: 28px; letter-spacing: 4px; text-transform: uppercase;">CHILL CO</h1>
          <p style="color: rgba(201,169,110,0.6); margin: 8px 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 3px;">Custom Print Studio — New Request</p>
        </div>

        <!-- Customer Info -->
        <div style="padding: 28px 24px; background: #111008; border-bottom: 1px solid rgba(125,91,49,0.3);">
          <h2 style="color: #c9a96e; font-size: 13px; text-transform: uppercase; letter-spacing: 3px; margin: 0 0 16px;">Customer Details</h2>
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="padding: 6px 0; color: rgba(240,230,211,0.5); font-size: 12px; width: 120px;">Name</td>
              <td style="padding: 6px 0; color: #f0e6d3; font-size: 14px; font-weight: bold;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: rgba(240,230,211,0.5); font-size: 12px;">Email</td>
              <td style="padding: 6px 0;">
                <a href="mailto:${data.email}" style="color: #c9a96e; font-size: 14px; text-decoration: none;">${data.email}</a>
              </td>
            </tr>
          </table>
        </div>

        <!-- Tee Specs -->
        <div style="padding: 28px 24px; background: #0d0a07; border-bottom: 1px solid rgba(125,91,49,0.3);">
          <h2 style="color: #c9a96e; font-size: 13px; text-transform: uppercase; letter-spacing: 3px; margin: 0 0 16px;">Tee Specifications</h2>
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="padding: 8px 12px; color: rgba(240,230,211,0.5); font-size: 12px; width: 140px; border-bottom: 1px solid rgba(125,91,49,0.15);">Colour</td>
              <td style="padding: 8px 12px; border-bottom: 1px solid rgba(125,91,49,0.15);">
                <span style="display:inline-flex;align-items:center;gap:8px;">
                  <span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:${data.color};border:1px solid rgba(255,255,255,0.2);"></span>
                  <span style="color:#f0e6d3;font-size:13px;">${data.colorName}</span>
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: rgba(240,230,211,0.5); font-size: 12px; border-bottom: 1px solid rgba(125,91,49,0.15);">Size</td>
              <td style="padding: 8px 12px; color: #f0e6d3; font-size: 13px; font-weight: bold; border-bottom: 1px solid rgba(125,91,49,0.15);">${data.size}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: rgba(240,230,211,0.5); font-size: 12px; border-bottom: 1px solid rgba(125,91,49,0.15);">Front Print Size</td>
              <td style="padding: 8px 12px; color: #f0e6d3; font-size: 13px; border-bottom: 1px solid rgba(125,91,49,0.15);">${data.frontPrintSize}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: rgba(240,230,211,0.5); font-size: 12px;">Back Print Size</td>
              <td style="padding: 8px 12px; color: #f0e6d3; font-size: 13px;">${data.backPrintSize}</td>
            </tr>
          </table>
        </div>

        <!-- Design Previews -->
        <div style="padding: 28px 24px; background: #111008; border-bottom: 1px solid rgba(125,91,49,0.3);">
          <h2 style="color: #c9a96e; font-size: 13px; text-transform: uppercase; letter-spacing: 3px; margin: 0 0 20px;">Design Previews</h2>
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="padding: 0 12px 0 0; vertical-align: top; width: 50%;">
                <p style="color: rgba(240,230,211,0.4); font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 10px;">Front</p>
                ${frontImageHtml}
              </td>
              <td style="padding: 0 0 0 12px; vertical-align: top; width: 50%;">
                <p style="color: rgba(240,230,211,0.4); font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 10px;">Back</p>
                ${backImageHtml}
              </td>
            </tr>
          </table>
        </div>

        <!-- CTA -->
        <div style="padding: 24px; text-align: center; background: #0d0a07;">
          <a href="mailto:${data.email}?subject=Re: Your Custom Print Request — Chill Co"
             style="display:inline-block;background:linear-gradient(135deg,#c9a96e,#7d5b31);color:#0d0a07;padding:14px 32px;text-decoration:none;font-weight:bold;text-transform:uppercase;letter-spacing:2px;font-size:12px;border-radius:2px;">
            Reply to Customer
          </a>
        </div>

        <!-- Footer -->
        <div style="padding: 16px 24px; text-align: center; color: rgba(240,230,211,0.3); font-size: 11px; border-top: 1px solid rgba(125,91,49,0.2);">
          Chill Co Custom Print Studio &mdash; Internal Notification
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Custom print request email sent to admin (${adminEmail}) for customer ${data.email}`);
  } catch (error) {
    console.error('Error sending custom print request email:', error);
    throw error;
  }
};

/**
 * Sends a confirmation acknowledgement email to the customer after they submit
 * a custom print request.
 */
export const sendCustomPrintAckEmail = async (
  customerEmail: string,
  name: string
) => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment variables');
    return;
  }

  const mailOptions: nodemailer.SendMailOptions = {
    from: `"Chill Co" <${process.env.GMAIL_USER}>`,
    to: customerEmail,
    subject: `We Got Your Design! — Chill Co Custom Print`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1a1208, #0d0a07); padding: 40px 24px; text-align: center;">
          <h1 style="color: #c9a96e; margin: 0 0 8px; font-size: 26px; letter-spacing: 4px; text-transform: uppercase;">CHILL CO</h1>
          <p style="color: rgba(201,169,110,0.5); margin: 0; font-size: 10px; text-transform: uppercase; letter-spacing: 4px;">Custom Print Studio</p>
        </div>

        <!-- Body -->
        <div style="padding: 40px 32px; background: #fff; border: 1px solid #eee;">
          <h2 style="margin: 0 0 8px; font-size: 22px; color: #1a1208;">We got your design, ${name}!</h2>
          <p style="color: #777; font-size: 14px; margin: 0 0 28px; line-height: 1.6;">
            Thank you for submitting your custom print request. Our team has received your design and specifications.
          </p>

          <!-- Timeline -->
          <div style="background: #fafaf8; border-left: 3px solid #c9a96e; padding: 20px 24px; margin-bottom: 28px; border-radius: 0 8px 8px 0;">
            <h3 style="margin: 0 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #7d5b31;">What happens next</h3>
            <ol style="margin: 0; padding-left: 18px; color: #555; font-size: 13px; line-height: 2;">
              <li>Our team reviews your design &amp; specifications</li>
              <li>We'll reach out within <strong>24–48 hours</strong> to confirm details &amp; pricing</li>
              <li>Once confirmed, your custom piece goes into production</li>
              <li>Crafted and delivered to your door</li>
            </ol>
          </div>

          <p style="font-size: 13px; color: #888; margin: 0 0 28px; line-height: 1.6;">
            Have questions in the meantime? Simply reply to this email — we're here to help.
          </p>

          <div style="text-align: center;">
            <a href="https://chill-co.vercel.app/"
               style="display:inline-block;background:linear-gradient(135deg,#c9a96e,#7d5b31);color:#fff;padding:14px 32px;text-decoration:none;font-weight:bold;text-transform:uppercase;letter-spacing:2px;font-size:12px;border-radius:2px;">
              Explore the Collection
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 20px 24px; text-align: center; color: #bbb; font-size: 11px;">
          &copy; Chill Co &mdash; Your story, worn.
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Custom print acknowledgement email sent to ${customerEmail}`);
  } catch (error) {
    console.error('Error sending custom print ack email:', error);
    throw error;
  }
};

export interface ContactFormEmailData {
  name: string;
  email: string;
  message: string;
}

export const sendContactFormEmail = async (data: ContactFormEmailData) => {
  const recipientEmail = 'Chillco676@gmail.com';

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment variables');
    throw new Error('Email server configuration error');
  }

  const adminMailOptions: nodemailer.SendMailOptions = {
    from: `"Chill Co Contact" <${process.env.GMAIL_USER}>`,
    to: recipientEmail,
    replyTo: data.email,
    subject: `📩 New Contact Inquiry — ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #f0e6d3; background: #0d0a07; padding: 24px; border: 1px solid #7d5b31;">
        <h2 style="color: #c9a96e; text-transform: uppercase; letter-spacing: 2px; margin-top: 0;">New Contact Message</h2>
        <p><strong style="color: #ffe8b5;">From Name:</strong> ${data.name}</p>
        <p><strong style="color: #ffe8b5;">Email:</strong> <a href="mailto:${data.email}" style="color: #c9a96e;">${data.email}</a></p>
        <div style="background: rgba(20,13,8,0.8); padding: 16px; border-left: 3px solid #c9a96e; margin-top: 16px;">
          <strong style="color: #c9a96e; display: block; margin-bottom: 8px;">Message:</strong>
          <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>
        <p style="margin-top: 24px; font-size: 11px; color: rgba(240,230,211,0.5);">Dispatched via Chill Co. Contact Portal</p>
      </div>
    `,
  };

  const ackMailOptions: nodemailer.SendMailOptions = {
    from: `"Chill Co." <${process.env.GMAIL_USER}>`,
    to: data.email,
    subject: `We received your message — Chill Co.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; padding: 32px 24px; border: 1px solid #eee; background: #ffffff;">
        <h2 style="color: #7d5b31; margin-top: 0;">Thank you for contacting Chill Co., ${data.name}!</h2>
        <p style="color: #555; line-height: 1.6;">We have received your message and our team will get back to you shortly.</p>
        <div style="background: #faf8f5; border-left: 3px solid #7d5b31; padding: 16px; margin: 20px 0;">
          <strong style="color: #7d5b31; display: block; margin-bottom: 6px;">Your Inquiry Summary:</strong>
          <p style="margin: 0; color: #666; font-style: italic;">"${data.message}"</p>
        </div>
        <p style="color: #777; font-size: 12px;">Chill Co. Support &mdash; Colombo, Sri Lanka</p>
      </div>
    `,
  };

  await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(ackMailOptions),
  ]);
};

