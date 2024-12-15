const mongoose = require("mongoose");

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
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60*2,
    },
});

async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email, "Email Verification From MEDISENSE is ", otp);
        console.log("Email Sent Successfully", mailResponse);
    }
    catch(err){
        console.log(err, "Error in sending mail in OTP model");
    }
}

OTPSchema.pre("save", async function (next) {
    await sendVerificationEmail(this.email, this.OTP);
    next();
});


module.exports = mongoose.model("OTP", OTPSchema);