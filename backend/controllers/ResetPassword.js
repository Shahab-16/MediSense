const User=require("../models/User");
const mailSender=require("../utils/MailSender");
const crypto=require("crypto");



exports.resetPasswordToken=async(req,res)=>{
    try{
        const {email}=req.body;

        const user=await User.findOne({email:email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found",
            })
        }

        const token=crypto.randomBytes(32).toString("hex");

        const updatedDetails= await User.findOneAndUpdate(
            {email:email},
            {
                token:token,
                tokenExpiresAt:Date.now()+5*60*1000,
            },
            {new:true}
        )
        console.log("Updated Details",updatedDetails);

        const url=`localhost:3000/reset-password/${token}`;

        await mailSender({
            email:email,
            subject:"Reset Password",
            message:`Click on the link to reset your password ${url}`
        });

        return res.status(200).json({
            success:true,
            message:"Email sent successfully to reset password",
        })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong in sending mail to reset password",
        })
    }
}


exports.resetPassword=async(req,res)=>{
    try{
        const {password,confirmPassword,token}=req.body;

        if(!password || !confirmPassword || !token){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm Password do not match",
            })
        }

        const user=await User.findOne({token:token});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found",
            })
        }

        if(user.tokenExpiresAt<Date.now()){
            return res.status(400).json({
                success:false,
                message:"Token has expired",
            })
        }

        const encryptedPassword=await bcrypt.hash(password,10);

        await user.findOneAndUpdate(
            {token:token},
            {password:encryptedPassword},
            {new:true}
        )
        return res.status(200).json({
            success:true,
            message:"Password reset successfully",
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong in resetting password",
        })
    }
}