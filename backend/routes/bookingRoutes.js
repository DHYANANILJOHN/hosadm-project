const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// ✅ GET ALL BOOKINGS
router.get("/", async (req, res) => {
  try {
    const data = await Booking.find()
      .populate("doctorId")
      .populate("patientId");

    res.json(data);
  } catch (err) {
    console.error("GET BOOKINGS ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ CREATE BOOKING
router.post("/", async (req, res) => {
  try {
    const { patientId, doctorId, date } = req.body;

    // 🔴 BASIC VALIDATION
    if (!patientId || !doctorId || !date) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const b = new Booking(req.body);
    await b.save();

    res.json({ msg: "Booking created" });

  } catch (err) {
    console.error("BOOKING ERROR:", err);
    res.status(500).json({
      msg: "Server error",
      error: err.message   // 🔍 helps debugging
    });
  }
});

// ✅ CANCEL BOOKING
router.put("/cancel/:id", async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, { status: "Cancelled" });
    res.json({ msg: "Cancelled" });
  } catch (err) {
    console.error("CANCEL ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;