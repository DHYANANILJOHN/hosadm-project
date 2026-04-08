import React, { useState, useEffect } from "react";
import "./Booking.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      .catch(err => {
        console.log(err);
        toast.error("Failed to load doctors");
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.doctorId || !form.date) {
      toast.warning("Please fill required fields");
      return;
    }

    const patient = JSON.parse(localStorage.getItem("patient"));

    let bookingData = {
      doctorId: form.doctorId,
      date: form.date,
      time: form.time,
      reason: form.reason,
    };

    if (patient && patient._id) {
      bookingData.patientId = patient._id;
    } else {
      bookingData.guestName = form.name;
    }

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ SHOW BACKEND MESSAGE
        toast.success(data.msg || "Appointment Booked!");

        setForm({
          name: "",
          doctorId: "",
          date: "",
          time: "",
          reason: "",
        });
      } else {
        // ❌ SHOW BACKEND ERROR
        toast.error(data.msg || "Booking failed");
      }

    } catch (err) {
      console.error(err);
      toast.error("Server error");
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
          placeholder="Reason for visit"
          value={form.reason}
          onChange={handleChange}
        />

        <button type="submit">Book Appointment</button>

        <p className="back-home">
          <Link to="/home">Back to Home</Link>
        </p>
      </form>

      {/* ✅ Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Booking;