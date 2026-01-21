import React, { useState } from "react";
import "./Booking.css";
import { Link } from "react-router-dom"; 

function Booking() {
  const [form, setForm] = useState({
    name: "",
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.doctor || !form.date || !form.time) {
      alert("Please fill all required fields.");
      return;
    }

    alert(
      ` Appointment booked!\n\nName: ${form.name}\nDoctor: ${form.doctor}\nDate: ${form.date}\nTime: ${form.time}`
    );

    setForm({ name: "", doctor: "", date: "", time: "", reason: "" });
  };

  return (
    <div className="booking-container">
      <h2>Doctor Appointment Booking</h2>

      <form onSubmit={handleSubmit} className="booking-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <select
          name="doctor"
          value={form.doctor}
          onChange={handleChange}
        >
          <option value="">Select Doctor</option>
          <option value="Dr. Smith">Dr. Smith (Cardiologist)</option>
          <option value="Dr. Alice">Dr. Alice (Dermatologist)</option>
          <option value="Dr. John">Dr. John (Pediatrician)</option>
          <option value="Dr. Amit Patel">Dr. Amit Patel(Orthopedic Surgeon)</option>
        </select>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
        />

        <textarea
          name="reason"
          placeholder="Reason for visit (optional)"
          value={form.reason}
          onChange={handleChange}
        />

        <button type="submit">Book Appointment</button>
      </form>

      <p className="back-home">
        <Link to="/home">Back to Home</Link> 
      </p>
    </div>
  );
}

export default Booking;