import React, { useState } from "react";
import "./Patient.css"

function PatientRegister() {
    const [form, setForm] = useState({
        name: "", email: "", password: "", phone: "", });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(
            "Registered Successfully!\n" +
            "Name: " + form.name +
            "Email: " + form.email +
            "Phone: " + form.phone
        );
    };

    return (
        <div className="auth-container">
            <h2>Patient Registration</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                /><br />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                /><br />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default PatientRegister;