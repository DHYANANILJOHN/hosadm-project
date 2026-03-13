import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDoctorVerify() {
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/doctors")
      .then((res) => {
        setDoctors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Approve doctor
  const handleApprove = (id) => {
    axios
      .put(`http://localhost:5000/api/doctors/approve/${id}`)
      .then(() => {
        setDoctors((prev) =>
          prev.map((d) =>
            d._id === id ? { ...d, status: "Active" } : d
          )
        );
      })
      .catch((err) => console.log(err));
  };

  // Reject doctor
  const handleReject = (id) => {
    axios
      .put(`http://localhost:5000/api/doctors/reject/${id}`)
      .then(() => {
        setDoctors((prev) =>
          prev.map((d) =>
            d._id === id ? { ...d, status: "Rejected" } : d
          )
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="dashboard-bg">

      <nav className="navbar navbar-dark bg-primary fixed-top">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">Doctor Verification</span>
          <Link to="/addash">
            <button className="btn btn-light btn-sm">Back</button>
          </Link>
        </div>
      </nav>

      <div className="verify-container pt-5 mt-4">
        <h3 className="text-center fw-bold mb-4">Doctor Verification Details</h3>

        <div className="container">
          {doctors.map((d) => (
            <div className="card shadow-sm p-3 mb-3" key={d._id}>

              <h5 className="fw-bold">{d.name}</h5>

              <p><strong>Specialty:</strong> {d.specialty}</p>
              <p><strong>Experience:</strong> {d.experience}</p>
              <p><strong>Phone:</strong> {d.phone}</p>
              <p><strong>Email:</strong> {d.email}</p>

              <p>
                <strong>Status:</strong>
                <span
                  className={`badge ms-2 ${
                    d.status === "Active"
                      ? "bg-success"
                      : d.status === "Rejected"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                  }`}
                >
                  {d.status}
                </span>
              </p>

              {d.status === "Pending" && (
                <div className="mt-2">
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleApprove(d._id)}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleReject(d._id)}
                  >
                    Reject
                  </button>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDoctorVerify;