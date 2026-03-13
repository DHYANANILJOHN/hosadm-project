const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const bcrypt = require("bcrypt");


// ======================
// Doctor Registration
// ======================
router.post("/register", async (req, res) => {

  try {

    const { email, password } = req.body;

    // check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      return res.status(400).json({ msg: "Doctor already registered" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new Doctor({
      ...req.body,
      password: hashedPassword,
      status: "Pending"   // wait for admin approval
    });

    await doctor.save();

    res.json({
      msg: "Doctor registered successfully. Wait for admin approval."
    });

  } catch (error) {
    res.status(500).json({ msg: "Registration failed" });
  }

});


// ======================
// Get All Doctors
// ======================
router.get("/", async (req, res) => {
  const data = await Doctor.find();
  res.json(data);
});


// ======================
// Add Doctor (Admin)
// ======================
router.post("/", async (req, res) => {

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const d = new Doctor({
    ...req.body,
    password: hashedPassword
  });

  await d.save();

  res.json({ msg: "Doctor added" });
});


// ======================
// Doctor Login
// ======================
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const doctor = await Doctor.findOne({ email });

  if (!doctor) {
    return res.status(404).json({ msg: "Doctor not found" });
  }

  // check approval
  if (doctor.status !== "Active") {
    return res.status(403).json({ msg: "Doctor not approved yet" });
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


// ======================
// Approve Doctor
// ======================
router.put("/approve/:id", async (req, res) => {
  await Doctor.findByIdAndUpdate(req.params.id, { status: "Active" });
  res.json({ msg: "Approved" });
});


// ======================
// Reject Doctor
// ======================
router.put("/reject/:id", async (req, res) => {
  await Doctor.findByIdAndUpdate(req.params.id, { status: "Rejected" });
  res.json({ msg: "Rejected" });
});

module.exports = router;