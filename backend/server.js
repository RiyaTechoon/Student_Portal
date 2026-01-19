const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/student.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", studentRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
