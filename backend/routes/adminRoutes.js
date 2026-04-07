const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.json({ success: false, msg: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.json({ success: false, msg: "Wrong password" });
    }

    // ✅ FIX: add success flag
    res.json({
      success: true,
      msg: "Login success",
      admin
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/* FORGOT PASSWORD */
router.post("/forgot-password", async (req, res) => {
  try {
    const { username, newPassword } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.json({ success: false, msg: "Admin not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;
    await admin.save();

    res.json({ success: true, msg: "Password updated" });

  } catch (err) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;