import { useState } from "react";
import axios from "axios";
import "./Doctor.css";

function DoctorRegister() {

  const [doctor, setDoctor] = useState({
    name: "",
    age: "",
    specialty: "",
    experience: "",
    phone: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value
    });
  };

  const registerDoctor = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/doctors/register", doctor)
      .then((res) => {
        alert(res.data.msg || "Registration successful. Wait for admin approval.");
      })
      .catch((err) => {
        alert(err.response?.data?.msg || "Registration failed");
      });
  };

  return (
    <div className="doctor-register-container">

      <div className="doctor-register-card">

        <h3 className="doctor-register-title">
          Doctor Registration
        </h3>

        <form onSubmit={registerDoctor}>


          <input
            type="text"
            className="doctor-input"
            placeholder="Name"
            name="name"
            value={doctor.name} // Controlled component
            onChange={handleChange}
            required
          />
          <input
            type="number"
            className="doctor-input"
            placeholder="Age"
            name="age"
            value={doctor.age}
            onChange={handleChange}
          />
          <input
            type="text"
            className="doctor-input"
            placeholder="Specialty"
            name="specialty"
            value={doctor.specialty}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            className="doctor-input"
            placeholder="Experience (years)"
            name="experience"
            value={doctor.experience}
            onChange={handleChange}
          />
          <input
            type="text"
            className="doctor-input"
            placeholder="Phone"
            name="phone"
            value={doctor.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            className="doctor-input"
            placeholder="Email"
            name="email"
            value={doctor.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            className="doctor-input"
            placeholder="Password"
            name="password"
            value={doctor.password}
            onChange={handleChange}
            required
          />
          <button className="doctor-register-btn">
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default DoctorRegister;