import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Doctor.css";

function DoctorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    if (email === "doctor@gmail.com" && password === "doctor123") {
      localStorage.setItem(
        "doctor",
        JSON.stringify({
          name: "Dr. Smith",
          specialization: "Cardiologist",
          experience: "12 Years",
          phone: "9876543210",
          email
        })
      );
      navigate("/docdash/docprofile");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card login-box p-4 col-md-4">
        <h3 className="text-center mb-4">Doctor Login</h3>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default DoctorLogin;