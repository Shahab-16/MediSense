// backend/mailsTemplate/storeAdded.js
exports.storeAddedEmail = (storeName, adminName, adminEmail) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Welcome to Medisense</title>
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
                <h1>Welcome to Medisense</h1>
            </div>
            <div class="content">
                <p>Dear ${storeName},</p>
                <p>We are excited to inform you that your pharmacy has been added to the Medisense platform by <strong>${adminName}</strong>.</p>
                <p>You can now start managing your medicine inventory and accepting orders through our platform.</p>
                <p>If you have any questions, feel free to contact us at <a href="mailto:${adminEmail}">${adminEmail}</a>.</p>
                <p>Best regards,<br>The Medisense Team</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Medisense. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
  };