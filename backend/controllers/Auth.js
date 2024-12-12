const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


exports.Signup = async (req, res) => {
    try{
        const {name,email,password,confirmPassword} = req.body;
        if(!name || !email || !password || !confirmPassword){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm Password do not match"
            });
        }

        const existingUser =await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password:hashedPassword,
        });

        return res.status(200).json({
            success:true,
            message:"User created successfully",
            user,
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong in signup",
        })
    }
};



exports.Login = async (req, res) => {
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Wrong email or password"
            })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
        return res.status(200).json({
            success:true,
            message:"User logged in successfully",
            user,
            token,
        })

        return res.status(200).json({
            success:true,
            message:"User logged in successfully",
            user,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong in login",
        })
    }
};