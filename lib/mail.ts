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
