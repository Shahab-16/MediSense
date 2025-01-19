const express = require('express');
const cors = require('cors');
const connectDB = require('./config/Database');
const userRoute = require('./routes/userRoute');
require('dotenv').config();

const app = express();

connectDB();
const allowedOrigins = ['https://medisense-frontend.vercel.app'];
app.use(
  cors({
    origin: allowedOrigins, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, // Allow cookies
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers
  })
);

app.use(express.json());

// Routes
app.use('/user', userRoute);

app.get('/', (req, res) => {
  res.send('Hello');
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
