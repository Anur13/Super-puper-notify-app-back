const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const folder = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    sys: {
      created: {
        type: Date,
      },
      lastUpdated: {
        type: Date,
      },
    },
    // TODO: add after implementation of User entity
    // userId: {
    //   type: ObjectId,
    //   required: true,
    // },
    order: Number,
  },
  { versionKey: false },
);

const Folder = mongoose.model("folder", folder);

module.exports = Folder;
