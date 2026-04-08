import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Patient.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    if (!form.email || !form.password) {
      toast.error("Please enter email and password");
      return;
    }

    axios
      .post("http://localhost:5000/api/patients/login", form)
      .then((response) => {
        toast.success(response.data.msg || "Login Successful!");

        localStorage.setItem("patient", JSON.stringify(response.data.patient));
        setPatient(response.data.patient);
      })
      .catch((error) => {
        toast.error(error.response?.data?.msg || "Login Failed");
        console.log(error);
      });
  };

  const logout = () => {
    localStorage.removeItem("patient");
    setPatient(null);
    toast.info("Logged out successfully");
  };

  // DASHBOARD
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

        {/* ✅ HOME LINK (Dashboard) */}
        <p style={{ marginTop: "10px" }}>
          <Link to="/home">Go to Home</Link>
        </p>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    );
  }

  // LOGIN PAGE
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

      {/* ✅ HOME LINK (Login page) */}
      <p>
        <Link to="/home">Go to Home</Link>
      </p>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default PatientLogin;