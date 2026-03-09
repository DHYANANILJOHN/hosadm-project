import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Doctor.css";

function DoctorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    axios
      .post("http://localhost:5000/Doctor/login", {
        email: email,
        password: password
      })
      .then((res) => {

        // store doctor data
        localStorage.setItem("doctor", JSON.stringify(res.data.doctor));

        alert(res.data.msg || "Login successful");

        // go to doctor dashboard
        navigate("/docdash/docprofile");
      })
      .catch((err) => {
        alert(err.response?.data?.msg || "Login failed");
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card login-box p-4 col-md-4">

        <h3 className="text-center mb-4">Doctor Login</h3>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />



        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
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