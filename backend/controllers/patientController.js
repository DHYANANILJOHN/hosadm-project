const Patient = require("../models/Patient");

exports.getPatients = async (req, res) => {
  const data = await Patient.find();
  res.json(data);
};

exports.addPatient = async (req, res) => {
  const p = new Patient(req.body);
  await p.save();
  res.json({ msg: "Patient Added" });
};

exports.approvePatient = async (req, res) => {
  await Patient.findByIdAndUpdate(req.params.id, { status: "Approved" });
  res.json({ msg: "Approved" });
};

exports.rejectPatient = async (req, res) => {
  await Patient.findByIdAndUpdate(req.params.id, { status: "Rejected" });
  res.json({ msg: "Rejected" });
};