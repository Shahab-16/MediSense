const otpTemplates = (otp, entity = "User") => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #1E40AF; text-align: center;">Welcome to <span style="color: #1E40AF;">Medisense</span>!</h2>
        <p style="color: #555; font-size: 16px; line-height: 1.5; text-align: center;">
            Your One-Time Password (OTP) for ${entity} verification is:
        </p>
        <div style="text-align: center; margin: 20px 0;">
            <span style="
                display: inline-block;
                font-size: 24px;
                font-weight: bold;
                color: #1E40AF;
                background-color: #DBEAFE;
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

module.exports = otpTemplates;
