exports.orderConfirmationEmail = (patientName, orderId, orderDate, totalAmount) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Order Confirmation</title>
        <style>
            body {
                background-color: #f3f4f6;
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 1px solid #e5e7eb;
            }
            .header h1 {
                color: #2563eb; /* blue-600 */
                font-size: 24px;
                margin: 0;
            }
            .content {
                padding: 20px 0;
            }
            .content p {
                font-size: 16px;
                color: #374151;
                line-height: 1.5;
            }
            .footer {
                text-align: center;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                font-size: 14px;
                color: #6b7280;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Order Confirmation</h1>
            </div>
            <div class="content">
                <p>Dear ${patientName},</p>
                <p>Your order with ID <strong>${orderId}</strong> has been successfully placed on <strong>${orderDate}</strong>.</p>
                <p>Total Amount: <strong>₹${totalAmount}</strong></p>
                <p>Thank you for shopping with Medisense. Your order will be delivered soon.</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Medisense. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
  };