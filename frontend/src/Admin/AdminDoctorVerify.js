import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDoctorVerify() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {

    let now = new Date();
    let date = now.toLocaleDateString();
    let time = now.toLocaleTimeString();

    const doctorData = [
      { 
        id: 1, 
        name: "Dr. Smith", 
        specialty: "Cardiologist", 
        experience: "12 years",
        degree: "MD (Cardiology)",
        phone: "9876543210",
        address: "Trivandrum, Kerala",
        createdDate: date,
        createdTime: time,
        status: "Active" 
      },
      { 
        id: 2, 
        name: "Dr. Alice", 
        specialty: "Dermatologist", 
        experience:"10 years",
        degree:"MD (Dermatology)",
        phone: "9847231000",
        address: "Kochi, Kerala",
        createdDate: date,
        createdTime: time,
        status: "Pending" 
      },
      { 
        id: 3, 
        name: "Dr. John", 
        specialty: "Pediatrician", 
        experience: "8 years",
        degree: "MD (Pediatrics)",
        phone: "9000011122",
        address: "Kollam, Kerala",
        createdDate: date,
        createdTime: time,
        status: "Active" 
      },
      { 
        id: 4, 
        name: "Dr. Amit Patel", 
        specialty: "Orthopedic Surgeon", 
        experience: "18 years",
        degree: "MS (Orthopedic Surgery)",
        phone: "9895007744",
        address: "Calicut, Kerala",
        createdDate: date,
        createdTime: time,
        status: "Pending" 
      }
    ];

    setDoctors(doctorData);
  }, []);

  const handleApprove = (id) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "Active" } : d))
    );
  };

  const handleReject = (id) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "Rejected" } : d))
    );
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
            <div className="card shadow-sm p-3 mb-3" key={d.id}>
              <h5 className="fw-bold">{d.name}</h5>

              <p className="mb-1"><strong>Specialty:</strong> {d.specialty}</p>
              <p className="mb-1"><strong>Experience:</strong> {d.experience}</p>
              <p className="mb-1"><strong>Degree:</strong> {d.degree}</p>
              <p className="mb-1"><strong>Phone:</strong> {d.phone}</p>
              <p className="mb-1"><strong>Address:</strong> {d.address}</p>

              <p className="mb-1"><strong>Date:</strong> {d.createdDate}</p>
              <p className="mb-1"><strong>Time:</strong> {d.createdTime}</p>

              <p>
                <strong>Status:</strong>
                <span
                  className={`badge ms-1 ${
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
                    onClick={() => handleApprove(d.id)}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleReject(d.id)}
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