const Doctor = require("../models/Doctor");

exports.getDoctors = async (req, res) => {
  const data = await Doctor.find();
  res.json(data);
};

exports.addDoctor = async (req, res) => {
  const doc = new Doctor(req.body);
  await doc.save();
  res.json({ msg: "Doctor Added" });
};

exports.approveDoctor = async (req, res) => {
  await Doctor.findByIdAndUpdate(req.params.id, { status: "Active" });
  res.json({ msg: "Approved" });
};

exports.rejectDoctor = async (req, res) => {
  await Doctor.findByIdAndUpdate(req.params.id, { status: "Rejected" });
  res.json({ msg: "Rejected" });
};