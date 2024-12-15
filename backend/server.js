const express=require('express')
const connectDB=require('./config/Database')
const userRoute=require('./routes/userRoute')
require('dotenv').config()


const app=express();

connectDB();

app.use(express.json());
app.use('/api/v1/user',userRoute)

app.get('/',(req,res)=>{
    res.send("hello")
});


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})