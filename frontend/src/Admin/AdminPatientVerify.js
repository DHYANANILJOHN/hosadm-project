import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminPatientVerify() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
   
    let now = new Date();
    let date = now.toLocaleDateString(); 
    let time = now.toLocaleTimeString();

    const patientData = [
      { 
        id: 1, 
        name: "Rahul", 
        age: 22, 
        gender: "Male",
        phone: "9876543210",
        address: "Trivandrum, Kerala",
        disease: "Cold & Fever",
        createdDate: date,
        createdTime: time,
        status: "Pending" 
      },
      { 
        id: 2, 
        name: "Sneha", 
        age: 28, 
        gender: "Female",
        phone: "9847231000",
        address: "Kochi, Kerala",
        disease: "Dental Checkup",
        createdDate: date,
        createdTime: time,
        status: "Pending" 
      },
      { 
        id: 3, 
        name: "Riya", 
        age: 20, 
        gender: "Female",
        phone: "9000001122",
        address: "Kollam, Kerala",
        disease: "Allergy Treatment",
        createdDate: date,
        createdTime: time,
        status: "Pending" 
      },
      { 
        id: 4, 
        name: "Denny", 
        age: 25, 
        gender: "Male",
        phone: "9895007744",
        address: "Calicut, Kerala",
        disease: "General Checkup",
        createdDate: date,
        createdTime: time,
        status: "Pending" 
      }
    ];

    setPatients(patientData);
  }, []);

  const handleAccept = (id) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Approved" } : p))
    );
  };

  const handleReject = (id) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Rejected" } : p))
    );
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
        <h3 className="text-center fw-bold mb-4">Patient Verification Details</h3>

        <div className="container">
          {patients.map((p) => (
            <div className="card shadow-sm p-3 mb-3" key={p.id}>
              <h5 className="fw-bold">{p.name}</h5>

              <p className="mb-1"><strong>Age:</strong> {p.age}</p>
              <p className="mb-1"><strong>Gender:</strong> {p.gender}</p>
              <p className="mb-1"><strong>Phone:</strong> {p.phone}</p>
              <p className="mb-1"><strong>Address:</strong> {p.address}</p>
              <p className="mb-1"><strong>Disease:</strong> {p.disease}</p>

            
              <p className="mb-1"><strong>Date:</strong> {p.createdDate}</p>
              <p className="mb-1"><strong>Time:</strong> {p.createdTime}</p>

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
                    onClick={() => handleAccept(p.id)}
                  >
                    Accept
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleReject(p.id)}
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