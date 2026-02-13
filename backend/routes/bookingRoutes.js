const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// get all bookings
router.get("/", async (req, res) => {
  const data = await Booking.find()
    .populate("doctorId")
    .populate("patientId");

  res.json(data);
});

// create booking
router.post("/", async (req, res) => {
  const b = new Booking(req.body);
  await b.save();
  res.json({ msg: "Booking created" });
});

// cancel booking
router.put("/cancel/:id", async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, { status: "Cancelled" });
  res.json({ msg: "Cancelled" });
});

module.exports = router;