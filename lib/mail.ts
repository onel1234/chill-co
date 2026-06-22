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
