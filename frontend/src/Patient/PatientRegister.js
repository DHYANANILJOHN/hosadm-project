import React, { useState } from "react";
import axios from "axios";
import "./Patient.css";

function PatientRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
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

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default PatientRegister;