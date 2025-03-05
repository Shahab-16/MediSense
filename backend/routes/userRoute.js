const express=require('express')
const router=express.Router()


const {Signup,Login,SendOTP}=require('../controllers/Auth')
const {authMiddleware,isUserMiddleware}=require('../middlewares/auth')


router.post('/signup',Signup)
router.post('/login',Login)
router.post('/send-otp',SendOTP)


module.exports=router;