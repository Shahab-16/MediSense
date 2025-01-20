const express = require('express');
const cors = require('cors');
const connectDB = require('./config/Database');
const userRoute = require('./routes/userRoute');
require('dotenv').config();

const app = express();
console.log("Backend is running");
// Connect to the database
connectDB();

console.log("Backend is running");
// Allowed origins for CORS

app.use(cors());

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
