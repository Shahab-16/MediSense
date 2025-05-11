const express=require('express')
const router=express.Router()

const chatbotController = require('../controllers/chatbot');
const {Signup,Login,SendOTP}=require('../controllers/Auth')
const {authMiddleware,isUserMiddleware}=require('../middlewares/auth')
const {addToCart,removeFromCart,getAllMedicinesInCart}=require('../controllers/medicineOrder/cartController')
const {placeMedicineOrder,verifyMedicineOrder,getOrderedMedicinesOfUsers}=require('../controllers/medicineOrder/orderController')
const artificialDoctor=require('../controllers/artificialDoctor')




router.post('/signup',Signup)
router.post('/login',Login)
router.post('/send-otp',SendOTP)


router.post('/medicine/add-to-cart',authMiddleware,isUserMiddleware,addToCart)
router.post('/medicine/remove-from-cart',authMiddleware,isUserMiddleware,removeFromCart)
router.get('/medicine/get-all-medicines-in-cart',authMiddleware,isUserMiddleware,getAllMedicinesInCart)


router.post('/medicine/get-all-ordered-medicines',getOrderedMedicinesOfUsers);


router.post('/medicine/place-order',placeMedicineOrder)
router.post('/medicine/verify-order',verifyMedicineOrder)


router.post('/api/chatbot/chat',authMiddleware,isUserMiddleware, chatbotController.chatWithBot);
router.post('/api/artificial-doctor',authMiddleware,isUserMiddleware,artificialDoctor.ArtificialDoctorResponse);



module.exports=router;