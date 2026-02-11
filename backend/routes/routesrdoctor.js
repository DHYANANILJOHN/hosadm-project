const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// get all
router.get("/", async (req, res) => {
  const data = await Doctor.find();
  res.json(data);
});

// add doctor
router.post("/", async (req, res) => {
  const doc = new Doctor(req.body);
  await doc.save();
  res.json({ msg: "Doctor added" });
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