import React, { useState, useEffect } from "react";
import "./AdminExtra.css";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminDoctorVerify() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
   axios.get("http://localhost:5000/api/doctors")
      .then(res => setDoctors(res.data))
      .catch(err => console.log(err));
  };

  const handleApprove = (id) => {
   axios.put(`http://localhost:5000/api/doctors/approve/${id}`)
      .then(() => {
        setDoctors(prev =>
          prev.map(d =>
            d._id === id ? { ...d, status: "Active" } : d
          )
        );
      })
      .catch(err => alert("Error approving doctor"));
  };

  const handleReject = (id) => {
   axios.put(`http://localhost:5000/api/doctors/reject/${id}`)
      .then(() => {
        setDoctors(prev =>
          prev.map(d =>
            d._id === id ? { ...d, status: "Rejected" } : d
          )
        );
      })
      .catch(err => alert("Error rejecting doctor"));
  };

  return (
    <div className="dashboard-bg">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-brand">👨‍⚕️ Doctor Verification</div>
        <Link to="/addash">
          <button className="logout-btn" style={{ background: "#6c757d" }}>
            Back to Dashboard
          </button>
        </Link>
      </nav>

      {/* MAIN CONTAINER */}
      <div className="verify-container">
        <div className="section">
          <h3 style={{ color: "white", marginBottom: "20px" }}>Verification Requests</h3>
          
          <div className="grid-container">
            {doctors.length === 0 ? (
              <p style={{ color: "white" }}>No doctor records found.</p>
            ) : (
              doctors.map((d) => (
                <div className="card" key={d._id}>
                  {/* CARD HEADER: Name and Status */}
                  <div className="card-header">
                    <h4>Dr. {d.name}</h4>
                    <span className={`status-badge ${d.status}`}>
                      {d.status}
                    </span>
                  </div>

                  {/* CARD BODY: Professional Info */}
                  <div className="patient-info">
                    <p><strong>Specialty:</strong> {d.specialty}</p>
                    <p><strong>Experience:</strong> {d.experience} Years</p>
                    <p><strong>Phone:</strong> {d.phone}</p>
                    <p><strong>Email:</strong> {d.email}</p>
                  </div>

                  {/* ACTIONS: Only show if Pending */}
                  {d.status === "Pending" && (
                    <div className="btn-group">
                      <button 
                        className="accept-btn" 
                        onClick={() => handleApprove(d._id)}
                      >
                        Approve
                      </button>
                      <button 
                        className="reject-btn" 
                        onClick={() => handleReject(d._id)}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDoctorVerify;