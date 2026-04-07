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
    JSON.parse(localStorage.getItem("patient")) || null
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!form.email || !form.password) {
      alert("Please enter email and password");
      return;
    }

    axios
      .post("http://localhost:5000/api/patients/login", form)
      .then((response) => {

        // ✅ SHOW BACKEND MESSAGE
        alert(response.data.msg || "Login Successful!");

        localStorage.setItem("patient", JSON.stringify(response.data.patient));

        setPatient(response.data.patient);

      })
      .catch((error) => {
        // ✅ SHOW REAL ERROR
        alert(error.response?.data?.msg || "Login Failed");
        console.log(error);
      });
  };

  const logout = () => {
    localStorage.removeItem("patient");
    setPatient(null);
  };

  // ============================
  // DASHBOARD
  // ============================
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
        <p><b>Gender:</b> {patient.gender}</p>

        <h3>Medical History</h3>
        <p>No history available</p>

        <br />

        <Link to="/Booking">
          <button style={{ marginBottom: "10px" }}>
            Book Appointment
          </button>
        </Link>

        <br />

        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  // ============================
  // LOGIN PAGE
  // ============================
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