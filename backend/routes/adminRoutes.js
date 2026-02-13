const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");

// get all
router.get("/", async (req, res) => {
  const data = await Admin.find();
  res.json(data);
});

// add admin
router.post("/", async (req, res) => {
  const a = new Admin(req.body);
  await a.save();
  res.json({ msg: "Admin added" });
});

// approve
router.put("/approve/:id", async (req, res) => {
  await Admin.findByIdAndUpdate(req.params.id, { status: "Active" });
  res.json({ msg: "Approved" });
});

// reject
router.put("/reject/:id", async (req, res) => {
  await Admin.findByIdAndUpdate(req.params.id, { status: "Rejected" });
  res.json({ msg: "Rejected" });
});

module.exports = router;