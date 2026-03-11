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

    axios
      .post("http://localhost:5000/api/authPatient/register", form)
      .then((response) => {
        alert("Registered Successfully!");
        console.log(response.data);
      })
      .catch((error) => {
        alert("Registration Failed");
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
          onChange={handleChange}
        /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        /><br />

        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
        /><br />

        <input
          type="date"
          name="dob"
          onChange={handleChange}
        /><br />

        <select name="gender" onChange={handleChange}>
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