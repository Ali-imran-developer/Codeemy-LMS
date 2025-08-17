require("dotenv").config();
const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const path = require("path");
const dbConnect = require("./dbConnect");
const authRoutes = require("./routes/auth-routes");

const app = express();
dbConnect();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;
module.exports.handler = serverless(app);