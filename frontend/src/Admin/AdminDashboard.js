import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [bookings, setBookings] = useState([]); // ✅ NEW
  const [view, setView] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const d = await axios.get("http://localhost:5000/api/doctors");
      const p = await axios.get("http://localhost:5000/api/patients");
      const b = await axios.get("http://localhost:5000/api/bookings"); // ✅ NEW

      setDoctors(d.data);
      setPatients(p.data);
      setBookings(b.data); // ✅ NEW
    } catch (err) {
      console.log(err);
    }
  };

  // APPROVE
  const approveDoctor = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/doctors/approve/${id}`);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  // REJECT
  const rejectDoctor = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/doctors/reject/${id}`);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard-bg">

      <nav className="navbar navbar-expand-lg shadow-sm">
        <div className="container-fluid">
          <span className="nav-brand">🏥 MEDIC-ADMIN</span>
          <Link to="/adlog" className="btn btn-outline-light btn-sm fw-bold">
            Logout
          </Link>
        </div>
      </nav>

      <div className="d-flex flex-grow-1 overflow-hidden">

        {/* SIDEBAR */}
        <div className="sidebar shadow">
          <h5 className="text-info fw-bold mb-4">Dashboard</h5>
          <ul className="p-0">
            <li className={view === "all" ? "active" : ""} onClick={() => setView("all")}>📊 Overview</li>
            <li className={view === "doc" ? "active" : ""} onClick={() => setView("doc")}>👨‍⚕️ Doctors</li>
            <li className={view === "pat" ? "active" : ""} onClick={() => setView("pat")}>🧍 Patients</li>

            {/* ✅ NEW TAB */}
            <li className={view === "book" ? "active" : ""} onClick={() => setView("book")}>
              📅 Bookings
            </li>
          </ul>
        </div>

        <div className="main-content">
          <div className="container-fluid">

            {/* DOCTORS */}
            {(view === "all" || view === "doc") && (
              <div className="mb-5">
                <h3 className="fw-bold">Doctor Verification Requests</h3>
                <div className="row g-4">
                  {doctors.map(doc => (
                    <div className="col-12 col-md-6 col-lg-4" key={doc._id}>
                      <div className="glass-card">

                        <div className="d-flex justify-content-between">
                          <h4>{doc.name}</h4>
                          <span className={`badge-custom status-${doc.status}`}>
                            {doc.status}
                          </span>
                        </div>

                        <p><strong>Specialty:</strong> {doc.specialty}</p>
                        <p><strong>Email:</strong> {doc.email}</p>

                        {doc.status === "Pending" && (
                          <div>
                            <button
                              className="btn-approve"
                              onClick={() => approveDoctor(doc._id)}
                            >
                              Approve
                            </button>

                            <button
                              className="btn-reject"
                              onClick={() => rejectDoctor(doc._id)}
                            >
                              Reject
                            </button>
                          </div>
                        )}

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PATIENTS */}
            {(view === "all" || view === "pat") && (
              <div>
                <h3 className="mb-4 fw-bold">Registered Patients</h3>
                <div className="row g-4">
                  {patients.map(p => (
                    <div className="col-12 col-md-6 col-lg-4" key={p._id}>
                      <div className="glass-card">
                        <h4>{p.name}</h4>
                        <p><strong>Gender:</strong> {p.gender}</p>
                        <p><strong>Contact:</strong> {p.phone}</p>
                        <p><strong>Disease:</strong> {p.disease}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ✅ BOOKINGS VIEW */}
            {(view === "all" || view === "book") && (
              <div className="mt-5">
                <h3 className="fw-bold">All Bookings</h3>

                <div className="row g-4">
                  {bookings.map(b => (
                    <div className="col-12 col-md-6 col-lg-4" key={b._id}>
                      <div className="glass-card">

                        <h5>
                          {b.patientId?.name || b.guestName || "Unknown"}
                        </h5>

                        <p>
                          <strong>Doctor:</strong>{" "}
                          {b.doctorId?.name || "Unknown Doctor"}
                        </p>

                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(b.date).toLocaleDateString()}
                        </p>

                        <p>
                          <strong>Status:</strong> {b.status}
                        </p>

                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;