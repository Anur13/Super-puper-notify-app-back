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
  //TODO: ломает ошибку, статус 200 пишет в ошибке
  // if (!error.status) {
  //   next(error, req, res);
  // }
  res.status(error.statusCode).json({ message: error.description });
});

app.use((error, req, res, next) => {
  res.send(error);
});
module.exports = app;
