const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
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
      match: /^[0-9]{10}$/   // only 10 digit numbers
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
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);