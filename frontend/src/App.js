import logo from './logo.svg';
import './App.css';
import{BrowserRouter,Routes,Route,} from"react-router-dom"
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


function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path='/home' element={<><HomePage/></>}></Route>
          <Route path='/testrun' element={<><PatientRegister/></>}></Route>
          <Route path='/enter' element={<><PatientLogin/></>}></Route>
          <Route path='/forgot' element={<><Patientforgotpassword/></>}></Route>
           <Route path='/Booking' element={<><Booking/></>}></Route>
           <Route path='/docbook' element={<><DoctorBooking/></>}></Route>
            <Route path='/adlog' element={<><AdminLogin/></>}></Route>
             <Route path='/addash' element={<><AdminDashboard/></>}></Route>
             <Route path='/deti' element={<><AdminPatientVerify/></>}></Route>
             <Route path='/docdeti' element={<><AdminDoctorVerify/></>}></Route>
             <Route path='/doclog' element={<><DoctorLogin/></>}></Route>
            <Route path="/doclog" element={<DoctorLogin />} />

    <Route path="/docdash" element={<DoctorDashboard />}>
      <Route path="docprofile" element={<DoctorProfile />} />
      <Route path="docpai" element={<DoctorPatients />} />
    </Route>

          </Routes></BrowserRouter>
    </div>
  );
}

export default App;
