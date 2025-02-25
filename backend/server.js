const express = require('express');
const cors = require('cors');
const connectDB = require('./config/Database');
const userRoute = require('./routes/userRoute');
require('dotenv').config();

const app = express();
console.log("Backend is running");

// Connect to the database
connectDB()
  .then(() => console.log("Connected to the database"))
  .catch(err => console.error("Database connection error:", err));

// Allowed origins for CORS (only domains are used, not paths)
const allowedOrigins = [
  'https://medisense-frontend.vercel.app',
  'https://medisense-doctor-section.vercel.app',
  'https://medisense-admin-section.vercel.app',
  'https://medisense-pharmacy.vercel.app',
  'https://medisense-hospital.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};

// Use CORS middleware
app.use(cors(corsOptions));

// Optionally, handle preflight OPTIONS requests explicitly
app.options('*', cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

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
