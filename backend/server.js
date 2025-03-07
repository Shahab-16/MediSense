const express = require('express');
const cors = require('cors');
const connectDB = require('./config/Database');
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/admin');
const hospitalRoute = require('./routes/hospital');
const pharmacyRoute = require('./routes/pharmacy');

require('dotenv').config();

const app = express();
console.log("Backend is running");

// Connect to the database
connectDB()
  .then(() => console.log("✅ Connected to the database"))
  .catch(err => {
    console.error("❌ Database connection error:", err);
    process.exit(1); // Exit if database connection fails
  });

// Allowed origins for CORS
const allowedOrigins = [
  'https://medisense-frontend.vercel.app',
  'https://medisense-doctor-section.vercel.app',
  'https://medisense-admin-section.vercel.app',
  'https://medisense-pharmacy.vercel.app',
  'https://medisense-hospital.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.use('/hospital-id', hospitalRoute);
app.use('/pharmacy-id', pharmacyRoute);

app.get('/', (req, res) => {
  res.send('Hello, MediSense Backend is Running!');
});

// Global Error Handler (for better debugging)
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
