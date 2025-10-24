const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/Database');
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/admin');
const hospitalRoute = require('./routes/hospital');
const pharmacyRoute = require('./routes/pharmacy');
const chatbotRoutes = require('./routes/userRoute');
const messageRoutes = require('./routes/messageRoutes');
const chatRoutes = require('./routes/chatRoutes');
const socketHandler = require('./routes/socket');
const { Server } = require('socket.io');
const http = require('http');

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

// Create HTTP server
const server = http.createServer(app);

// List of allowed origins for CORS and Socket.IO
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:5173',
  'http://localhost:5174',
  'https://medisense-doctor-section.vercel.app',
  'https://medisense-pharmacy.vercel.app',
  'https://medisense-hospital.vercel.app',
  'https://medisense-admin.vercel.app',
  'https://medisense-frontend.vercel.app',
];

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
    skipMiddlewares: true,
  }
});

// Connect to the database
connectDB()
  .then(() => console.log("Connected to the database"))
  .catch(err => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

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
app.use(express.json({ limit: '10mb' }));

// Parse cookies
app.use(cookieParser());

// Routes
app.use('/user', userRoute);
app.use('/admin', adminRoute);  
app.use('/hospital', hospitalRoute);
app.use('/pharmacy', pharmacyRoute);
app.use('/chatbot', chatbotRoutes);
app.use('/message', messageRoutes);
app.use('/message/chat', chatRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Hello, MediSense Backend is Running!');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Initialize Socket.IO handler
socketHandler(io);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Socket.IO is listening for connections`);
});