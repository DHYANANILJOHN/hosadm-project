const mongoose = require("mongoose");

const authPatientSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
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

  phone: {
    type: String
  },

  age: {
    type: Number
  },

  dob: {
    type: Date
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"]
  }

});

module.exports = mongoose.model("AuthPatient", authPatientSchema);