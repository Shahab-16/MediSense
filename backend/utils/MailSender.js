const nodemailer = require("nodemailer");

const mailSender = async ({ email, subject, message, isHTML = false }) => {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587, // TLS port
            secure: false, // Use `true` for SSL (port 465)
            auth: {
                user: process.env.MAIL_USER, // Your email
                pass: process.env.MAIL_PASS, // App Password
            },
        });

        // Set up mail options
        let mailOptions = {
            from: `"Medisense" <${process.env.MAIL_USER}>`,
            to: email,
            subject: subject,
            text: isHTML ? null : message, // Send plain text only if not HTML
            html: isHTML ? message : null, // Send HTML content when isHTML is true
        };

        // Send the mail
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent successfully: %s", info.messageId);
        return info;
    } catch (err) {
        console.error("Error in sending mail:", err.message);
        throw new Error("Mail sending failed");
    }
};

module.exports = mailSender;
