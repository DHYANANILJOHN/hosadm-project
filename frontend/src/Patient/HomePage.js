import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

function HomePage() {
  return (
    <div className="home-container">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/home">
            🏥 HOSPITAL <span style={{ color: "#00c8ff" }}>CARE</span>
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="offcanvas offcanvas-end text-bg-dark" id="offcanvasNavbar">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Navigation</h5>
              <button className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav ms-auto align-items-center">
                {/* REGISTER DROPDOWN */}
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button">
                    Register
                  </span>
                  <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow-lg">
                    <li><Link className="dropdown-item py-2" to="/testrun">Patient Register</Link></li>
                    <li><Link className="dropdown-item py-2" to="/docreg">Doctor Register</Link></li>
                  </ul>
                </li>

                {/* LOGIN DROPDOWN */}
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button">
                    Login
                  </span>
                  <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow-lg">
                    <li><Link className="dropdown-item py-2" to="/enter">Patient Login</Link></li>
                    <li><Link className="dropdown-item py-2" to="/doclog">Doctor Login</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item py-2" to="/adlog">Admin Access</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content px-3 animate-fade">
          <h1>Compassionate Care <br /> Meets Innovation</h1>
          <p>
            Your health is our priority. Connect with top-rated specialists 
            and manage your wellness with our digital healthcare platform.
          </p>
          <Link to="/Booking" className="hero-btn">
            Book Appointment
          </Link>
        </div>
      </section>

      {/* CARDS SECTION */}
      <section className="info-section container">
        <div className="row g-4 justify-content-center">
          <div className="col-md-4">
            <div className="glass-card text-center">
              <h5>24/7 Availability</h5>
              <p>Round-the-clock medical assistance and emergency support for your peace of mind.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-card text-center">
              <h5>Top Specialists</h5>
              <p>Access a network of highly qualified doctors across various medical disciplines.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-card text-center">
              <h5>Modern Care</h5>
              <p>Utilizing the latest technology to ensure accurate diagnosis and effective treatments.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;