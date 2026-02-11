const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  phone: String,
  address: String,
  disease: String,
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Patient", patientSchema);