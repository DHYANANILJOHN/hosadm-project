import React, { useState, useEffect } from "react";
import "./AdminExtra.css";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminPatientVerify() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    axios
      .get("http://localhost:5000/api/patients")
      .then(res => setPatients(res.data))
      .catch(err => {
        console.log("FETCH ERROR:", err);
        alert("Failed to load patients");
      });
  };

  const handleStatusUpdate = (id, status) => {
    const endpoint = status === "Approved" ? "approve" : "reject";

    axios
      .put(`http://localhost:5000/api/patients/${endpoint}/${id}`)
      .then(() => {
        alert(`Patient ${status}`);

        // ✅ REFRESH FROM DB (BEST PRACTICE)
        fetchPatients();
      })
      .catch(err => {
        console.log("UPDATE ERROR:", err);
        alert("Failed to update status");
      });
  };

  return (
    <div className="dashboard-bg">
      <nav className="navbar">
        <div className="nav-brand">🏥 Patient Verification</div>
        <Link to="/addash">
          <button className="logout-btn" style={{ background: "#6c757d" }}>
            Back to Dashboard
          </button>
        </Link>
      </nav>

      <div className="verify-container">
        <div className="section">
          <h3 style={{ color: "white", marginBottom: "20px" }}>
            Patient Requests
          </h3>

          <div className="grid-container">
            {patients.length === 0 ? (
              <p style={{ color: "white" }}>No patient records found.</p>
            ) : (
              patients.map(p => (
                <div className="card" key={p._id}>
                  <div className="card-header">
                    <h4>{p.name || "N/A"}</h4>
                    <span className={`status-badge ${p.status}`}>
                      {p.status}
                    </span>
                  </div>

                  <div style={{ fontSize: "0.9rem", color: "#444" }}>
                    <p>
                      <strong>Age/Gender:</strong>{" "}
                      {p.age || "-"} yrs | {p.gender || "-"}
                    </p>

                    <p>
                      <strong>Phone:</strong> {p.phone || "-"}
                    </p>

                    <p>
                      <strong>Address:</strong> {p.address || "-"}
                    </p>

                    <p style={{ marginTop: "5px", color: "#d9534f" }}>
                      <strong>Disease:</strong> {p.disease || "Not specified"}
                    </p>
                  </div>

                  {p.status === "Pending" && (
                    <div className="btn-group">
                      <button
                        className="accept-btn"
                        onClick={() => handleStatusUpdate(p._id, "Approved")}
                      >
                        Approve
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() => handleStatusUpdate(p._id, "Rejected")}
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

export default AdminPatientVerify;