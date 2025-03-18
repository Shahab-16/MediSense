const express=require('express')
const router=express.Router()


const {Signup,Login,SendOTP}=require('../controllers/Auth')


router.post('/signup',Signup)
router.post('/login',Login)
router.post('/send-otp',SendOTP)


module.exports=router;