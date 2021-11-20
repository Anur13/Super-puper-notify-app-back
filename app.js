const express = require("express");
const logger = require("morgan");
require("dotenv").config();

const app = express();

const loggerType = app.get("env") === "development" ? "dev" : "short";
app.use(logger(loggerType));

// Handle error route
app.use((req, res) => {
  res.status(404).json({ error: "NOT FOUND" });
});

module.exports = app;
