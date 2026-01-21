import "./Doctor.css";

function DoctorProfile() {
  const doctor = JSON.parse(localStorage.getItem("doctor"));

  if (!doctor) return <h4>Please Login</h4>;

  return (
    <div className="card card-custom p-4 col-md-6">
      <h4 className="profile-title mb-3">Doctor Profile</h4>

      <p><b>Name:</b> {doctor.name}</p>
      <p><b>Specialization:</b> {doctor.specialization}</p>
      <p><b>Experience:</b> {doctor.experience}</p>
      <p><b>Phone:</b> {doctor.phone}</p>
      <p><b>Email:</b> {doctor.email}</p>
    </div>
  );
}

export default DoctorProfile;