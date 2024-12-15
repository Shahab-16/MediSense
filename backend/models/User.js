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
    token: {
        type: String,
        trim: true
    },
    tokenExpiresAt: {
        type: Date,
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
