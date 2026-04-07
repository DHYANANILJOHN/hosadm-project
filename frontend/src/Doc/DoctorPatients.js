import { useState, useEffect } from "react";
import "./Doctor.css";
import axios from "axios";

function DoctorPatients() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    const doctor = JSON.parse(localStorage.getItem("doctor"));

    if (!doctor || !doctor._id) return;

    axios
      .get(`http://localhost:5000/api/bookings/doctor/${doctor._id}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h4 className="mb-4">Patient Details</h4>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map((b) => (
          <div
            key={b._id}
            className={`card card-custom p-3 mb-3 patient-card ${b.status.toLowerCase()}`}
          >
            {/* ✅ NAME */}
            <p>
              <b>Name:</b>{" "}
              {b.patientId ? b.patientId.name : b.guestName}
            </p>

            {/* ✅ FULL DETAILS ONLY IF LOGGED-IN */}
            {b.patientId && (
              <>
                <p><b>Email:</b> {b.patientId.email}</p>
                <p><b>Phone:</b> {b.patientId.phone}</p>
                <p><b>Age:</b> {b.patientId.age}</p>
                <p><b>Gender:</b> {b.patientId.gender}</p>
              </>
            )}

            {/* COMMON */}
            <p><b>Date:</b> {b.date}</p>
            <p><b>Time:</b> {b.time}</p>
            <p><b>Reason:</b> {b.reason}</p>

            <span className={`badge ${
              b.status === "Approved" ? "bg-success" :
              b.status === "Rejected" ? "bg-danger" :
              "bg-warning text-dark"
            }`}>
              {b.status}
            </span>
          </div>
        ))
      )}
    </>
  );
}

export default DoctorPatients;