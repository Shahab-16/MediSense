const express=require("express");
const router=express.Router();

const {sendMessage,getMessage} =require("../controllers/messageController");
const {authMiddleware,isUserMiddleware}=require('../middlewares/auth')

router.get('/:id',authMiddleware,getMessage);

router.post("/send/:id",authMiddleware,sendMessage);


 module.exports=router;


