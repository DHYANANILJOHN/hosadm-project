const bcrypt = require("bcryptjs");
const AuthPatient = require("../models/AuthPatient");


// REGISTER
exports.register = async (req, res) => {
  try {

    const { name, email, password, phone, age, dob, gender } = req.body;

    const existingUser = await AuthPatient.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newPatient = new AuthPatient({
      name,
      email,
      password: hashedPassword,
      phone,
      age,
      dob,
     gender
    });

    await newPatient.save();

    res.status(201).json({
      message: "Registered Successfully",
      patient: newPatient
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// LOGIN
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await AuthPatient.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    res.status(200).json({
      message: "Login Successful",
      patient: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        age: user.age,
        dob: user.dob,
        gender: user.gender
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};