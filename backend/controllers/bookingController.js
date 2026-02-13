const Booking = require("../models/Booking");

exports.getBookings = async (req, res) => {
  const data = await Booking.find()
    .populate("doctorId")
    .populate("patientId");

  res.json(data);
};

exports.addBooking = async (req, res) => {
  const b = new Booking(req.body);
  await b.save();
  res.json({ msg: "Booking created" });
};

exports.cancelBooking = async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, { status: "Cancelled" });
  res.json({ msg: "Cancelled" });
};