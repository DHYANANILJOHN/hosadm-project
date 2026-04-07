const bcrypt = require("bcryptjs");
const Patient = require("../models/Patient");

/* REGISTER */
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, age, dob, gender } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Required fields missing" });
    }

    const exists = await Patient.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const patient = await Patient.create({
      name,
      email,
      password: hashed,
      phone,
      age,
      dob,
      gender,
      status: "Pending"
    });

    res.status(201).json({
      msg: "Registered Successfully",
      patient
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


/* LOGIN */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    const match = await bcrypt.compare(password, patient.password);

    if (!match) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    res.json({
      msg: "Login Successful",
      patient
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


/* GET ALL */
exports.getPatients = async (req, res) => {
  try {
    const data = await Patient.find();
    res.json(data);
  } catch (err) {
    console.error("GET PATIENT ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


/* APPROVE */
exports.approvePatient = async (req, res) => {
  try {
    await Patient.findByIdAndUpdate(req.params.id, {
      status: "Approved"
    });
    res.json({ msg: "Approved" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};


/* REJECT */
exports.rejectPatient = async (req, res) => {
  try {
    await Patient.findByIdAndUpdate(req.params.id, {
      status: "Rejected"
    });
    res.json({ msg: "Rejected" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};


/* RESET PASSWORD */
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(404).json({ msg: "Patient not found" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    patient.password = hashed;
    await patient.save();

    res.json({ msg: "Password reset successful" });

  } catch (err) {
    console.error("RESET ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};