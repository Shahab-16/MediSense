const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    additionalDetails: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Profile",
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    otp: {
        type: Number,
        required: false 
    },
    medicines: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicines"
    }],
    doctors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    }]
}, {
    timestamps: true 
});

module.exports = mongoose.model("User", UserSchema);
