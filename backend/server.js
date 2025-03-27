const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/Database');
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/admin');
const hospitalRoute = require('./routes/hospital');
const pharmacyRoute = require('./routes/pharmacy');

require('dotenv').config(); // Load environment variables

// Cloudinary Configuration
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Cloudinary Config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// Connect to the database
connectDB()
  .then(() => console.log("Connected to the database"))
  .catch(err => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

// List of allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://medisense-doctor-section.vercel.app',
  'https://medisense-pharmacy.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'https://medisense-hospital.vercel.app',
  'https://medisense-admin.vercel.app',
  'https://medisense-frontend.vercel.app',
];

// Enable CORS with dynamic origin checking
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow credentials (cookies, authorization headers)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Handle preflight requests
app.options('*', cors());

// Parse JSON request bodies
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Routes
app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.use('/hospital', hospitalRoute);
app.use('/pharmacy', pharmacyRoute);

// Default route
app.get('/', (req, res) => {
  res.send('Hello, MediSense Backend is Running!');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
