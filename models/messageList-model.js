const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const messageList = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // userId: {
    //     type: objectId,
    //     required: true,
    // },
    folderId: {
      type: ObjectId,
      default: null,
    },
    messagesId: [String],
    // messagesId: [ObjectId],

    sys: {
      created: {
        type: Date,
      },
      lastUpdated: {
        type: Date,
      },
    },
  },
  { versionKey: false },
);

const MessageList = mongoose.model("messageList", messageList);

module.exports = MessageList;
