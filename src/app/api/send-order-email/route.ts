import { NextRequest, NextResponse } from 'next/server';

interface OrderEmailData {
  customerInfo: {
    fullName: string;
    phone: string;
    email: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    address: string;
    orderNotes: string;
  };
  orderItems: Array<{
    name: string;
    size: string;
    collection: string;
    quantity: number;
    unitPrice: number;
    itemTotal: number;
  }>;
  orderSummary: {
    subtotal: number;
    shipping: number;
    discount: number;
    tax: number;
    grandTotal: number;
  };
  orderDate: string;
  orderTime: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: OrderEmailData = await request.json();

    // Validate required fields
    if (!data.customerInfo || !data.orderItems || !data.orderSummary) {
      return NextResponse.json(
        { error: 'Missing required order data' },
        { status: 400 }
      );
    }

    // Get email configuration from environment variables
    const ownerEmail = process.env.OWNER_EMAIL;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;

    if (!ownerEmail) {
      console.error('OWNER_EMAIL environment variable is not set');
      return NextResponse.json(
        { error: 'Email configuration error' },
        { status: 500 }
      );
    }

    // Generate HTML email content
    const emailHtml = generateOrderEmailHTML(data);

    // For now, we'll log the email content since we don't have SMTP configured
    // In production, you would use a service like Nodemailer, SendGrid, or Resend
    console.log('=== ORDER EMAIL ===');
    console.log('To:', ownerEmail);
    console.log('Subject: New Order Received');
    console.log('HTML Content:', emailHtml);
    console.log('==================');

    // If SMTP credentials are provided, you would send the email here
    // Example using Nodemailer (would need to be installed):
    /*
    if (smtpHost && smtpUser && smtpPassword) {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort) || 587,
        secure: false,
        auth: {
          user: smtpUser,
          pass: smtpPassword,
        },
      });

      await transporter.sendMail({
        from: smtpUser,
        to: ownerEmail,
        subject: 'New Order Received',
        html: emailHtml,
      });
    }
    */

    return NextResponse.json({ success: true, message: 'Order email processed' });
  } catch (error) {
    console.error('Error sending order email:', error);
    return NextResponse.json(
      { error: 'Failed to send order email' },
      { status: 500 }
    );
  }
}

function generateOrderEmailHTML(data: OrderEmailData): string {
  const { customerInfo, orderItems, orderSummary, orderDate, orderTime } = data;

  const orderItemsHTML = orderItems
    .map(
      (item, index) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${index + 1}. ${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.size}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.collection}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">PKR ${item.unitPrice.toLocaleString()}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">PKR ${item.itemTotal.toLocaleString()}</td>
    </tr>
  `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order Received</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #C9A86A 0%, #8B7355 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }
        .content {
          background: #f9fafb;
          padding: 30px;
          border-radius: 0 0 8px 8px;
        }
        .section {
          margin-bottom: 30px;
        }
        .section h2 {
          color: #C9A86A;
          font-size: 18px;
          margin-bottom: 15px;
          border-bottom: 2px solid #C9A86A;
          padding-bottom: 8px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }
        .info-item {
          background: white;
          padding: 15px;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
        }
        .info-label {
          font-weight: 600;
          color: #666;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .info-value {
          color: #333;
          font-size: 14px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 6px;
          overflow: hidden;
        }
        th {
          background: #C9A86A;
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: 600;
          font-size: 13px;
          text-transform: uppercase;
        }
        th:last-child, td:last-child {
          text-align: right;
        }
        td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 14px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .summary-row.total {
          font-weight: 700;
          font-size: 18px;
          color: #C9A86A;
          border-bottom: none;
          margin-top: 10px;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🛍 New Order Received</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Mimi Beauty Store</p>
      </div>

      <div class="content">
        <div class="section">
          <h2>👤 Customer Information</h2>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Full Name</div>
              <div class="info-value">${customerInfo.fullName}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Email</div>
              <div class="info-value">${customerInfo.email}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Phone</div>
              <div class="info-value">${customerInfo.phone}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>📍 Shipping Address</h2>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Country</div>
              <div class="info-value">${customerInfo.country}</div>
            </div>
            <div class="info-item">
              <div class="info-label">State</div>
              <div class="info-value">${customerInfo.state}</div>
            </div>
            <div class="info-item">
              <div class="info-label">City</div>
              <div class="info-value">${customerInfo.city}</div>
            </div>
            <div class="info-item">
              <div class="info-label">ZIP Code</div>
              <div class="info-value">${customerInfo.zipCode}</div>
            </div>
            <div class="info-item" style="grid-column: 1 / -1;">
              <div class="info-label">Street Address</div>
              <div class="info-value">${customerInfo.address}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>🛒 Order Items</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Size</th>
                <th>Collection</th>
                <th style="text-align: center;">Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderItemsHTML}
            </tbody>
          </table>
        </div>

        <div class="section">
          <h2>💰 Order Summary</h2>
          <div class="info-item">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>PKR ${orderSummary.subtotal.toLocaleString()}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>PKR ${orderSummary.shipping.toLocaleString()}</span>
            </div>
            <div class="summary-row">
              <span>Discount</span>
              <span>PKR ${orderSummary.discount.toLocaleString()}</span>
            </div>
            <div class="summary-row">
              <span>Tax (10%)</span>
              <span>PKR ${orderSummary.tax.toLocaleString()}</span>
            </div>
            <div class="summary-row total">
              <span>Grand Total</span>
              <span>PKR ${orderSummary.grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        ${customerInfo.orderNotes ? `
        <div class="section">
          <h2>📝 Order Notes</h2>
          <div class="info-item">
            <div class="info-value">${customerInfo.orderNotes}</div>
          </div>
        </div>
        ` : ''}

        <div class="section">
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Order Date</div>
              <div class="info-value">${orderDate}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Order Time</div>
              <div class="info-value">${orderTime}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <p>This order was sent from Mimi Beauty Website</p>
        <p>Please contact the customer to confirm the order.</p>
      </div>
    </body>
    </html>
  `;
}
