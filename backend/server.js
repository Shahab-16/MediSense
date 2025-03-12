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
  .then(() => console.log("Connected to the database"))
  .catch(err => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit if database connection fails
  });

// Allow CORS for all URLs
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
  credentials: true, // Allow cookies and credentials
}));

app.use(express.json());

// Routes
app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.use('/hospitals', hospitalRoute);
app.use('/pharmacies', pharmacyRoute);

app.get('/', (req, res) => {
  res.send('Hello, MediSense Backend is Running!');
});

// Global Error Handler (for better debugging)
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});