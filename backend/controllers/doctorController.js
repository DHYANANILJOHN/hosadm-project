const Doctor = require("../models/Doctor");
const bcrypt = require("bcrypt");


// ===============================
// Doctor Login
// ===============================
exports.doctorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(400).json({ msg: "Doctor not found" });
    }

    // check if admin approved//
    if (doctor.status !== "Active") {
      return res.status(403).json({ msg: "Doctor not approved yet" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    res.json({
      msg: "Login successful",
      doctor: {
        id: doctor._id,
        name: doctor.name,
        specialization: doctor.specialization,
        experience: doctor.experience,
        phone: doctor.phone,
        email: doctor.email
      }
    });

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};


// Get All Doctors

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching doctors" });
  }
};



// Add Doctor

exports.addDoctor = async (req, res) => {
  try {

    const { email, password } = req.body;

    // check duplicate email
    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      return res.status(400).json({ msg: "Doctor already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const doctor = new Doctor({
      ...req.body,
      password: hashedPassword,
      status: "Pending"
    });

    await doctor.save();

    res.json({ msg: "Doctor added successfully" });

  } catch (error) {
    res.status(500).json({ msg: "Error adding doctor" });
  }
};


// Approve Doctor

exports.approveDoctor = async (req, res) => {
  try {

    await Doctor.findByIdAndUpdate(req.params.id, {
      status: "Active"
    });

    res.json({ msg: "Doctor approved successfully" });

  } catch (error) {
    res.status(500).json({ msg: "Error approving doctor" });
  }
};

// ===============================
// Reject Doctor

exports.rejectDoctor = async (req, res) => {
  try {

    await Doctor.findByIdAndUpdate(req.params.id, {
      status: "Rejected"
    });

    res.json({ msg: "Doctor rejected successfully" });

  } catch (error) {
    res.status(500).json({ msg: "Error rejecting doctor" });
  }
};

// Doctor Registration

exports.registerDoctor = async (req, res) => {

  try {

    const { email, password } = req.body;

    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      return res.status(400).json({ msg: "Doctor already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const doctor = new Doctor({
      ...req.body,
      password: hashedPassword,
      status: "Pending"
    });

    await doctor.save();

    res.json({
      msg: "Doctor registered successfully. Wait for admin approval."
    });

  } catch (error) {

    res.status(500).json({ msg: "Error registering doctor" });

  }

};