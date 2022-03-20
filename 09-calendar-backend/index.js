const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
const path = require("path");
require("dotenv").config();

// Express Server
const app = express();

// Database
dbConnection();

// CORS Policy
app.use(cors());

// Public directory
app.use(express.static(path.resolve(__dirname, "public")));

// Reading and parsing the body using a middleware
app.use(express.json());

// Routing
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// Listening on port 4000
app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`);
});
