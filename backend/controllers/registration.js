const User = require("../models/userregistration");

/* Register Doctor or Patient */
exports.registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "Registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* Get Doctors */
exports.getDoctors = async (req, res) => {
  const doctors = await User.find({ role: "doctor" });
  res.json(doctors);
};

/* Get Patients */
exports.getPatients = async (req, res) => {
  const patients = await User.find({ role: "patient" });
  res.json(patients);
};

/* Approve / Reject */
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  res.json(user);
};