import React, { useState, useEffect } from "react";
import "./Booking.css";
import { Link } from "react-router-dom";

function Booking() {
  const [form, setForm] = useState({
    name: "",
    doctorId: "",
    date: "",
    time: "",
    reason: "",
  });

  const [doctors, setDoctors] = useState([]);

  // 🔹 Fetch approved doctors
  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then(res => res.json())
      .then(data => {
        const approvedDoctors = data.filter(d => d.status === "Active");
        setDoctors(approvedDoctors);
      })
      .catch(err => console.log(err));
  }, []);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.doctorId || !form.date || !form.time) {
      alert("Please fill all required fields");
      return;
    }

    // ✅ GET LOGGED-IN PATIENT
    const patient = JSON.parse(localStorage.getItem("patient"));

    // ❗ Safety check
    if (!patient || !patient.id) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: patient.id,     // ✅ FIXED
          doctorId: form.doctorId,
          date: form.date,
          time: form.time,
          reason: form.reason,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Appointment Booked!");
        
        // 🔄 Reset form
        setForm({
          name: "",
          doctorId: "",
          date: "",
          time: "",
          reason: "",
        });

      } else {
        alert(data.msg || "Booking failed");
      }

    } catch (err) {
      console.error("Booking error:", err);
      alert("❌ Server error");
    }
  };

  return (
    <div className="booking-container">

      <form className="booking-form" onSubmit={handleSubmit}>
        <h2>Book Appointment</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        {/* ✅ Doctor List */}
        <select
          name="doctorId"
          value={form.doctorId}
          onChange={handleChange}
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.name} ({doc.specialty})
            </option>
          ))}
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

        <p className="back-home">
          <Link to="/home">Back to Home</Link>
        </p>
      </form>

    </div>
  );
}

export default Booking;