const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/hospitalDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// ROUTES
app.use("/admin", require("./routes/adminRoutes"));
app.use("/api/doctors", require("./routes/routesrdoctor"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/patients", require("./routes/routespatient"));

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});