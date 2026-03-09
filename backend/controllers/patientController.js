const Patient = require("../models/Patient");

exports.getPatients = async (req, res) => {
  const data = await Patient.find();
  res.json(data);
};

exports.addPatient = async (req, res) => {
  const p = new Patient(req.body);
  await p.save();
  res.json({ msg: "Patient added" });
};

exports.approvePatient = async (req, res) => {
  await Patient.findByIdAndUpdate(req.params.id, { status: "Approved" });
  res.json({ msg: "Approved" });
};

exports.rejectPatient = async (req, res) => {
  await Patient.findByIdAndUpdate(req.params.id, { status: "Rejected" });
  res.json({ msg: "Rejected" });
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(404).json({ msg: "Patient not found" });
    }

    patient.password = newPassword;
    await patient.save();

    res.json({ msg: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};