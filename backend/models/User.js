const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
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
        enum: ["user","doctor","admin"],
        default: "user"
    },
    token: {
        type: String,
        trim: true
    },
    tokenExpiresAt: {
        type: Date,
    },
}, {
    timestamps: true 
});

module.exports = mongoose.model("User", UserSchema);
