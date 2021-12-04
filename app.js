const express = require("express");
const logger = require("morgan");
const Constants = require("./helpers/constants/constants");
// INFO Routers imports
const FolderRoute = require("./routers/folder-router");
const MessageListRouter = require("./routers/messageList-router");
//
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const loggerType = app.get("env") === "development" ? "dev" : "short";
app.use(logger(loggerType));
app.use(express.json());

// Routes of project
app.use(Constants.routes.folder.main, FolderRoute);
app.use(Constants.routes.messageList.main, MessageListRouter);

// Handle error route
// app.use((req, res) => {
//   res.status(404).json({ error: "NOT FOUND" });
// });

app.use((error, req, res, next) => {
  console.log("test");
  // if (typeof error == "string") {
  //   return res.status(400).json({ message: error });
  // }
  res.status(error.statusCode).json({ message: error.description });
});

module.exports = app;
