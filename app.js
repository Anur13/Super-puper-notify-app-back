const express = require("express");
const logger = require("morgan");
const Constants = require("./helpers/constants/constants");
const FolderRoute = require("./routes/folder-route");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const loggerType = app.get("env") === "development" ? "dev" : "short";
app.use(logger(loggerType));
app.use(express.json());

// Routes of project
app.use(Constants.routes.folder.main, FolderRoute);

// Handle error route
app.use((req, res) => {
  res.status(404).json({ error: "NOT FOUND" });
});

module.exports = app;
