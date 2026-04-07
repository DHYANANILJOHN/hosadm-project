import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminExtra.css";

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

      // ✅ FIX: use success from backend
      if (res.data.success) {
        navigate("/addash");
      } else {
        alert(res.data.msg);
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  const handleReset = async () => {
    try {
      // ✅ FIX: http0 → http
      const res = await axios.post(
        "http://localhost:5000/admin/forgot-password",
        {
          username: admin.username,
          newPassword: newPassword
        }
      );

      alert(res.data.msg);
      setResetMode(false);

    } catch (err) {
      console.log(err);
      alert("Error resetting password");
    }
  };

  return (
    <div className="dashboard-bg">
      <div className="login-container">
        <div className="login-box">

          <h2>{resetMode ? "Reset Password" : "Admin Login"}</h2>

          {!resetMode ? (
            <form onSubmit={handleSubmit}>
              <input name="username" placeholder="Username" onChange={handleChange} required />
              <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
              <button type="submit">Login</button>

              <div className="forgot-link" onClick={() => setResetMode(true)}>
                Forgot Password?
              </div>
            </form>
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

              <div className="back-link" onClick={() => setResetMode(false)}>
                Back to Login
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default AdminLogin;