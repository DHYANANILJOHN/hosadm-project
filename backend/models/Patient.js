const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  age: Number,
  dob: Date,
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"]
  },
  address: String,
  disease: String,
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  }
});

module.exports = mongoose.model("Patient", patientSchema);