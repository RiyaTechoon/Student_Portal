const express = require("express"); //import express framework
const cors = require("cors"); //import cors middlewares

const studentRoutes = require("./routes/student.routes"); //Imports all student-related APIs

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", studentRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
