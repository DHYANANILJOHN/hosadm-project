const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    role: {
      type: String,
      enum: ["doctor", "patient"],
      required: true
    },
    specialty: String,
    experience: String,
    degree: String,
    age: Number,
    gender: String,
    phone: String,
    address: String,
    disease: String,
    status: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);