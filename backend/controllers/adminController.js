const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

/* GET ALL */
exports.getAdmins = async (req, res) => {
  const data = await Admin.find();
  res.json(data);
};

/* ADD ADMIN */
exports.addAdmin = async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = new Admin({
    username,
    password: hashedPassword
  });

  await admin.save();
  res.json({ msg: "Admin Added" });
};

/* APPROVE */
exports.approveAdmin = async (req, res) => {
  await Admin.findByIdAndUpdate(req.params.id, { status: "Active" });
  res.json({ msg: "Approved" });
};

/* REJECT */
exports.rejectAdmin = async (req, res) => {
  await Admin.findByIdAndUpdate(req.params.id, { status: "Rejected" });
  res.json({ msg: "Rejected" });
};

/* LOGIN */
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.json({ success: false, msg: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (isMatch) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false, msg: "Wrong password" });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};

/* FORGOT PASSWORD */
exports.forgotPassword = async (req, res) => {
  try {
    const { username, newPassword } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.json({ success: false, msg: "Admin not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    admin.password = hashedPassword;
    await admin.save();

    res.json({ success: true, msg: "Password updated" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};