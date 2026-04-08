import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./AdminExtra.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminLogin() {
  const [admin, setAdmin] = useState({
    username: "",
    password: ""
  });

  const [resetMode, setResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/admin/login", admin);

      if (res.data.success) {
        toast.success(res.data.msg || "Login successful");

        setTimeout(() => {
          navigate("/addash");
        }, 1200);

      } else {
        toast.error(res.data.msg || "Login failed");
      }

    } catch (err) {
      console.log(err);
      toast.error("Server error");
    }
  };

  const handleReset = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/admin/forgot-password",
        {
          username: admin.username,
          newPassword: newPassword
        }
      );

      toast.success(res.data.msg || "Password updated");
      setResetMode(false);

    } catch (err) {
      console.log(err);
      toast.error("Error resetting password");
    }
  };

  return (
    <div className="dashboard-bg">
      <div className="login-container">
        <div className="login-box">

          <h2>{resetMode ? "Reset Password" : "Admin Login"}</h2>

          {!resetMode ? (
            <>
              <form onSubmit={handleSubmit}>
                <input
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  required
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
                <button type="submit">Login</button>

                <div
                  className="forgot-link"
                  onClick={() => setResetMode(true)}
                >
                  Forgot Password?
                </div>
              </form>

              {/* ✅ HOME LINK ADDED */}
              <p className="back-home">
                <Link to="/home">Go to Home</Link>
              </p>
            </>
          ) : (
            <>
              <input
                placeholder="Username"
                onChange={(e) =>
                  setAdmin({ ...admin, username: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button onClick={handleReset}>Update Password</button>

              <div
                className="back-link"
                onClick={() => setResetMode(false)}
              >
                Back to Login
              </div>

              {/* ✅ HOME LINK ALSO IN RESET SCREEN */}
              <p className="back-home">
                <Link to="/home">Go to Home</Link>
              </p>
            </>
          )}

        </div>
      </div>

      {/* ✅ Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default AdminLogin;