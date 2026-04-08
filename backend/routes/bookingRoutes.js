const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// CREATE BOOKING (LOGIN OR GUEST)
router.post("/", async (req, res) => {
  try {
    const { patientId, guestName, doctorId, date, time, reason } = req.body;

    // validation fix → prevents 400 error
    if (!doctorId || !date || !time) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const booking = new Booking({
      patientId: patientId || null,
      guestName: guestName || null,
      doctorId,
      date,
      time,
      reason: reason || ""
    });

    await booking.save();

    res.json({ success: true, booking });

  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


// GET ALL BOOKINGS (ADMIN)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("patientId")
      .populate("doctorId");

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET BOOKINGS FOR SPECIFIC DOCTOR
router.get("/doctor/:id", async (req, res) => {
  try {
    const bookings = await Booking.find({ doctorId: req.params.id })
      .populate("patientId")
      .populate("doctorId");

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;