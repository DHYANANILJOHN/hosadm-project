import React, { useState } from "react";
import "./DoctorBooking.css";

function DoctorBooking() {
  const doctors = [
    {
      id: 1,
      name: "Dr. John Smith",
      specialty: "Cardiologist",
      image: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
      bio: "Dr. Smith has 10+ years of experience in treating heart diseases and cardiac health.",
      available: "Mon - Fri, 1:00 AM - 4:00 PM",
    },
    {
      id: 2,
      name: "Dr. John",
      specialty: "Pediatrician",
      image: "https://cdn-icons-png.flaticon.com/512/4323/4323015.png",
      bio: "Dr. Lee specializes in child healthcare with a caring and friendly approach.",
      available: "Tue - Sat, 9:30 AM - 12:00 PM",
    },
    {
      id: 3,
      name: "Dr. Amit Patel",
      specialty: "Orthopedic Surgeon",
      image: "https://cdn-icons-png.flaticon.com/512/4323/4323007.png",
      bio: "Dr. Patel provides expert orthopedic care, including bone and joint surgeries.",
      available: "Mon - Thu, 3:00 AM - 5:00 PM",
    },
    {
      id: 4,
      name: "Dr. Alice",
      specialty: "Dermatologist",
      image: "https://cdn-icons-png.flaticon.com/512/4323/4323007.png",
      bio: "Dr. Alice provides expert dermatology care.",
      available: "Mon - Thu, 11:00 AM - 12:30 PM",
    },
  ];

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="doctor-booking-container">
      <h2>Book an Appointment</h2>

      <div className="doctor-grid">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="doctor-card"
            onClick={() => setSelectedDoctor(doctor)}
          >
            <img src={doctor.image} alt={doctor.name} className="doctor-img" />
            <h5 className="card-title">{doctor.name}</h5>
            <p className="card-text">{doctor.specialty}</p>
            <button className="btn-outline-light">View Profile</button>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <div className="doctor-profile">
          <h3>{selectedDoctor.name}</h3>
          <p>
            <strong>Specialty:</strong> {selectedDoctor.specialty}
          </p>
          <p>{selectedDoctor.bio}</p>
          <p>
            <strong>Available:</strong> {selectedDoctor.available}
          </p>

          <button
            className="btn-primary"
            onClick={() => alert("Appointment booked!")}
          >
            Book Appointment
          </button>
        </div>
      )}
    </div>
  );
}

export default DoctorBooking;