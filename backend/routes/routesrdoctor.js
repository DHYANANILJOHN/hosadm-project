const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const bcrypt = require("bcrypt");

// get all
router.get("/", async (req, res) => {
  const data = await Doctor.find();
  res.json(data);
});

// add doctor
router.post("/", async (req, res) => {

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const d = new Doctor({
    ...req.body,
    password: hashedPassword
  });

  await d.save();

  res.json({ msg: "Doctor added" });
});


// ✅ LOGIN ROUTE
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const doctor = await Doctor.findOne({ email });

  if (!doctor) {
    return res.status(404).json({ msg: "Doctor not found" });
  }

  const isMatch = await bcrypt.compare(password, doctor.password);

  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid password" });
  }

  res.json({
    msg: "Login successful",
    doctor: doctor
  });

});


// approve
router.put("/approve/:id", async (req, res) => {
  await Doctor.findByIdAndUpdate(req.params.id, { status: "Active" });
  res.json({ msg: "Approved" });
});

// reject
router.put("/reject/:id", async (req, res) => {
  await Doctor.findByIdAndUpdate(req.params.id, { status: "Rejected" });
  res.json({ msg: "Rejected" });
});

module.exports = router;