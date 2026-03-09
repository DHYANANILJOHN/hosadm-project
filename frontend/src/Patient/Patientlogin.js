import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Patient.css";

function PatientLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/authPatient/login", form)
      .then((response) => {
        alert("Login Successful!");
        console.log(response.data);
      })
      .catch((error) => {
        alert("Login Failed");
        console.log(error);
      });
  };

  return (
    <div className="auth-container">
      <h2>Patient Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        /><br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        /><br /><br />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/testrun">Register here</Link>
      </p>
    </div>
  );
}

export default PatientLogin;