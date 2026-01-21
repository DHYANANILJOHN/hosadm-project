import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Doctor.css";

function DoctorDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("doctor");
    navigate("/");
  };

  return (
    <>
      <div className="sidebar p-3">
        <h5 className="text-center">Doctor Panel</h5>
        <hr />
        <Link className="text-white d-block mb-2" to="/docdash/docprofile">
          👤 Profile
        </Link>
        <Link className="text-white d-block mb-2" to="/docdash/docpai">
          🧾 Patients
        </Link>

        <Link className="text-white d-block mb-2" to="/doclog" onClick={logout}>
          logout
        </Link>
      </div>

      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
}

export default DoctorDashboard;