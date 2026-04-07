import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import PatientRegister from './Patient/PatientRegister';
import PatientLogin from './Patient/Patientlogin';
import Patientforgotpassword from './Patient/Patientforgotpassword';
import HomePage from './Patient/HomePage';
import Booking from './Patient/Booking';
import DoctorBooking from './Patient/DoctorBooking';

import AdminLogin from './Admin/AdminLogin';
import AdminDashboard from './Admin/AdminDashboard';
import AdminPatientVerify from './Admin/AdminPatientVerify';
import AdminDoctorVerify from './Admin/AdminDoctorVerify';

import DoctorLogin from './Doc/DoctorLogin';
import DoctorDashboard from './Doc/DoctorDashboard';
import DoctorProfile from './Doc/DoctorProfile';
import DoctorPatients from './Doc/DoctorPatients';
import DoctorRegister from './Doc/DoctorRegister';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          {/* ✅ ROOT FIX */}
          <Route path="/" element={<HomePage />} />

          <Route path="/home" element={<HomePage />} />
          <Route path="/testrun" element={<PatientRegister />} />
          <Route path="/enter" element={<PatientLogin />} />
          <Route path="/forgot" element={<Patientforgotpassword />} />

          <Route path="/booking" element={<Booking />} />
          <Route path="/docbook" element={<DoctorBooking />} />

          <Route path="/adlog" element={<AdminLogin />} />
          <Route path="/addash" element={<AdminDashboard />} />
          <Route path="/deti" element={<AdminPatientVerify />} />
          <Route path="/docdeti" element={<AdminDoctorVerify />} />

          <Route path="/doclog" element={<DoctorLogin />} />
          <Route path="/docreg" element={<DoctorRegister />} />

          <Route path="/docdash" element={<DoctorDashboard />}>
            <Route path="docprofile" element={<DoctorProfile />} />
            <Route path="docpai" element={<DoctorPatients />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;