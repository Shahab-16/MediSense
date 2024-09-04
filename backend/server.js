const express=require('express');
require('dotenv').config();




const app=express();
const Port=process.env.Port || 5000


app.get('/',(req,res)=>{
    res.send('---------Welcom to the backend of MediSense ---------');
})



app.listen(Port,()=>{
    console.log('server is running on port 5000');
})