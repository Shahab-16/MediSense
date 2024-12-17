const mongoose = require("mongoose");
const mailSender = require("../utils/MailSender");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    OTP: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 2, // Expires in 2 minutes
    },
});

// Function to send verification email
async function sendVerificationEmail(email, otp) {
    try {
        const subject = "Email Verification From MEDISENSE";

        // HTML template for the email
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
                <h2 style="color: #333; text-align: center;">Welcome to <span style="color: #4CAF50;">Medisense</span>!</h2>
                <p style="color: #555; font-size: 16px; line-height: 1.5; text-align: center;">
                    Your One-Time Password (OTP) for email verification is:
                </p>
                <div style="text-align: center; margin: 20px 0;">
                    <span style="
                        display: inline-block;
                        font-size: 24px;
                        font-weight: bold;
                        color: #4CAF50;
                        background-color: #e8f5e9;
                        padding: 10px 20px;
                        border-radius: 5px;
                        letter-spacing: 2px;">
                        ${otp}
                    </span>
                </div>
                <p style="color: #555; font-size: 14px; text-align: center;">
                    This OTP will expire in <strong>2 minutes</strong>. Please do not share it with anyone.
                </p>
                <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                <p style="color: #777; font-size: 12px; text-align: center;">
                    If you did not request this verification, please ignore this email.
                </p>
            </div>
        `;

        const mailResponse = await mailSender({
            email,
            subject,
            message: htmlContent, // Pass HTML content
            isHTML: true, // Tell the mail sender this is HTML
        });

        console.log("Email Sent Successfully", mailResponse);
    } catch (err) {
        console.error("Error in sending mail in OTP model:", err);
    }
}


// Pre-save middleware
OTPSchema.pre("save", async function (next) {
    try {
        await sendVerificationEmail(this.email, this.OTP);
    } catch (err) {
        console.error("Error in pre-save middleware:", err);
    }
    next();
});

module.exports = mongoose.model("OTP", OTPSchema);
