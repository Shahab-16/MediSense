// backend/mailsTemplate/doctorRemoved.js
exports.doctorDeletedEmail = (doctorName, hospitalName, hospitalEmail) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Removal Notification</title>
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
                <h1>Removal Notification</h1>
            </div>
            <div class="content">
                <p>Dear Dr. ${doctorName},</p>
                <p>We regret to inform you that you have been removed from <strong>${hospitalName}</strong>.</p>
                <p>If you believe this is a mistake or have any questions, please contact us at <a href="mailto:${hospitalEmail}">${hospitalEmail}</a>.</p>
                <p>Thank you for your service.</p>
                <p>Best regards,<br>The ${hospitalName} Team</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} ${hospitalName}. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
  };