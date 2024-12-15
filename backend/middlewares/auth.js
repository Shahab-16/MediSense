const User=require("../models/User");
const jwt=require("jsonwebtoken");



exports.authMiddleware = async (req, res, next) => {
    try{
        const token =req.body.token || req.headers("Authorization").replace("Bearer ", "");

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is required",
            });
        }

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.user=await User.findById(decoded.id);
        }
        catch(err){
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            })
        }

        next();
    }
    catch(err){
        return res.status(401).json({
            success: false,
            message: "Token is invalid",
        })
    }
}



exports.isUserMiddleware = async (req, res, next) => {
    try{
        if(req.user.role!=="user"){
            return res.status(401).json({
                success: false,
                message: "You are not a user",
            });
        }
        next();
    }
    catch(err){
        return res.status(401).json({
            success: false,
            message: "You are not a user",
        })
    }
}


exports.isAdminMiddleware = async (req, res, next) => {
    try{
        if(req.user.role!=="admin"){
            return res.status(401).json({
                success: false,
                message: "You are not an admin",
            });
        }
        next();
    }
    catch(err){
        return res.status(401).json({
            success: false,
            message: "You are not an admin",
        })
    }
}