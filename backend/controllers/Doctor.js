const express=require('express');
const router=express.Router();
const doctor=require('../models/Doctor');
const user=require('../models/User');
const patient=require('../models/Patient');


exports.getCurrentPatients=async(req,res)=>{
    try{
        const id=req.user.id;
        const currentPatients=await doctor.findById(id).populate('currentPatients');
        if(!currentPatients){
            return res.status(400).json({
                success:false,
                message:"No current patients found",
            })
        }

        return res.status(200).json({
            success:true,
            currentPatients
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in getting current patients",
        })
    }
}