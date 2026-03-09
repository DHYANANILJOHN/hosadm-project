const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  specialty: {
    type: String,
    required: true
  },

  experience: {
    type: Number
  },

  phone: {
    type: String,
    match: /^[0-9]{10}$/
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "Pending"
  }

});

module.exports = mongoose.model("Doctor", doctorSchema);