import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

function HomePage() {
  return (
    <div className="home-container">

      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-transparent px-4">
        <div className="container-fluid">

          <Link className="navbar-brand fw-bold" to="/home">
            🏥 HOSPITAL CARE
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="offcanvasNavbar"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Menu</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

                <li className="nav-item">
                  <Link className="nav-link active" to="/home">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to='/testrun'>
                   Register
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    Login
                  </span>

                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/enter">
                        Patient Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/doclog">
                        Doctor Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/adlog">
                        Admin Register
                      </Link>
                    </li>
                  </ul>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </nav>

      <section className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Welcome to Our Hospital</h1>
          <p>
            Dedicated to providing compassionate care and modern medical
            services for you and your family.
          </p>
          <Link to="/docbook" className="hero-btn">
            Book Appointment
          </Link>
        </div>
      </section>

      <section className="info-section container py-5">
        <div className="row g-4">

          <div className="col-md-4">
            <div className="glass-card">
              <h5>24/7 Emergency Support</h5>
              <p>
                Our emergency team is ready at all times to provide life-saving care.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-card">
              <h5>Expert Doctors</h5>
              <p>
                Consult with highly experienced specialists across departments.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-card">
              <h5>Modern Facilities</h5>
              <p>
                Advanced technology for accurate diagnosis and treatment.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

export default HomePage;