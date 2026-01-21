import React, { useState } from "react";

import { Link } from "react-router-dom";

import"./Patient.css"

function PatientLogin() {

const [form, setForm] = useState({

email: "",

password: "",

});

const handleChange = (e) => {

setForm({ ...form, [e.target.name]: e.target.value });

};

const handleSubmit = (e) => {

e.preventDefault();





if (form.email && form.password) {

  alert("Login Successful!\nEmail: " + form.email);

} else {

  alert("Please enter both email and password.");

}

};

return (

<div className="auth-container">

  <h2>Patient Login</h2>

  <form onSubmit={handleSubmit}>

    <input

      type="email"

      name="email"

      placeholder="Email"

      value={form.email}

      onChange={handleChange}

    /><br /><br />



    <input

      type="password"

      name="password"

      placeholder="Password"

      value={form.password}

      onChange={handleChange}

    /><br /><br />



    <button type="submit">Login</button>

   

  </form>

    <p>Don't have an account? <Link to="/testrun">Register here</Link></p>

    <p>Forgot your password? <Link to="/forgot">Reset here</Link></p>

</div>

);

}

export default PatientLogin;