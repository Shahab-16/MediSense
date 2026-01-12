// server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
require("dotenv").config();

// Routes
const connectDB = require("./config/Database");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/admin");
const hospitalRoute = require("./routes/hospital");
const pharmacyRoute = require("./routes/pharmacy");
const messageRoutes = require("./routes/messageRoutes");
const chatRoutes = require("./routes/chatRoutes");
const socketHandler = require("./routes/socket");

// Cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const server = http.createServer(app);

// ===============================
// ✅ ALLOWED ORIGINS
// ===============================
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://medisense-frontend.vercel.app",
  "https://medisense-doctor-section.vercel.app",
  "https://medisense-pharmacy.vercel.app",
  "https://medisense-hospital.vercel.app",
  "https://medisense-admin.vercel.app",
];

// ===============================
// ✅ EXPRESS MIDDLEWARE
// ===============================
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
  })
);

// ===============================
// ✅ SOCKET.IO SETUP (RENDER SAFE)
// ===============================
const io = new Server(server, {
  transports: ["websocket"], // IMPORTANT
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

// Initialize socket logic
socketHandler(io);

// ===============================
// ✅ DATABASE CONNECTION
// ===============================
connectDB()
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
    process.exit(1);
  });

// ===============================
// ✅ ROUTES
// ===============================
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/hospital", hospitalRoute);
app.use("/pharmacy", pharmacyRoute);
app.use("/message", messageRoutes);
app.use("/message/chat", chatRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("🚀 MediSense Backend is Running");
});

// ===============================
// ✅ GLOBAL ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ===============================
// ✅ START SERVER
// ===============================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Socket.IO ready`);
});
