import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Admin.css";

function AdminLogin() {
  const [admin, setAdmin] = useState({ username: "", password: "" });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (admin.username === "admin" && admin.password === "12345") {
      alert("✅ Login successful!");
      navigate("/addash"); 
    } else {
      alert("❌ Invalid Username or Password (Hint: admin / 12345)");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-card">
        <h3>Admin Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={admin.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={admin.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;