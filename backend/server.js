const express = require('express');
const cors = require('cors');
const connectDB = require('./config/Database');
const userRoute = require('./routes/userRoute');
require('dotenv').config();

const app = express();
console.log("Backend is running");

// Connect to the database
connectDB();
console.log("Connected to the database");

// Allowed origins for CORS
const allowedOrigins = [
    'https://medisense-frontend.vercel.app',
    'https://medisense-doctor-section.vercel.app',
    'https://medisense-admin-section.vercel.app/admin',
    'https://medisense-pharmacy.vercel.app',
    'https://medisense-hospital.vercel.app',
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow request
        } else {
            callback(new Error('Not allowed by CORS')); // Reject request
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, etc.)
};

// Use CORS with the specified options
app.use(cors(corsOptions));

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
