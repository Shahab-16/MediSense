const user=require("../models/User");
const medicine=require("../models/Medicine");
const cart=require("../models/Cart");



exports.addToCart=async(req,res)=>{
    try{
        const userId=req.user.id;
        const userData=await user.findById(userId);

        const medicineCartData=userData.medicineCart;

        if(!medicineCartData[req.body.medicineId]){
            medicineCartData[req.body.medicineId]=1;
        }
        else{
            medicineCartData[req.body.medicineId]+=1;
        }

        await user.findByIdAndUpdate(userId,{medicineCart:medicineCartData});

        return res.status(200).json({
            success:true,
            message:"Medicine added to cart successfully",
        })

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in adding medicine to cart",
        })
    }
}




exports.removeFromCart=async(req,res)=>{
    try{
        const userId=req.user.id;
        const userData=await user.findById(userId);

        const medicineCartData=userData.medicineCart;

        if(!medicineCartData[req.body.medicineId]){
            return res.status(400).json({
                success:false,
                message:"Medicine not found in cart",
            })
        }
        else{
            if(medicineCartData[req.body.medicineId]>1){
                medicineCartData[req.body.medicineId]-=1;
            }
            else{
                delete medicineCartData[req.body.medicineId];
            }

            await user.findByIdAndUpdate(userId,{medicineCart:medicineCartData});
        }

        return res.status(200).json({
            success:true,
            message:"Medicine removed from cart successfully",
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in removing medicine from cart",
        })
    }
};



exports.getMedicinesInCart=async(req,res)=>{
    try{
        const userId=req.user.id;
        const userData=await user.findById(userId);

        const medicineCartData=userData.medicineCart;

        const medicineslist=await medicine.find({ _id: { $in: Object.keys(medicineCartData) } });

        return res.status(200).json({
            success:true,
            medicineslist,
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in getting medicines in cart",
        })
    }
}