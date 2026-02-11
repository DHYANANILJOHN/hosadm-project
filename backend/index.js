const express = require("express");
const cors = require("cors");

require("./dbConnection");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/Doctor", require("./routes/routesrdoctor"));
app.use("/Patient", require("./routes/routespatient"));

app.listen(5000, () =>
  console.log("🚀 Server running at http://localhost:5000")
);