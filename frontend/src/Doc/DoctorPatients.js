import { useState } from "react";
import "./Doctor.css";

function DoctorPatients() {
  const [patients, setPatients] = useState([
    { id: 1, name: "Rahul", age: 22, disease: "Fever", status: "Pending" },
    { id: 2, name: "Sneha", age: 28, disease: "Dental", status: "Approved" },
    { id: 3, name: "Riya", age: 20, disease: "Allergy", status: "Pending" }
  ]);

  const updateStatus = (id, status) => {
    setPatients(
      patients.map(p =>
        p.id === id ? { ...p, status } : p
      )
    );
  };

  return (
    <>
      <h4 className="mb-4">Patient Details</h4>

      {patients.map(p => (
        <div
          key={p.id}
          className={`card card-custom p-3 mb-3 patient-card ${p.status.toLowerCase()}`}
        >
          <p><b>Name:</b> {p.name}</p>
          <p><b>Age:</b> {p.age}</p>
          <p><b>Disease:</b> {p.disease}</p>

          <span className={`badge ${
            p.status === "Approved" ? "bg-success" :
            p.status === "Rejected" ? "bg-danger" :
            "bg-warning text-dark"
          }`}>
            {p.status}
          </span>

          {p.status === "Pending" && (
            <div className="mt-3">
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => updateStatus(p.id, "Approved")}
              >
                Approve
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => updateStatus(p.id, "Rejected")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default DoctorPatients;