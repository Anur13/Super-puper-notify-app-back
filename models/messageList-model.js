const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    folderId: Schema.Types.Mixed,
    messagesId: [String],
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
