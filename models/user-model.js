const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const user = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: String,
    password: {
      type: String,
      required: true,
    },
    config: {
      type: ObjectId,
    },
  },
  { versionKey: false },
);

const User = mongoose.model("user", user);

module.exports = User;
