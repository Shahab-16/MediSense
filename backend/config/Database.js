const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.Database_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;