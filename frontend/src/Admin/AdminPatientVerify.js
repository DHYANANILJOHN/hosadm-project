import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

function AdminPatientVerify() {
  const [patients, setPatients] = useState([]);

  // 🔥 Fetch patients from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/Patient")
      .then((res) => {
        setPatients(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ✅ Approve patient
  const handleAccept = (id) => {
    axios
      .put(`http://localhost:5000/Patient/approve/${id}`)
      .then(() => {
        alert("Approved");
        window.location.reload(); // refresh page
      })
      .catch((err) => console.log(err));
  };

  // ❌ Reject patient
  const handleReject = (id) => {
    axios
      .put(`http://localhost:5000/Patient/reject/${id}`)
      .then(() => {
        alert("Rejected");
        window.location.reload(); // refresh page
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="dashboard-bg">
      <nav className="navbar navbar-dark bg-primary fixed-top">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">Patient Verification</span>
          <Link to="/addash">
            <button className="btn btn-light btn-sm">Back</button>
          </Link>
        </div>
      </nav>

      <div className="verify-container pt-5 mt-4">
        <h3 className="text-center fw-bold mb-4">
          Patient Verification Details
        </h3>

        <div className="container">
          {patients.map((p) => (
            <div className="card shadow-sm p-3 mb-3" key={p._id}>
              <h5 className="fw-bold">{p.name}</h5>

              <p><strong>Age:</strong> {p.age}</p>
              <p><strong>Gender:</strong> {p.gender}</p>
              <p><strong>Phone:</strong> {p.phone}</p>
              <p><strong>Address:</strong> {p.address}</p>
              <p><strong>Disease:</strong> {p.disease}</p>

              <p>
                <strong>Status:</strong>
                <span
                  className={`badge ms-1 ${
                    p.status === "Approved"
                      ? "bg-success"
                      : p.status === "Rejected"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                  }`}
                >
                  {p.status}
                </span>
              </p>

              {p.status === "Pending" && (
                <div className="mt-2">
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleAccept(p._id)}
                  >
                    Accept
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleReject(p._id)}
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

export default AdminPatientVerify;