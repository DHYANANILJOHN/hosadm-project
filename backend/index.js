const express = require("express");
const cors = require("cors");

const connectDB = require("./dbConnection");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/authPatient", require("./routes/authPatientRoutes"));
app.use("/Doctor", require("./routes/routesrdoctor"));
app.use("/Patient", require("./routes/routespatient"));
app.use("/Admin", require("./routes/adminRoutes"));
app.use("/Booking", require("./routes/bookingRoutes"));

app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});