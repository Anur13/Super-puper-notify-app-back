const express = require("express");
const logger = require("morgan");
const Constants = require("./common/constants/constants");
// INFO Routers imports
const FolderRouter = require("./routers/folder-router");
const MessageListRouter = require("./routers/messageList-router");
const MessageRouter = require("./routers/message-router");
const UserRouter = require("./routers/user-router");
//
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const loggerType = app.get("env") === "development" ? "dev" : "short";
app.use(logger(loggerType));
app.use(express.json());
// Routes of project
app.use(Constants.routes.folder.main, FolderRouter);
app.use(Constants.routes.messageList.main, MessageListRouter);
app.use(Constants.routes.message.main, MessageRouter);
app.use(Constants.routes.user.main, UserRouter);

// Handle error route
app.use((req, res) => {
  res.status(404).json({ error: "NOT FOUND" });
});

app.use((error, req, res, next) => {
  if (!error.statusCode) {
    return next(error, req, res);
  }
  res.status(error.statusCode).send(error);
});

app.use((error, req, res, next) => {
  res.status(400).json({ message: error.message });
});
module.exports = app;
