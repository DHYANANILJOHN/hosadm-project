const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const bcrypt = require("bcrypt");

// ======================
// Doctor Registration
// ======================
router.post("/register", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { name, specialty, email, password } = req.body;

    // ✅ Required validation
    if (!name || !specialty || !email || !password) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    // ✅ Check duplicate email
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ msg: "Doctor already registered" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ SAFE DATA HANDLING (fixes 500 errors)
    const doctor = new Doctor({
      name,
      specialty,
      email,
      password: hashedPassword,
      age: req.body.age ? Number(req.body.age) : undefined,
      experience: req.body.experience ? Number(req.body.experience) : undefined,
      phone: req.body.phone || undefined,
      status: "Pending"
    });

    await doctor.save();

    res.json({
      msg: "Doctor registered successfully. Wait for admin approval."
    });

  } catch (error) {
    console.log("🔥 ERROR:", error);

    // ✅ Duplicate key error fix
    if (error.code === 11000) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    res.status(500).json({ msg: error.message });
  }
});


// ======================
// Get All Doctors
// ======================
router.get("/", async (req, res) => {
  try {
    const data = await Doctor.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching doctors" });
  }
});


// ======================
// Add Doctor (Admin)
// ======================
router.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const doctor = new Doctor({
      name: req.body.name,
      specialty: req.body.specialty,
      email: req.body.email,
      password: hashedPassword,
      age: req.body.age ? Number(req.body.age) : undefined,
      experience: req.body.experience ? Number(req.body.experience) : undefined,
      phone: req.body.phone || undefined,
      status: "Active"
    });

    await doctor.save();

    res.json({ msg: "Doctor added successfully" });

  } catch (error) {
    console.log("🔥 ERROR:", error);
    res.status(500).json({ msg: error.message });
  }
});


// ======================
// Doctor Login
// ======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    if (doctor.status !== "Active") {
      return res.status(403).json({ msg: "Doctor not approved yet" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    res.json({
      msg: "Login successful",
      doctor
    });

  } catch (error) {
    console.log("🔥 ERROR:", error);
    res.status(500).json({ msg: "Login failed" });
  }
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