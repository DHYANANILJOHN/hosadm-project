import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const doctorData = [
      { id: 1, name: "Dr. Smith", specialty: "Cardiologist", status: "Active" },
      { id: 2, name: "Dr. Alice", specialty: "Dermatologist", status: "Pending" },
      { id: 3, name: "Dr. John", specialty: "Pediatrician", status: "Active" },
      { id: 4, name: "Dr. Amit Patel", specialty: "Orthopedic Surgeon", status: "Pending" },
    ];
    const patientData = [
      { id: 1, name: "Rahul", time: "10:00 AM", history: "Cold & Fever" },
      { id: 2, name: "Sneha", time: "11:30 AM", history: "Dental Checkup" },
      { id: 3, name: "Riya", time: "1:15 PM", history: "Allergy Treatment" },
      { id: 4, name: "Denny", time: "3:15 PM", history: "General Checkup" },
    ];

    setDoctors(doctorData);
    setPatients(patientData);
  }, []);

  const handleEdit = (id) => alert(`Editing Doctor ID: ${id}`);
  const handleAccept = (id) =>
    setDoctors((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, status: "Active" } : doc
      )
    );

  return (
    <div className="dashboard-bg">

      <nav className="navbar navbar-dark bg-primary fixed-top shadow-sm">
        <div className="container-fluid d-flex justify-content-between align-items-center px-3">
          <span className="navbar-brand fw-bold">🏥 Admin Dashboard</span>
          <Link to="/adlog">
            <button className="btn btn-danger btn-sm">Logout</button>
          </Link>
        </div>
      </nav>


      <div className="dashboard-container">

        <div className="sidebar">
          <h2>Admin Panel</h2>
          <ul>
            <li><a href="#" className="active">Dashboard</a></li>
            <li>
              <Link to="/docdeti">Doctors</Link>
            </li> 
            <li>
              <Link to="/deti">Patients</Link>
            </li>
            <li><Link to="/Booking"> Register</Link></li>
          </ul>
        </div>


        <div className="main-content">
          <div className="row g-4">

            <div className="col-md-6">
              <div className="card shadow-lg border-0">
                <div className="card-header bg-info text-white fw-bold">
                  👨‍⚕️ Doctor Details
                </div>
                <div className="card-body overflow-auto" style={{ maxHeight: "60vh" }}>
                  {doctors.map((doc) => (
                    <div className="card mb-3 border-0 shadow-sm" key={doc.id}>
                      <div className="card-body">
                        <h6 className="fw-bold">{doc.name}</h6>
                        <p className="mb-1 text-muted">{doc.specialty}</p>
                        <p>
                          Status:{" "}
                          <span
                            className={`badge ${doc.status === "Active"
                                ? "bg-success"
                                : "bg-warning text-dark"
                              }`}
                          >
                            {doc.status}
                          </span>
                        </p>
                        <div>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => handleEdit(doc.id)}
                          >
                            Edit
                          </button>
                          {doc.status !== "Active" && (
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => handleAccept(doc.id)}
                            >
                              Accept
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>


            <div className="col-md-6">
              <div className="card shadow-lg border-0">
                <div className="card-header bg-info text-white fw-bold">
                  🧍‍♀️ Patient Overview
                </div>
                <div className="card-body overflow-auto" style={{ maxHeight: "60vh" }}>
                  <p><strong>Total Patients:</strong> {patients.length}</p>
                  <p><strong>Total Bookings:</strong> {patients.length}</p>
                  <hr />
                  <h6 className="fw-bold mb-3">🩺 Recent Bookings</h6>
                  {patients.map((p) => (
                    <div className="card patient-card border-0 shadow-sm mb-3" key={p.id}>
                      <div className="card-body p-2">
                        <p className="fw-bold mb-1">{p.name}</p>
                        <p className="small mb-0 text-muted">Time: {p.time}</p>
                        <p className="small mb-0">History: {p.history}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;