const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

// get all
router.get("/", async (req, res) => {
  const data = await Patient.find();
  res.json(data);
});

// add patient
router.post("/", async (req, res) => {
  const p = new Patient(req.body);
  await p.save();
  res.json({ msg: "Patient added" });
});

// approve
router.put("/approve/:id", async (req, res) => {
  await Patient.findByIdAndUpdate(req.params.id, { status: "Approved" });
  res.json({ msg: "Approved" });
});

// reject
router.put("/reject/:id", async (req, res) => {
  await Patient.findByIdAndUpdate(req.params.id, { status: "Rejected" });
  res.json({ msg: "Rejected" });
});

module.exports = router;