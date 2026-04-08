import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Patient.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PatientForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDATION
    if (!email || !newPassword) {
      toast.error("Please enter both email and new password.");
      return;
    }

    if (newPassword.length < 4) {
      toast.warning("Password must be at least 4 characters");
      return;
    }

    axios
      .put("http://localhost:5000/api/patients/reset-password", {
        email,
        newPassword
      })
      .then((res) => {
        //  SUCCESS
        toast.success(res.data.msg || "Password reset successful");

        setEmail("");
        setNewPassword("");

        // slight delay so user can see toast
        setTimeout(() => {
          navigate("/enter");
        }, 1500);
      })
      .catch((err) => {
        // ❌ ERROR
        toast.error(err.response?.data?.msg || "Error resetting password");
        console.log("RESET ERROR:", err);
      });
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">Reset Password</button>
      </form>

      <p>
        Remembered your password?{" "}
        <Link to="/enter">Login</Link>
      </p>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default PatientForgotPassword;