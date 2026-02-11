const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  experience: String,
  degree: String,
  phone: String,
  address: String,
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Doctor", doctorSchema);