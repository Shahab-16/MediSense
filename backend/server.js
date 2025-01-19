const express = require('express');
const cors = require('cors');
const connectDB = require('./config/Database');
const userRoute = require('./routes/userRoute');
require('dotenv').config();

const app = express();

// Connect to the database
connectDB();

// Allowed origins for CORS
const allowedOrigins = ['https://medisense-frontend.vercel.app'];

// CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS method
    credentials: true, // Allow credentials (cookies, etc.)
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow custom headers
  })
);

// Middleware to parse JSON
app.use(express.json());

// Middleware to handle preflight requests (OPTIONS)
app.options('*', cors());

// Routes
app.use('/user', userRoute);

app.get('/', (req, res) => {
  res.send('Hello');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
