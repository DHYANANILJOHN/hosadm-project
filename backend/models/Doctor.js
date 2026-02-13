const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    specialty: String,
    experience: String,
    degree: String,
    phone: String,
    address: String,

    status: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true } // ✅ adds createdAt, updatedAt
);

module.exports = mongoose.model("Doctor", doctorSchema);