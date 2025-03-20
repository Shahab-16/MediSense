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

// Allow CORS for frontend URL
const corsOptions = {
  origin: 'http://localhost:3000',  // ✅ Correct frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // ✅ Specify allowed methods
  credentials: true,  // ✅ Important for sending cookies and tokens
  allowedHeaders: ['Content-Type', 'Authorization'],  // ✅ Specify allowed headers
};

app.use(cors(corsOptions));

// Add custom headers to handle OPTIONS preflight requests
app.options('*', cors(corsOptions));  // ✅ Ensures preflight checks are handled


// JSON middleware must be before your routes
app.use(express.json());

// Routes
app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.use('/hospital', hospitalRoute);
app.use('/pharmacy', pharmacyRoute);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
