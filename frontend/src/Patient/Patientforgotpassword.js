import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Patient.css";

function PatientForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !newPassword) {
      alert("Please enter both email and new password.");
    } else {
      alert(`Password for ${email} has been reset successfully!`);
     
    }
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
        <Link to="/enter" > Login
        </Link>
         
      </p>
    </div>
  );
}

export default PatientForgotPassword;