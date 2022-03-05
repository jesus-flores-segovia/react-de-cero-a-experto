const express = require("express");
require("dotenv").config();

// Express Server
const app = express();

// Public directory
app.use(express.static("public"));

// Reading and parsing the body using a middleware
app.use(express.json());

// Routing
app.use("/api/auth", require("./routes/auth"));
// TODO: event CRUD

// Listening on port 4000
app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`);
});
