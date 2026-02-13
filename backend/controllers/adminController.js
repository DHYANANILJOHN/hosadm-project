const Admin = require("../models/Admin");

exports.getAdmins = async (req, res) => {
  const data = await Admin.find();
  res.json(data);
};

exports.addAdmin = async (req, res) => {
  const a = new Admin(req.body);
  await a.save();
  res.json({ msg: "Admin Added" });
};

exports.approveAdmin = async (req, res) => {
  await Admin.findByIdAndUpdate(req.params.id, { status: "Active" });
  res.json({ msg: "Approved" });
};

exports.rejectAdmin = async (req, res) => {
  await Admin.findByIdAndUpdate(req.params.id, { status: "Rejected" });
  res.json({ msg: "Rejected" });
};