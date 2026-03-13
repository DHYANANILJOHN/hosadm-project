import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Patient.css";

function PatientLogin() {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [patient, setPatient] = useState(
    JSON.parse(localStorage.getItem("patient"))
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/authPatient/login", form)
      .then((response) => {

        alert("Login Successful!");

        // save patient data
        localStorage.setItem("patient", JSON.stringify(response.data.patient));

        setPatient(response.data.patient);

      })
      .catch((error) => {
        alert("Login Failed");
        console.log(error);
      });
  };

  const logout = () => {
    localStorage.removeItem("patient");
    setPatient(null);
  };

  // If patient logged in → show dashboard
  if (patient) {
    return (
      <div className="auth-container">
        <h2>Patient Dashboard</h2>

        <h3>Profile</h3>
        <p><b>Name:</b> {patient.name}</p>
        <p><b>Email:</b> {patient.email}</p>
        <p><b>Phone:</b> {patient.phone}</p>
        <p><b>Age:</b> {patient.age}</p>
        <p><b>DOB:</b> {patient.dob}</p>
        <p><b>Gender:</b> {patient.sex}</p>

        <h3>Medical History</h3>
        <p>No history available</p>

        <br />
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  // Login Page
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
  <Link to="/forgot">Forgot Password?</Link>
</p>

<p>
  Don't have an account? <Link to="/testrun">Register here</Link>
</p>
    </div>
  );
}

export default PatientLogin;