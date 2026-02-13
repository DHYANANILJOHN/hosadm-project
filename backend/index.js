const express = require("express");
const cors = require("cors");

require("./dbConnection"); // ✅ correct path

const app = express();

app.use(cors());
app.use(express.json());


// routes
app.use("/Doctor", require("./routes/routesrdoctor"));
app.use("/Patient", require("./routes/routespatient"));
app.use("/Admin", require("./routes/adminRoutes"));
app.use("/Booking", require("./routes/bookingRoutes"));


app.listen(5000, () =>
  console.log("🚀 Server running at http://localhost:5000")
);