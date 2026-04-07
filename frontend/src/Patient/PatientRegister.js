import React, { useState } from "react";
import axios from "axios";
import "./Patient.css";

function PatientRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    dob: "",
    gender: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!form.name || !form.email || !form.password) {
      alert("Name, Email and Password are required");
      return;
    }

    axios
      .post("http://localhost:5000/api/patients/register", form)
      .then((response) => {
        // ✅ SHOW BACKEND MESSAGE
        alert(response.data.msg || "Registered Successfully!");

        // OPTIONAL: clear form after success
        setForm({
          name: "",
          email: "",
          password: "",
          phone: "",
          age: "",
          dob: "",
          gender: ""
        });

      })
      .catch((error) => {
        // ✅ SHOW REAL ERROR
        alert(error.response?.data?.msg || "Registration Failed");
        console.log(error);
      });
  };

  return (
    <div className="auth-container">
      <h2>Patient Registration</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        /><br />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        /><br />

        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
        /><br />

        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select><br />

        <button type="submit">Register</button>

      </form>
    </div>
  );
}

export default PatientRegister;