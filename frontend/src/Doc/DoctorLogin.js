import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Doctor.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DoctorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) {
      toast.warning("Please enter email and password");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/doctors/login",
        {
          email: email,
          password: password,
        }
      );

      // ✅ Save doctor data
      localStorage.setItem("doctor", JSON.stringify(res.data.doctor));

      // ✅ SUCCESS MESSAGE
      toast.success(res.data.msg || "Login successful");

      setTimeout(() => {
        navigate("/docdash/docprofile");
      }, 1200);

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.msg || "Login failed. Check server or credentials."
      );
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

        {/* ✅ HOME BUTTON */}
        <Link to="/home">
          <button className="btn btn-secondary w-100 mt-3">
            Home
          </button>
        </Link>

      </div>

      {/* ✅ Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default DoctorLogin;