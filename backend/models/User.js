const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
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
      trim: true,
    },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    role: {
      type: String,
      enum: ["user", "doctor", "admin", "hospital", "pharmacy"],
      default: "user",
    },
    medicineCart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicines",
      },
    ],
    token: {
      type: String,
      trim: true,
    },
    tokenExpiresAt: {
      type: Date,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
